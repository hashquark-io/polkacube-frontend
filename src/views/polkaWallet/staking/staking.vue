<template>
  <div class="staking-wrap" v-loading="!isMounted">
    <div class="total-and-add">
      <div class="total-stake" v-if="stakeList.length > 0">
        <img src="@/assets/img/icon-assets.png" alt="" />
        <span>{{ $t('polkaStake.totalStake') }}</span>
        <span class="f-20">{{ thousandth(totalStake / 1000000000000, 3) }} {{ units }}</span>
      </div>
      <div
        :class="['btn-add', accounts.length === 0 && 'disabled']"
        @click="accounts.length > 0 && toggleDialog('newStake')"
        v-show="isMounted"
      >
        {{ $t('polkaStake.newStake') }}
      </div>
    </div>

    <div class="item" v-for="(stake, ind) in stakeList" :key="ind" @click.capture="changeOperateStake(stake)">
      <div class="top">
        <div class="column-1">
          <Identicon :size="38" :theme="'polkadot'" :value="stake.stakingAccount.accountId" class="avatar" />
          <div>
            <p class="font-1">{{ $t('polkaStake.stashAccount') }}</p>
            <p class="font-2 name ellipsis">{{ getName(stake.stakingAccount.accountId) }}</p>
          </div>
        </div>
        <div class="column-2">
          <Identicon :size="38" :theme="'polkadot'" :value="stake.stakingAccount.controllerId" class="avatar" />
          <div>
            <p class="font-1">{{ $t('polkaStake.controllerAccount') }}</p>
            <p class="font-2 name ellipsis">{{ getName(stake.stakingAccount.controllerId) }}</p>
          </div>
        </div>
        <div class="column-3">
          <p class="font-1">{{ $t('polkaStake.rewardDestination') }}</p>
          <p class="font-2" style="font-weight: 500;">
            {{ $t(`polkaStake.${stake.stakingAccount.rewardDestination}`) }}
          </p>
        </div>
        <div class="column-4">
          <p class="font-1 title">{{ $t('polkaStake.amounts') }}</p>

          <div class="item" v-if="stake.bondedBalance">
            <span class="label">{{ $t('polkaStake.bondedBalance') }}</span>
            <span class="value">{{ stake.bondedBalanceFormat }}</span>
          </div>
          <div class="item" v-if="stake.unbondingBalance">
            <span class="label">{{ $t('polkaStake.unbondingBalance') }}</span>
            <span class="value"
              >{{ stake.unbondingBalanceFormat }}
              <el-popover
                trigger="hover"
                placement="top"
                popper-class="balances-popover"
                v-if="stake.unbondingDetail"
                @after-enter="updateStakeInfo(stake)"
              >
                <i class="el-icon-warning-outline" slot="reference"></i>
                <div class="content">
                  <div class="item" v-for="(t, i) in stake.unbondingDetail" :key="i">
                    <span>{{ t.valueFormat }}</span>
                    <span>{{ $t('polkaStake.comma') }}</span>
                    <span>{{ thousandth(t.remaingBlocks) }} {{ $t('polkaStake.remainBlocks') }}</span>
                  </div>
                </div>
              </el-popover>
            </span>
          </div>
          <div class="item" v-if="stake.redeemable">
            <span class="label">{{ $t('polkaStake.redeemable') }}</span>
            <span class="value"
              >{{ stake.redeemableFormat }}
              <span class="btn" @click="toggleDialog('redeem')">{{ $t('polkaStake.redeem') }}</span>
            </span>
          </div>
        </div>
        <div class="column-5">
          <span
            :class="['btn', 'nominate', stake.inAccounts || 'disabled']"
            v-if="['default', 'sessionkey'].includes(stake.stashType)"
            @click="stake.inAccounts && toggleDialog('nominate')"
            >{{ $t('polkaStake.Nominate') }}</span
          >
          <span
            :class="['btn', 'session-key', stake.inAccounts || 'disabled']"
            v-if="stake.stashType === 'default'"
            @click="stake.inAccounts && toggleDialog('setSessionkey')"
            >{{ $t('polkaStake.SetSessionKey') }}</span
          >
          <span
            :class="['btn', 'validate', stake.inAccounts || 'disabled']"
            v-if="stake.stashType === 'sessionkey'"
            @click="stake.inAccounts && toggleDialog('setValidator')"
            >{{ $t('polkaStake.Validate') }}</span
          >
          <el-popover placement="bottom" trigger="click" popper-class="stake-setting" v-model="stake.settingPopover">
            <span slot="reference" class="btn setting">
              <img src="@/assets/img/setting.png" alt="" />
            </span>
            <div class="content">
              <p class="item" @click="toggleDialog('bondMore')">{{ $t('polkaStake.BondMoreFunds') }}</p>
              <p :class="['item', stake.inAccounts || 'disabled']" @click="stake.inAccounts && toggleDialog('unbond')">
                {{ $t('polkaStake.UnbondFunds') }}
              </p>
              <p class="line"></p>
              <p :class="['item', stake.stashIn || 'disabled']" @click="stake.stashIn && toggleDialog('setController')">
                {{ $t('polkaStake.SetControllerAccount') }}
              </p>
              <p
                :class="['item', stake.inAccounts || 'disabled']"
                @click="stake.inAccounts && toggleDialog('setRewardDestination')"
              >
                {{ $t('polkaStake.SetRewardDestination') }}
              </p>
              <p class="line"></p>
              <p
                :class="['item', stake.inAccounts || 'disabled']"
                v-if="stake.stashType !== 'nominating'"
                @click="stake.inAccounts && toggleDialog('setSessionkey')"
              >
                {{ $t('polkaStake.ChangeSessionKey') }}
              </p>
              <p
                :class="['item', stake.inAccounts || 'disabled']"
                v-if="stake.stashType === 'validating'"
                @click="stake.inAccounts && toggleDialog('setValidator')"
              >
                {{ $t('polkaStake.SetValidatorReferences') }}
              </p>
              <p
                :class="['item', stake.inAccounts || 'disabled']"
                v-if="stake.stashType === 'nominating'"
                @click="stake.inAccounts && toggleDialog('nominate')"
              >
                {{ $t('polkaStake.SetNominees') }}
              </p>
              <p class="line" v-if="['nominating', 'validating'].includes(stake.stashType)"></p>
              <p
                :class="['item', stake.inAccounts || 'disabled']"
                v-if="['nominating', 'validating'].includes(stake.stashType)"
                @click="stake.inAccounts && toggleDialog('stopStake')"
              >
                {{ $t('polkaStake.Stop') }}
              </p>
            </div>
          </el-popover>

          <img
            class="status"
            v-if="['default', 'sessionkey'].includes(stake.stashType)"
            src="@/assets/img/icon-status-grey.png"
            alt=""
          />
          <img class="status" v-else src="@/assets/img/icon-status-green.png" alt="" />
        </div>
      </div>
      <div class="bottom" v-if="['nominating', 'validating'].includes(stake.stashType)">
        <div class="column-1">
          <p class="font-1" style="cursor: pointer;" @click="toggleDropStatus(ind, 0)">
            {{ $t('polkaStake.pendingReward') }}
            <img
              src="@/assets/img/icon-arrow-down-2.png"
              style="width:12px;height:12px;"
              :class="['icon', stake.dropStatus[0] && 'icon-rotate']"
            />
          </p>
          <div class="content" v-if="stake.dropStatus[0]">
            <div v-if="stake.rewardInfo">
              <div v-if="stake.rewardInfo.validators.length > 0">
                <p class="font-2" style="margin: 16px 0 4px;">{{ stake.rewardInfo.validatorsTotalFormat }}</p>
                <p class="font-4">({{ stake.rewardInfo.totalErasLength }} {{ $t('polkaStake.Eras') }})</p>
                <div class="btn" @click="toggleDialog('receiveReward')">
                  {{ $t('polkaStake.Payout') }}
                </div>
              </div>
              <div v-else class="no-rewards">
                {{ $t('polkaStake.noRewards') }}
              </div>
            </div>
            <div v-else class="calc">
              <span>{{ $t('polkaStake.Calculating') }}</span>
              <img src="@/assets/img/icon-loading.png" alt="" />
            </div>
          </div>
        </div>
        <div class="column-2" v-if="stake.stashType === 'nominating'">
          <p class="font-1" style="cursor: pointer;" @click="toggleDropStatus(ind, 1)">
            {{ $t('polkaStake.activeNoms') }}（{{ stake.activeNoms.length }}）
            <img
              src="@/assets/img/icon-arrow-down-2.png"
              style="width:12px;height:12px;"
              :class="['icon', stake.dropStatus[1] && 'icon-rotate']"
            />
          </p>
          <div class="content" v-if="stake.dropStatus[1] && stake.activeNoms.length > 0">
            <div class="nominate-item" v-for="address in stake.activeNoms" :key="address">
              <Identicon :size="20" :theme="'polkadot'" :value="address" class="avatar" />
              <span>{{ strSlice(address) }}</span>
            </div>
          </div>
        </div>
        <div class="column-3" v-if="stake.stashType === 'nominating'">
          <p class="font-1" style="cursor: pointer;" @click="toggleDropStatus(ind, 2)">
            {{ $t('polkaStake.inactiveNoms') }}（{{ stake.inactiveNoms.length }}）

            <img
              src="@/assets/img/icon-arrow-down-2.png"
              style="width:12px;height:12px;"
              :class="['icon', stake.dropStatus[2] && 'icon-rotate']"
            />
          </p>
          <div class="content" v-if="stake.dropStatus[2] && stake.inactiveNoms.length > 0">
            <div class="nominate-item" v-for="address in stake.inactiveNoms" :key="address">
              <Identicon :size="20" :theme="'polkadot'" :value="address" class="avatar" />
              <span>{{ strSlice(address) }}</span>
            </div>
          </div>
        </div>
        <div
          class="column-4"
          v-if="stake.stashType === 'validating' && stake.withHexSessionId && stake.withHexSessionId[0]"
        >
          <p class="font-1" style="cursor: pointer;" @click="toggleDropStatus(ind, 3)">
            Session Key
            <img
              src="@/assets/img/icon-arrow-down-2.png"
              style="width:12px;height:12px;"
              :class="['icon', stake.dropStatus[3] && 'icon-rotate']"
            />
          </p>
          <p class="ellipsis font-4" v-if="stake.dropStatus[3]">{{ stake.withHexSessionId[0] }}</p>
        </div>
        <div class="column-5" v-if="stake.stashType === 'validating'">
          <p class="font-1" style="cursor: pointer;" @click="toggleDropStatus(ind, 4)">
            {{ $t('polkaStake.CommissionRate') }}
            <img
              src="@/assets/img/icon-arrow-down-2.png"
              style="width:12px;height:12px;"
              :class="['icon', stake.dropStatus[4] && 'icon-rotate']"
            />
          </p>
          <p class="ellipsis font-4" v-if="stake.dropStatus[4]">{{ stake.commissionFormat }}%</p>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="dialogType = ''">
      <div>
        <new-stake v-if="dialogType === 'newStake'" @closeDialog="dialogVisible = false" />
        <nominate v-if="dialogType === 'nominate'" :stake="operateStake" @closeDialog="dialogVisible = false" />
        <bond-more v-if="dialogType === 'bondMore'" :stake="operateStake" @closeDialog="dialogVisible = false" />
        <set-controller
          v-if="dialogType === 'setController'"
          :stake="operateStake"
          @closeDialog="dialogVisible = false"
        />
        <set-reward-destination
          v-if="dialogType === 'setRewardDestination'"
          :stake="operateStake"
          @closeDialog="dialogVisible = false"
        />
        <set-sessionkey
          v-if="dialogType === 'setSessionkey'"
          :stake="operateStake"
          @closeDialog="dialogVisible = false"
        />
        <set-validator
          v-if="dialogType === 'setValidator'"
          :stake="operateStake"
          @closeDialog="dialogVisible = false"
        />
        <unbond v-if="dialogType === 'unbond'" :stake="operateStake" @closeDialog="dialogVisible = false" />
        <receive-reward
          v-if="dialogType === 'receiveReward'"
          :stake="operateStake"
          @closeDialog="dialogVisible = false"
        />
        <stop-stake
          v-if="dialogType === 'stopStake'"
          :stake="operateStake"
          :title="
            operateStake.stashType === 'validating'
              ? $t('polkaDialog.StopValidating')
              : $t('polkaDialog.StopNonimating')
          "
          @closeDialog="dialogVisible = false"
        />
        <redeem
          v-if="dialogType === 'redeem'"
          :accountId="operateStake.stakingAccount.controllerId"
          :stake="operateStake"
          @closeDialog="dialogVisible = false"
        />
      </div>
    </el-dialog>
    <div class="nodata" v-if="stakeList.length === 0 && isMounted">
      <img src="@/assets/img/nodata.png" alt="" class="img-nodata" />
      <p>{{ $t('polkaStake.nodata') }}</p>
    </div>
  </div>
</template>
<script src="./staking.js"></script>
<style src="./staking.scss" lang="scss"></style>
