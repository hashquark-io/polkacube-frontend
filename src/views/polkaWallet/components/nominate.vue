<template>
  <div class="dialog-wallet nominate">
    <p class="title">
      <span class="send">{{ $t('polkaDialog.Nominate') }}</span>
    </p>
    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.StashAccount') }}</p>

    <account-info :accountId="accountId" :hideTransferrable="true" />

    <p class="color-1" style="margin-bottom: 11px;">{{ $t('polkaDialog.ControllerAccount') }}</p>

    <account-info :accountId="controllerId" :hideTransferrable="true" />
    <p class="nominator-select-title">
      <span>{{ $t('polkaDialog.ChooseNominees') }}</span>
      <span>{{ $t('polkaDialog.NomiatedAccounts') }}</span>
    </p>
    <div class="nominator-select-list">
      <div class="select" v-loading="loading">
        <div class="input-wrap">
          <input
            type="text"
            v-model="searchVal"
            class="input"
            :placeholder="$t('polkaDialog.SearchValidatorAccounts')"
          />
        </div>
        <div
          v-for="(account, ind) in searchList"
          :key="ind"
          class="account-item"
          v-show="!account.isHidden"
          @click="select(account)"
        >
          <Identicon :size="38" :theme="'polkadot'" :value="account.address" class="avatar" style="height: 38px;" />
          <div class="info">
            <div class="name ellipsis">
              <el-popover
                trigger="hover"
                width="420"
                popper-class="totalBonded-popover phala-tip"
                v-if="account.partner"
              >
                <p>
                  <span v-html="$t('validatorComp.description')"></span>
                  &nbsp;
                  <a href="https://forum.phala.network/" rel="noopener noreferrer" target="_blank">{{
                    $t('validatorComp.detail')
                  }}</a>
                  &nbsp;
                  {{ $t('validatorComp.descriptionEnd') }}
                </p>
                <img
                  slot="reference"
                  class="icon-judgement el-popover__reference"
                  src="@/assets/img/icon-judge-7.png"
                />
              </el-popover>
              {{ account.name || $t('polkaDialog.account') }}
            </div>
            <div class="address">{{ strSlice(account.address, 18, 6) }}</div>
          </div>
        </div>
        <div class="account-item" v-show="nodata">
          {{ $t('polkaDialog.NoAccountsFound') }}
        </div>
      </div>
      <div class="selected">
        <div
          class="account-item"
          v-for="selectedAccount in selectedAccounts"
          :key="selectedAccount.address"
          @click="deselect(selectedAccount)"
        >
          <Identicon :size="38" :theme="'polkadot'" :value="selectedAccount.address" class="avatar" />
          <div class="info">
            <div class="name ellipsis">
              <el-popover
                trigger="hover"
                width="420"
                popper-class="totalBonded-popover phala-tip"
                v-if="selectedAccount.partner"
              >
                <p>
                  <span v-html="$t('validatorComp.description')"></span>
                  &nbsp;
                  <a href="https://forum.phala.network/" rel="noopener noreferrer" target="_blank">{{
                    $t('validatorComp.detail')
                  }}</a>
                  &nbsp;
                  {{ $t('validatorComp.descriptionEnd') }}
                </p>
                <img
                  slot="reference"
                  class="icon-judgement el-popover__reference"
                  src="@/assets/img/icon-judge-7.png"
                />
              </el-popover>
              {{ selectedAccount.name || $t('polkaDialog.account') }}
            </div>
            <div class="address">{{ strSlice(selectedAccount.address, 18, 6) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div :class="['btn-send', !canClick && 'disabled']" @click="canClick && startNominate()">
      {{ $t('polkaDialog.startNominate') }}
    </div>
  </div>
</template>
<script>
import accountInfo from './accountInfo'
import Identicon from '@polkadot/vue-identicon'

import { formatInp } from '@/methods/util'
import { makeExtrinsicCall } from '@/methods/polkaUtils'

const MAX_NOMINEES = 16

export default {
  components: {
    accountInfo,
    Identicon
  },
  props: ['nominators', 'stake'],
  data() {
    return {
      sessionKey: '',
      accountId: this.stake.stakingAccount.accountId,
      controllerId: this.stake.stakingAccount.controllerId,
      availableAccounts: [],
      searchVal: '',
      loading: true
    }
  },
  computed: {
    searchList() {
      const val = this.searchVal.toLowerCase().trim()
      return this.availableAccounts.filter(t => {
        const { name, address } = t
        return name?.toLowerCase().includes(val) || address?.toLowerCase().includes(val)
      })
    },
    selectedAccounts() {
      return this.availableAccounts.filter(t => t.isHidden)
    },
    canClick() {
      return this.selectedAccounts.length > 0
    },
    nodata() {
      return this.availableAccounts.length > 0 && this.searchList.length === 0
    }
  },
  mounted() {
    this.queryValidator()
  },
  methods: {
    queryValidator() {
      this.loading = true
      this.axios.get(window._config.url.allValidator).then(res => {
        const availableAccounts = res.map(t => {
          return {
            address: t.validatorAddr,
            name: t.validatorName?.display,
            isHidden: this.nominators?.includes(t) || false,
            partner: !!t.partner
          }
        })
        const favorites = this.$ls.get('favorites') || {}
        const favoritesList = availableAccounts.filter(t => favorites[t.address])
        const unfavoritesList = availableAccounts.filter(t => !favorites[t.address])
        this.availableAccounts = favoritesList.concat(unfavoritesList)
        this.loading = false
      })
    },
    isSelected(account) {
      return account.address === this.account.address
    },
    startNominate() {
      this.$emit('closeDialog')
      const selection = this.selectedAccounts.map(t => t.address)
      makeExtrinsicCall({
        tx: 'staking.nominate',
        params: [selection],
        accountId: this.controllerId
      })
    },
    select(account) {
      if (this.selectedAccounts.length >= MAX_NOMINEES) {
        return
      }
      account.isHidden = true
    },
    deselect(account) {
      const item = this.availableAccounts.find(t => t.address === account.address)
      item.isHidden = false
    },
    formatInp(e) {
      this.stakeAmount = e.target.value = formatInp(e.target.value)
    }
  }
}
</script>
<style lang="scss">
html.desktop .dialog-wallet.nominate {
  .nominator-select-title {
    display: flex;
    margin-bottom: 8px;
    span:first-child {
      display: inline-block;
      width: 302px;
    }
  }
  .nominator-select-list {
    position: relative;
    display: flex;
    justify-content: space-between;

    .select,
    .selected {
      position: relative;
      padding: 8px 10px 0;
      width: 292px;
      height: 252px;
      border-radius: 4px;
      border: 1px solid $color-6;
      overflow: auto;
      .account-item {
        display: flex;
        align-items: center;
        margin: 15px 0;
        text-align: left;
        cursor: pointer;
        .avatar {
          margin-right: 8px;
        }
        .name {
          width: 190px;
          font-weight: 500;
          img {
            width: 14px;
          }
        }
        .address {
          font-size: 12px;
          color: $color-1;
          line-height: 17px;
        }
      }
    }
    .selected {
      background: $color-5;
      .account-item:first-child {
        margin-top: 7px;
      }
      .account-item:last-child {
        margin-bottom: 7px;
      }
    }
    .select {
      padding-top: 42px;
      text-align: center;
      .input-wrap {
        position: absolute;
        top: 1px;
        left: 1px;
        z-index: 1;
        width: 270px;
        padding: 8px;
        background: #fff;
        .input {
          padding: 0 8px;
          width: 252px;
          height: 34px;
          line-height: 32px;
          appearance: none;
          outline: none;
          border: 1px solid $color-6;
          border-radius: 4px;
          transition: all 0.3s;
          &:focus {
            border-color: $color-2;
          }
        }
      }
    }
  }
}
</style>
