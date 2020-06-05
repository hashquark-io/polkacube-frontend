<template>
  <div class="my-account-wrap" v-loading="loading">
    <div class="total-assets" v-if="accounts.length > 0">
      <img src="@/assets/img/icon-assets.png" alt="" />
      <span>{{ $t('polkaAccount.totalAssets') }}</span>
      <span class="f-20">{{ thousandth(totalAssets / 1000000000000, 3) }} {{ units }}</span>
    </div>
    <div class="item" v-for="(account, ind) in list" :key="account.address">
      <div class="column-info">
        <div class="avatar">
          <Identicon :size="38" :theme="'polkadot'" :value="account.address" />
        </div>
        <div class="info">
          <div class="name">
            <span>
              <span>{{ account.name }}</span>
            </span>
          </div>
          <a
            class="address"
            :href="`https://polkascan.io/${units === 'KSM' ? 'pre/kusama' : 'polkadot-cc1'}/account/${account.address}`"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{{ account.address }}</span>
            <img src="@/assets/img/link.png" alt="" class="icon-link" />
          </a>
          <div class="notes">
            <span class="label">{{ $t('polkaAccount.notes') }}</span>
            <span v-show="!account.editNotes" @click="edit(account.address, ind, 'notes', true)">
              <span>{{ account.notes }}</span>
              <img src="@/assets/img/write.png" alt="" class="icon-write" />
            </span>
            <input
              v-show="account.editNotes"
              type="text"
              :value="account.notes"
              @input="editNotes($event, account)"
              class="inp-1"
              ref="notes"
              maxlength="30"
              @blur="edit(account.address, ind, 'notes', false)"
              @keyup.enter="edit(account.address, ind, 'notes', false)"
            />
          </div>
        </div>
      </div>
      <div class="column-balances" v-if="account.balancesAll">
        <div class="item">
          <span class="label">{{ $t('polkaAccount.totalBalance') }}</span>
          <span class="value total">{{ account.balancesAll.freeBalanceFormat || 0 }}</span>
        </div>
        <div class="item" v-if="account.balancesAll.availableBalance">
          <span class="label">{{ $t('polkaAccount.availableBalance') }}</span>
          <span class="value">{{ account.balancesAll.availableBalanceFormat }}</span>
        </div>
        <div class="item" v-if="account.balancesAll.lockedBalance">
          <span class="label">{{ $t('polkaAccount.lockedBalance') }}</span>
          <span class="value">{{ account.balancesAll.lockedBalanceFormat }}</span>
        </div>
        <div class="item" v-if="account.balancesAll.reservedBalance">
          <span class="label">{{ $t('polkaAccount.reservedBalance') }}</span>
          <span class="value">{{ account.balancesAll.reservedBalanceFormat }}</span>
        </div>
        <div class="item" v-if="account.balancesAll.bondedBalance">
          <span class="label">{{ $t('polkaAccount.bondedBalance') }}</span>
          <span class="value">{{ account.balancesAll.bondedBalanceFormat }}</span>
        </div>
        <div class="item" v-if="account.balancesAll.unbondingBalance">
          <span class="label">{{ $t('polkaAccount.unbondingBalance') }}</span>
          <span class="value"
            >{{ account.balancesAll.unbondingBalanceFormat }}
            <el-popover
              trigger="hover"
              placement="top"
              popper-class="balances-popover"
              v-if="account.balancesAll.unbondingDetail"
            >
              <i class="el-icon-warning-outline" slot="reference"></i>
              <div class="content">
                <div class="item" v-for="(t, i) in account.balancesAll.unbondingDetail" :key="i">
                  <span>{{ t.valueFormat }}</span>
                  <span>{{ $t('polkaAccount.comma') }}</span>
                  <span>{{ thousandth(t.remaingBlocks) }} {{ $t('polkaAccount.remainBlocks') }}</span>
                </div>
              </div>
            </el-popover>
          </span>
        </div>
        <div class="item" v-if="account.balancesAll.redeemable">
          <span class="label">{{ $t('polkaAccount.redeemable') }}</span>
          <span class="value"
            >{{ account.balancesAll.redeemableFormat }}
            <span class="btn" @click="toggleOperateType(account, 'redeem')">{{ $t('polkaAccount.redeem') }}</span>
          </span>
        </div>
      </div>
      <div class="column-operate">
        <div class="btn-group">
          <div :class="['btn', account.operateType === 'send' && 'active']" @click="toggleOperateType(account, 'send')">
            {{ $t('polkaAccount.send') }}
          </div>
          <div
            :class="['btn', account.operateType === 'receive' && 'active']"
            @click="toggleOperateType(account, 'receive')"
          >
            {{ $t('polkaAccount.receive') }}
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @closed="dialogClose(operateAccount.address)"
    >
      <div>
        <transfer
          v-if="operateAccount.operateType === 'send'"
          :accountId="operateAccount.address"
          @closeDialog="dialogVisible = false"
        />
        <receive v-if="operateAccount.operateType === 'receive'" :account="operateAccount" />

        <redeem
          v-if="operateAccount.operateType === 'redeem'"
          :accountId="operateAccount.address"
          @closeDialog="dialogVisible = false"
        />
      </div>
    </el-dialog>
    <div class="nodata" v-if="accounts.length === 0">
      <img src="@/assets/img/nodata.png" alt="" class="img-nodata" />
      <p v-html="$t('polkaAccount.nodata')"></p>
    </div>
  </div>
</template>
<script src="./myAccount.js"></script>
<style src="./myAccount.scss" lang="scss"></style>
