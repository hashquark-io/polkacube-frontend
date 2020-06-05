/* eslint-disable no-undef */
import device from '@/methods/device'
import './statistics'

window._config = {}

export const loadConfig = network => {
  if (network === window._config.network) return
  const BASE_HOST = network === 'kusama' ? POLKACUBE_SERVER : POLKADOT_SERVER
  window.SOCKET_HOST = network === 'kusama' ? POLKACUBE_SOCKET_SERVER : POLKADOT_SOCKET_SERVER
  const polkaPrefix =
    BUILD_ENV !== 'development' ? `${BASE_HOST}api/v1` : `${network === 'kusama' ? 'kusama' : 'polkadot'}/api/v1`

  const url = {
    // polka
    validator: `${polkaPrefix}/validator`,
    identity: `${polkaPrefix}/identity`, // /api/v1/validator/identity/:accountId
    token: `${polkaPrefix}/token`,
    reward: `${polkaPrefix}/reward`,
    slashRecords: `${polkaPrefix}/slash`, // slash记录
    slashStatistics: `${polkaPrefix}/slash-count`, // slash 统计
    accountSlashStatistics: `${polkaPrefix}/slash-accountId`, // 验证人详情页 slash 统计
    tokenValidator: `${polkaPrefix}/token-validator`,
    finalizeNumber: `${polkaPrefix}/finalize-number`,
    point: `${polkaPrefix}/point`,
    slashReward: `${polkaPrefix}/slash-reward`,

    // polka wallet
    stashes: `${polkaPrefix}/account/stashes`, // 质押管理
    allStashes: `${polkaPrefix}/account/all-stashes`, // 质押管理
    stakeRewards: `${polkaPrefix}/account/rewards`, // 质押收益
    allBalances: `${polkaPrefix}/account/all-balances`,
    balances: `${polkaPrefix}/account/balances`,
    allValidator: `${polkaPrefix}/validators/stashes`, // 质押提名所有验证人

    //polka strategy
    node: `${polkaPrefix}/node`,
    nomination: `${polkaPrefix}/nomination`,
    //polka referendums proposal
    overview: `${polkaPrefix}/democracy/overview`,
    referendums: `${polkaPrefix}/democracy/referendums`,
    proposals: `${polkaPrefix}/democracy/proposals`
  }
  window._config = {
    isMobile: device.type === 'mobile',
    locale: 'zh-TW',
    network,
    url
  }
}
loadConfig('polkadot-cc1')
