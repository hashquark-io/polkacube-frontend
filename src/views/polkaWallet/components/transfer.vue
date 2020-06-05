<template>
  <div class="dialog-wallet transfer">
    <p class="title">
      {{ $t('polkaDialog.Send') }}
    </p>
    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.Sender') }}</p>
    <account-info :accountId="accountId" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.Receiver') }}</p>

    <div class="account-wrap drop">
      <el-dropdown trigger="click" style="width: 100%" @visible-change="dropStatusChange" placement="bottom-end">
        <div class="input-wrap">
          <input
            ref="inputAddress"
            v-if="isInput"
            type="text"
            class="input-address"
            :value="inputAddressVal"
            @input="search"
            :placeholder="recipientAccount && recipientAccount.address"
          />
          <div class="img-wrap" v-if="isInput">
            <img
              src="@/assets/img/icon-arrow-down-2.png"
              style="width:12px;height:12px;"
              :class="['icon', dropListVisible && 'icon-rotate']"
            />
          </div>

          <div class="account" v-if="recipientAccount && !isInput" @click="toInput">
            <div class="left">
              <Identicon :size="38" :theme="'polkadot'" :value="recipientAccount.address" class="avatar" />
            </div>
            <div class="right">
              <div class="top">
                <div class="name">{{ recipientAccount.name || $t('polkaDialog.account') }}</div>
                <div v-if="recipientAccount.balancesAll">
                  <span class="label">{{ $t('polkaDialog.availableBalance') }}</span>
                  <span class="value">{{ recipientAccount.balancesAll.availableBalanceFormat }}</span>
                </div>
              </div>
              <div class="address">{{ recipientAccount.address }}</div>
            </div>
            <div class="img-wrap">
              <img
                src="@/assets/img/icon-arrow-down-2.png"
                style="width:12px;height:12px;"
                :class="['icon', dropListVisible && 'icon-rotate']"
              />
            </div>
          </div>
        </div>

        <el-dropdown-menu slot="dropdown" class="account-dropdown">
          <el-dropdown-item disabled v-if="!isSearch">
            <p class="item-header">{{ $t('polkaDialog.MyAccounts') }}</p>
          </el-dropdown-item>

          <el-dropdown-item
            v-for="account in isSearch ? searchList : accounts"
            :key="account.address"
            :class="[isSelected(account) && 'el-dropdown-item-active']"
          >
            <div class="account account-item" @click="selectRecipientAccount(account.address)">
              <div class="left">
                <Identicon :size="38" :theme="'polkadot'" :value="account.address" class="avatar" />
              </div>
              <div class="right">
                <div class="top">
                  <div class="name">{{ account.name || $t('polkaDialog.account') }}</div>
                  <div v-if="account.balancesAll">
                    <span class="label">{{ $t('polkaDialog.availableBalance') }}</span>
                    <span class="value">{{ account.balancesAll.availableBalanceFormat }}</span>
                  </div>
                </div>
                <div class="address">{{ account.address }}</div>
              </div>
            </div>
          </el-dropdown-item>

          <el-dropdown-item disabled v-if="isSearch && searchList.length === 0">
            <p class="item-header">{{ $t('polkaDialog.NoAccountsFound') }}</p>
          </el-dropdown-item>

          <el-dropdown-item disabled v-if="recentAccounts.length > 0 && !isSearch">
            <p class="item-header">{{ $t('polkaDialog.Recent') }}</p>
          </el-dropdown-item>

          <template v-if="!isSearch">
            <el-dropdown-item
              v-for="account in recentAccounts"
              :key="account.address"
              :class="[isSelected(account) && 'el-dropdown-item-active']"
            >
              <div class="account-item" @click="selectRecipientAccount(account.address)">
                <div class="left">
                  <Identicon :size="38" :theme="'polkadot'" :value="account.address" class="avatar" />
                </div>
                <div class="right">
                  <div class="top">
                    <div class="name">{{ account.name || $t('polkaDialog.account') }}</div>
                    <div v-if="account.balancesAll">
                      <span class="label">{{ $t('polkaDialog.availableBalance') }}</span>
                      <span class="value">{{ account.balancesAll.availableBalanceFormat }}</span>
                    </div>
                  </div>
                  <div class="address">{{ account.address }}</div>
                </div>
              </div>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <p class="sub-title">
      {{ $t('polkaDialog.SendAmount') }}
    </p>
    <div class="dialog-input-wrap">
      <input
        ref="inputAmount"
        type="text"
        class="input"
        :value="transactionAmount"
        @input="formatInp"
        :placeholder="$t('polkaDialog.PleaseEnterAmount')"
      />
      <span class="input-suffix">{{ units }}</span>
    </div>

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && sendTransaction()">
      {{ $t('polkaDialog.Send') }}
    </div>
  </div>
</template>

<script>
import Identicon from '@polkadot/vue-identicon'
import accountInfo from './accountInfo'
import { getValuesFromString, makeExtrinsicCall } from '@/methods/polkaUtils'
import Keyring from '@polkadot/keyring'
import { hexToU8a, isHex } from '@polkadot/util'
import { formatInp } from '@/methods/util'
let timer
const keyring = new Keyring()
export default {
  components: {
    Identicon,
    accountInfo
  },
  props: ['accountId'],
  data() {
    return {
      recentAccounts: this.$ls.get('recentAccounts') || [],
      lastTransferAddress: '',
      recipientAccountId: '',
      dropListVisible: false,
      inputAddressVal: '',
      isInput: true, // 是否是可输入状态
      isSearch: false, // input 输入
      isQuerying: false, // 是否在查询全网帐号
      transactionAmount: ''
    }
  },
  computed: {
    accounts() {
      return this.$store.state.accounts
    },
    allAccounts() {
      return this.accounts.concat(this.recentAccounts)
    },
    recipientAccount() {
      return this.allAccounts.find(t => t.address === this.recipientAccountId)
    },
    searchList() {
      const value = this.inputAddressVal.toLowerCase()
      const list = this.allAccounts.filter(t => {
        const { name, address } = t
        return (name && name.toLowerCase().includes(value)) || address.toLowerCase().includes(value)
      })
      return list
    },
    canClick() {
      return this.transactionAmount !== ''
    }
  },
  mounted() {
    this.checkLastTransferAddress()
    this.filterRecentAccounts()
    this.updateRecentAccounts()
    this.startTimer()
  },
  methods: {
    queryIdentity(address) {
      return this.axios.get(`${window._config.url.identity}/${address}`)
    },
    queryBalance(address) {
      return this.axios(`${window._config.url.balances}/${address}`)
    },
    filterRecentAccounts() {
      this.recentAccounts = this.recentAccounts.filter(t => !this.accounts.find(k => k.address === t.address))
    },
    // 更新最近交易账户信息
    async updateRecentAccounts() {
      const recentAccounts = [...this.recentAccounts]
      for (let t of recentAccounts) {
        const [{ display }, balancesAll] = await Promise.all([
          this.queryIdentity(t.address),
          this.queryBalance(t.address)
        ])
        t.balancesAll = balancesAll
        t.name = display
      }
      this.$ls.set('recentAccounts', recentAccounts)
    },
    checkLastTransferAddress() {
      this.recipientAccountId = this.$ls.get('lastTransferAddress') || this.accountId
      this.isInput = false
    },
    dropStatusChange(visible) {
      this.dropListVisible = visible
      if (!visible) {
        this.$nextTick(() => {
          this.inputAddressVal &&
            this.validateAddress(this.inputAddressVal) &&
            this.selectRecipientAccount(this.inputAddressVal)
          this.isInput = false
        })
      }
    },
    selectRecipientAccount(address) {
      this.updateLastTransferAddress(address)
      this.recipientAccountId = address
      this.isInput = false
    },
    updateLastTransferAddress(address) {
      this.$ls.set('lastTransferAddress', address)
      this.lastTransferAddress = address
    },
    isSelected(account) {
      return account.address === this.recipientAccount?.address
    },
    toInput() {
      this.inputAddressVal = ''
      this.isInput = true
      this.isSearch = false
      this.$nextTick(() => {
        this.$refs.inputAddress.focus()
      })
    },
    validateAddress(val) {
      try {
        keyring.encodeAddress(isHex(val) ? hexToU8a(val) : keyring.decodeAddress(val))
        return val
      } catch (error) {
        console.error('Unable to encode address', val)
        return
      }
    },
    search(e) {
      this.inputAddressVal = e.target.value
      if (this.inputAddressVal) {
        this.isSearch = true
        if (this.searchList.length === 0) {
          const address = this.validateAddress(e.target.value)
          if (address) {
            this.addRecentAccounts(address)
          }
        }
      } else {
        this.isSearch = false
      }
    },
    addRecentAccounts(address) {
      const account = { address, balancesAll: {}, name: undefined }
      this.recentAccounts.unshift(account)
      this.recentAccounts = this.recentAccounts.slice(0, 5)
      Promise.all([this.queryIdentity(address), this.queryBalance(address)]).then(([{ display }, balancesAll]) => {
        console.log(balancesAll, 'balancesAll')
        this.recentAccounts[0].name = display
        this.recentAccounts[0].balancesAll = balancesAll
        this.$ls.set('recentAccounts', this.recentAccounts)
      })
    },

    async sendTransaction() {
      if (!this.transactionAmount) {
        this.$msg.error(this.$t('polkaAccount.msg')[1])
        return
      }
      this.$emit('closeDialog')
      makeExtrinsicCall({
        tx: 'balances.transfer',
        params: [this.recipientAccount.address, getValuesFromString(this.transactionAmount)],
        accountId: this.accountId
      })
    },

    startTimer() {
      timer = setInterval(() => {
        this.updateRecentAccounts()
      }, 5000)
    },
    formatInp(e) {
      this.transactionAmount = e.target.value = formatInp(e.target.value)
    }
  },
  beforeDestroy() {
    clearInterval(timer)
    timer = null
  }
}
</script>
<style src="./style.scss" lang="scss"></style>
