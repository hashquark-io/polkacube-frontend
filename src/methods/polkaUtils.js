import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { Notification } from 'element-ui'
import keyring from '@polkadot/ui-keyring'
import { TypeRegistry } from '@polkadot/types'
import uiSettings from '@polkadot/ui-settings'
import addressDefaults from '@polkadot/util-crypto/address/defaults'
import accountObservable from '@polkadot/ui-keyring/observable/accounts'

import BN from 'bn.js'
import { formatBalance } from '@polkadot/util'
import store from '@/store'
import { Msg, MsgClose } from '@/methods/message'

const registry = new TypeRegistry()
const DEFAULT_SS58 = registry.createType('u32', addressDefaults.prefix)

let subscription = null
let extensions = null

export const injectedPromise = () => {
  if (!extensions) {
    extensions = new Promise(resolve => {
      resolve(web3Enable('polkadot-js'))
    })
  }
  return extensions
}

export const injectedAccounts = async function() {
  return injectedPromise()
    .then(() => web3Accounts())
    .then(accounts =>
      accounts.map(({ address, meta }) => ({
        address,
        meta: {
          ...meta,
          name: `${meta.name} (${meta.source === 'polkadot-js' ? 'extension' : meta.source})`
        }
      }))
    )
    .catch(error => {
      console.error('web3Enable', error)
      return []
    })
}

export let polkaApi

let polkaApiNetwork = ''

export const loadPolkaApi = network => {
  console.log(network, polkaApiNetwork)
  if (polkaApiNetwork && network !== polkaApiNetwork) {
    window.location.reload()
  }
  return new Promise(async resolve => {
    if (polkaApi?._isReady) {
      resolve(polkaApi)
    } else {
      if (polkaApi) return
      console.log('loadPolkaApi')
      try {
        polkaApiNetwork = network
        let providerURL
        // eslint-disable-next-line no-undef
        providerURL = network === 'kusama' ? 'wss://kusama-rpc.polkadot.io/' : 'wss://cc1-1.polkadot.network'
        const provider = new WsProvider(providerURL)
        polkaApi = new ApiPromise({ provider })
        polkaApi.on('connected', () => console.log('connected'))
        polkaApi.on('disconnected', () => {
          console.log('disconnected')
          polkaApi = null
          subscription && subscription.unsubscribe()
          if (
            document
              .querySelector('body')
              .getAttribute('data-view')
              .includes('polkaWallet')
          ) {
            Msg(window.localeMsg[window._config.locale].polkaWallet.reconnect, { duration: 0 })
            loadPolkaApi(network)
          }
        })
        polkaApi.on('ready', async () => {
          console.log('ready', polkaApi)
          MsgClose()
          store.commit('setApiconnectedStatus', true)
          loadOnReady()
          resolve()
        })
      } catch (err) {
        loadPolkaApi(network)
      }
    }
  })
}

async function loadOnReady() {
  console.log('loadOnReady')
  const properties = await polkaApi.rpc.system.properties()
  const ss58Format =
    uiSettings.prefix === -1 ? properties.ss58Format.unwrapOr(DEFAULT_SS58).toNumber() : uiSettings.prefix
  // explicitly override the ss58Format as specified
  registry.setChainProperties(registry.createType('ChainProperties', { ...properties, ss58Format }))

  const accounts = await injectedAccounts()
  console.log(ss58Format, 'ss58Format')
  keyring.loadAll(
    {
      genesisHash: polkaApi.genesisHash,
      isDevelopment: false,
      ss58Format,
      type: 'ed25519'
    },
    accounts
  )
  loadAccounts()
}

// 导入浏览器插件账户
async function loadAccounts() {
  const addressList = await new Promise(resolve => {
    subscription = accountObservable.subject.subscribe(injectAccounts => {
      resolve(injectAccounts ? Object.keys(injectAccounts) : [])
    })
  })
  const accounts = addressList.map(address => {
    const info = keyring.getAccount(address)
    return {
      address,
      name: info?.meta?.name
    }
  })

  store.commit('setAccounts', accounts)
  await store.dispatch('queryBalances')
  store.commit('setAccountLoadedStatus', true)
}

const notifyOption = {
  offset: 80,
  customClass: 'tx-notify'
}
let notifyIns = null
function showNotify(type, title, message, duration = 3000) {
  notifyIns?.close()
  notifyIns = Notification[type]({
    ...notifyOption,
    title,
    message,
    duration
  })
}
function isFunction(value) {
  return typeof value === 'function'
}

const stakeTxTypes = [
  'staking.bond',
  'session.setKeys',
  'staking.nominate',
  'staking.bondExtra',
  'utility.batch',
  'staking.setController',
  'staking.setPayee',
  'staking.validate',
  'staking.chill',
  'staking.unbond'
]

export async function makeExtrinsicCall({ accountId, tx, params, extrinsic: propsExtrinsic, txFailedCb, txSuccessCb }) {
  if (!polkaApi || !polkaApi._isReady) {
    console.error(`polkacube api is disconnected or no ready, please waitting`)
    return
  }
  console.log(accountId, 'accountId', params, 'params')
  let extrinsic
  if (!propsExtrinsic) {
    const [section, method] = (tx || '').split('.')
    if (!polkaApi.tx[section] || !polkaApi.tx[section][method]) {
      console.error(`Unable to find api.tx.${section}.${method}`)
    }
    extrinsic = polkaApi.tx[section][method](...(isFunction(params) ? params() : params || []))
  } else {
    extrinsic = propsExtrinsic
  }
  if (!txSuccessCb && stakeTxTypes.includes(tx)) {
    txSuccessCb = () => store.dispatch('queryStakeList')
  }
  showNotify('info', tx, 'signing', 0)
  // extrinsic.paymentInfo(accountId).then(info => {
  //   const fee = formatBalance(info.partialFee, { withSiFull: true })
  //   console.log(fee, 'fee')
  // })
  const injected = await web3FromSource('polkadot-js')
  polkaApi.setSigner(injected.signer)

  try {
    const unsubscribe = await extrinsic.signAndSend(accountId, async result => {
      if (!result || !result.status) {
        return
      }
      const status = result.status.type.toLowerCase() // ready broadcast inblock
      console.log(status, 'status')
      console.log('makeExtrinsicCall: updated status ::', JSON.stringify(result))
      if (result.status.isFinalized || result.status.isInBlock) {
        unsubscribe()
        result.events
          .filter(({ event: { section } }) => section === 'system')
          .forEach(({ event: { method } }) => {
            if (method === 'ExtrinsicFailed') {
              console.log(extractEvents(result))
              const { title, message } = extractEvents(result)
              showNotify('error', title, message)
              isFunction(txFailedCb) && txFailedCb()
            } else if (method === 'ExtrinsicSuccess') {
              console.log('ExtrinsicSuccess')
              setTimeout(() => {
                // 防止数据未及时刷新 暂时设为1s
                showNotify('success', tx, status)
                store.dispatch('queryBalances')
                isFunction(txSuccessCb) && txSuccessCb()
              }, 1000)
            }
          })
      } else if (result.isError && isFunction(txFailedCb)) {
        txFailedCb()
      } else {
        showNotify('info', tx, status, 0)
      }
    })
  } catch (err) {
    console.error('transaction: error:', err)
    showNotify('error', tx, err)
  }
}

function extractEvents(result) {
  return (
    ((result && result.events) || [])
      // filter events handled globally, or those we are not interested in, these are
      // handled by the global overview, so don't add them here
      .filter(record => !!record.event && record.event.section !== 'democracy')
      .map(({ event: { data, method, section } }) => {
        if (section === 'system' && method === 'ExtrinsicFailed') {
          const [dispatchError] = data
          let message = dispatchError.type

          if (dispatchError.isModule) {
            try {
              const mod = dispatchError.asModule
              const error = registry.findMetaError(new Uint8Array([mod.index.toNumber(), mod.error.toNumber()]))
              message = `${error.section}.${error.name}`
            } catch (error) {
              // swallow
              message = 'ExtrinsicFailed'
            }
          }
          console.log(message, 'message')
          return {
            title: `${section}.${method}`,
            message
          }
        }
        return null
      })
      .filter(t => !!t)[0]
  )
}

// 数据转换 number => Bn
const ZERO = new BN(0)
const TEN = new BN(10)

export function getValuesFromString(value, si = formatBalance.findSi('-')) {
  return inputToBn(value, si)
}

function getSiPowers(si) {
  if (!si) {
    return [ZERO, 0, 0]
  }

  const basePower = 12
  return [new BN(basePower + si.power), basePower, si.power]
}

function inputToBn(input, si) {
  const [siPower, basePower, siUnitPower] = getSiPowers(si)
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const isDecimalValue = input.match(/^(\d+)\.(\d+)$/)

  let result

  if (isDecimalValue) {
    if (siUnitPower - isDecimalValue[2].length < -basePower) {
      result = new BN(-1)
    }

    const div = new BN(input.replace(/\.\d*$/, ''))
    const modString = input.replace(/^\d+\./, '')
    const mod = new BN(modString)

    result = div.mul(TEN.pow(siPower)).add(mod.mul(TEN.pow(new BN(basePower + siUnitPower - modString.length))))
  } else {
    result = new BN(input.replace(/[^\d]/g, '')).mul(TEN.pow(siPower))
  }

  return result
}

function isSingle(entry) {
  return !Array.isArray(entry)
}

export function createErasString(eras = []) {
  if (!eras.length) {
    return ''
  }

  return eras
    .reduce((result, era) => {
      if (result.length === 0) {
        return [era]
      } else {
        const last = result[result.length - 1]

        if (isSingle(last)) {
          if (last + 1 === era) {
            result[result.length - 1] = [last, era]
          } else {
            result.push(era)
          }
        } else {
          if (last[1] + 1 === era) {
            last[1] = era
          } else {
            result.push(era)
          }
        }
      }

      return result
    }, [])
    .map(entry => (isSingle(entry) ? entry : `${entry[0]}-${entry[1]}`))
    .join(', ')
}
