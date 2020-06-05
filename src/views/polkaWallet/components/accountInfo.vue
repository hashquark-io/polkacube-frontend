<template>
  <div class="account-info-comp">
    <div class="account-wrap" v-if="!canDrop">
      <div class="account">
        <div class="left">
          <Identicon :size="38" :theme="'polkadot'" :value="selectedAccount.address" class="avatar" />
        </div>
        <div class="right">
          <div class="top">
            <div class="name">{{ selectedAccount.name }}</div>
            <div v-if="selectedAccount.balancesAll && !hideTransferrable">
              <span class="label">{{ $t('polkaDialog.Transferrable') }}</span>
              <span class="value">{{ selectedAccount.balancesAll.availableBalanceFormat }}</span>
            </div>
          </div>
          <div class="address">{{ selectedAccount.address }}</div>
        </div>
      </div>
    </div>

    <div class="account-wrap drop" v-if="canDrop">
      <el-dropdown trigger="click" style="width: 100%" @visible-change="dropStatusChange" placement="bottom-end">
        <div class="input-wrap">
          <div class="account">
            <div class="left">
              <Identicon :size="38" :theme="'polkadot'" :value="selectedAccount.address" class="avatar" />
            </div>
            <div class="right">
              <div class="top">
                <div class="name">{{ selectedAccount.name }}</div>
                <div v-if="selectedAccount.balancesAll && !hideTransferrable">
                  <span class="label">{{ $t('polkaDialog.Transferrable') }}</span>
                  <span class="value">{{ selectedAccount.balancesAll.availableBalanceFormat }}</span>
                </div>
              </div>
              <div class="address">{{ selectedAccount.address }}</div>
            </div>
            <div class="img-wrap">
              <img
                src="@/assets/img/icon-arrow-down-2.png"
                style="width:12px;height:12px;"
                :class="['icon', dropStatus && 'icon-rotate']"
              />
            </div>
          </div>
        </div>

        <el-dropdown-menu slot="dropdown" class="account-dropdown">
          <el-dropdown-item
            v-for="account in accounts"
            :key="account.address"
            :class="[isSelected(account) && 'el-dropdown-item-active']"
          >
            <div class="account account-item" @click="selectAccount(account.address)">
              <div class="left">
                <Identicon :size="38" :theme="'polkadot'" :value="account.address" class="avatar" />
              </div>
              <div class="right">
                <div class="top">
                  <div class="name">{{ account.name }}</div>
                  <div v-if="account.balancesAll && !hideTransferrable">
                    <span class="label">{{ $t('polkaDialog.Transferrable') }}</span>
                    <span class="value">{{ account.balancesAll.availableBalanceFormat }}</span>
                  </div>
                </div>
                <div class="address">{{ account.address }}</div>
              </div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Identicon from '@polkadot/vue-identicon'

export default {
  components: {
    Identicon
  },

  props: ['accountId', 'canDrop', 'hideTransferrable'],
  computed: {
    selectedAccount() {
      return (
        this.accounts.find(t => t.address === this.selectedAccountId) || {
          address: this.selectedAccountId,
          name: this.$t('polkaDialog.account')
        }
      )
    },
    accounts() {
      return this.$store.state.accounts
    }
  },
  data() {
    return {
      dropStatus: false,
      selectedAccountId: this.accountId
    }
  },
  methods: {
    isSelected(account) {
      return account.address === this.selectedAccountId
    },
    dropStatusChange(visible) {
      this.dropStatus = visible
    },
    selectAccount(address) {
      this.selectedAccountId = address
      this.$emit('selected', address)
    }
  }
}
</script>
<style lang="scss">
html.desktop .account-info-comp {
  .account-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 14px;
    height: 86px;
    background: $color-5;
  }
  .account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 58px;
    background: #fff;
    padding: 0 42px 0 20px;
    // &.send-account,
    // &.result {
    //   background: $color-5;
    //   padding-right: 55px;
    // }
    .left {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 10px;
        height: 38px;
      }
    }
    .right {
      flex: 1;
      height: 41px;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .name {
        font-weight: 500;
        line-height: 24px;
      }
      .address {
        font-size: 12px;
        line-height: 17px;
        text-align: left;
      }
      .label {
        margin-right: 8px;
        font-size: 12px;
        color: $color-3;
      }
      .value {
        font-weight: 500;
        line-height: 20px;
      }
    }
  }
  .account-wrap.drop {
    display: flex;
    align-items: center;
    .input-wrap {
      position: relative;
      border: 1px solid $color-6;
      border-radius: 4px;
    }
    .input-address {
      width: 100%;
      height: 40px;
      line-height: 40px;
      appearance: none;
      outline: none;
      border: none;
      padding-left: 16px;
      padding-right: 60px;
    }
    .img-wrap {
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -20px;
      height: 40px;
      width: 40px;
      text-align: center;
      line-height: 40px;
      pointer-events: none;
    }
  }
}
</style>
