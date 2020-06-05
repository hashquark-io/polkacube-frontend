<template>
  <div class="polka-detail wrapper">
    <div class="nav-pc" v-if="!isMobile">
      <div :class="['item', item.active && 'active']" v-for="(item, ind) in navList" :key="ind" @click="navJump(item)">
        {{ $t(`polkaDetail.navPc`)[ind] }}
        <i class="el-icon-arrow-right" v-show="item.active"></i>
      </div>
    </div>
    <div class="info-wrap" ref="validator">
      <img src="@/assets/img/dot.png" alt class="img-dot" v-if="!isMobile" />
      <p class="title">{{ $t('polkaDetail.title') }}</p>
      <div class="user-info">
        <div class="left">
          <div class="top">
            <Identicon :size="36" :theme="'polkadot'" :value="info.validatorAddr" />
            <img src="@/assets/img/online.png" alt class="status-icon" v-if="+info.online" />
            <img src="@/assets/img/offline.png" alt class="status-icon" v-else />
            <div class="name-address">
              <p>
                <span class="display-name">{{
                  info.validatorName && info.validatorName.display
                    ? info.validatorName.display
                    : $t('polkaDetail.title')
                }}</span>
                <span class="rank">{{ rank }}</span>
              </p>
              <p>{{ info.validatorAddr }}</p>
            </div>
          </div>
          <div class="bottom">
            <Identicon :size="36" :theme="'polkadot'" value="HTrpbES27bqMvCioQGHpmJbBzwji6V5DeuXUfB1gsZ5Vkh1" />
            <div class="name-address">
              <p>Controller</p>
              <p>{{ info.controllerAddr }}</p>
            </div>
          </div>
        </div>
        <div class="right" v-show="showJudgement">
          <div class="judgement">
            <p class="title" v-if="identityInfo.judgements">
              <img :src="curImg" :style="imgStyle" class="icon-judgement" />
              {{ identityInfo.judgementsNum }}
              {{
                locale === 'en-US' && identityInfo.judgementsNum > 1
                  ? $t('judgementPopoverComp.judgements')
                  : $t('judgementPopoverComp.judgement')
              }}{{ $t('judgementPopoverComp')[identityInfo.judgementsDesc] }}
            </p>
            <p class="title" v-else>
              <img :src="curImg" :style="imgStyle" class="icon-judgement" />
              {{ $t('judgementPopoverComp.noJudgement') }}
            </p>
            <div class="detail" v-if="identityInfo.list && identityInfo.list.length > 0">
              <p v-for="(item, ind) in identityInfo.list" :key="ind">
                <span class="label">{{ $t(item[0]) }} </span><span class="value">{{ item[1] }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO:详情提示语说明 -->
      <phalaTip v-show="info.partner" />

      <div class="chart-wrap">
        <div class="chart-pie" ref="chart"></div>
        <div class="chart-text">
          <div class="item">
            <div class="key">{{ $t('polkaDetail.chart')[1] }}</div>
            <div class="value">{{ info.selfBondedKsm }}</div>
          </div>
          <div class="item">
            <div class="key">{{ $t('polkaDetail.chart')[2] }}</div>
            <div class="value">{{ info.nominatorsBondedKsm }}</div>
          </div>
        </div>
        <div class="divide-line"></div>
        <div class="info">
          <div class="item">
            <div class="key">{{ $t('polkaDetail.info')[0] }}</div>
            <div class="value">{{ info.commission }}</div>
          </div>
          <div class="item">
            <div class="key">{{ $t('polkaDetail.info')[1] }}</div>
            <div class="value">{{ info.eraPoint }}</div>
          </div>
          <div class="item">
            <div class="key" style="text-align:right;">{{ $t('polkaDetail.info')[2] }}</div>
            <div class="value">#{{ thousandth(info.height) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-wrap-white" v-if="!isMobile" ref="nominator">
      <div class="content">
        <nominator :nominators="info.nominators || []" />
      </div>
    </div>
    <div class="item-wrap-grey" v-if="!isMobile" ref="slash">
      <div class="content">
        <slash :autoRefresh="false" :addr="$route.query.id" />
      </div>
    </div>
    <div class="item-wrap-white" v-if="!isMobile" ref="blockChart">
      <div class="content">
        <block-chart />
      </div>
    </div>
    <div class="item-wrap-grey" v-if="!isMobile" ref="incomeSlashChart">
      <div class="content">
        <income-slash-chart />
      </div>
    </div>

    <div class="table-h5-wrap" v-if="isMobile" ref="tableH5Wrap">
      <div class="tabs" ref="tabWrap" v-sticky="{ zIndex: 50, stickyTop: 55, disabled: false }">
        <div class="tab-wrap">
          <div
            v-for="(item, i) in $t('polkaDetail.nav')"
            :key="i"
            @click="switchTab(+i)"
            :class="['tab', isActive(+i) && 'active']"
          >
            {{ $t('polkaDetail.nav')[i] }}
            <span v-if="i === '0'">({{ info.nominators && info.nominators.length }})</span>
          </div>
        </div>
      </div>
      <nominator v-if="activeInd === 0" :nominators="info.nominators || []" />
      <slash
        v-if="activeInd === 1 || activeInd === 2"
        :autoRefresh="false"
        :addr="$route.query.id"
        :tabInd="activeInd"
      />
      <block-chart v-if="activeInd === 3" />
      <income-slash-chart v-if="activeInd === 4" />
    </div>
  </div>
</template>
<style lang="scss" src="./polkaDetail.scss" scoped></style>
<script src="./polkaDetail.js"></script>
