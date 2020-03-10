<i18n src="./locale.json"></i18n>
<template>
  <div class="polka-detail wrapper">
    <div class="info-wrap">
      <p class="title">{{ $t('title') }}</p>
      <div class="user-info">
        <div class="left">
          <Identicon :size="60" :theme="'polkadot'" :value="info.validatorAddr" />
          <img src="@/assets/img/online.png" alt class="status-icon" v-if="+info.online" />
          <img src="@/assets/img/offline.png" alt class="status-icon" v-else />
          <div class="name-address">
            <p>
              <judgement-popover
                :identity="info.validatorName"
                v-if="info.validatorName && Object.keys(info.validatorName).length > 0"
                :imgStyle="imgStyle"
              />
              <span class="display-name">{{
                info.validatorName && info.validatorName.display ? info.validatorName.display : $t('title')
              }}</span>
              <span class="rank">{{ rank }}</span>
            </p>
            <p>{{ info.validatorAddr }}</p>
          </div>
        </div>
        <div class="right">
          <Identicon :size="36" :theme="'polkadot'" value="HTrpbES27bqMvCioQGHpmJbBzwji6V5DeuXUfB1gsZ5Vkh1" />
          <div class="name-address">
            <p>Controller</p>
            <p>{{ info.controllerAddr }}</p>
          </div>
        </div>
      </div>
      <div class="chart-wrap">
        <div class="chart-pie" ref="chart"></div>
        <div class="chart-text">
          <div class="item">
            <div class="key">{{ $t('chart')[1] }}</div>
            <div class="value">{{ info.selfBondedKsm }}</div>
          </div>
          <div class="item">
            <div class="key">{{ $t('chart')[2] }}</div>
            <div class="value">{{ info.nominatorsBondedKsm }}</div>
          </div>
        </div>
        <div class="divide-line"></div>
        <div class="info">
          <div class="item">
            <div class="key">{{ $t('info')[0] }}</div>
            <div class="value">{{ info.commission }}</div>
          </div>
          <div class="item">
            <div class="key">{{ $t('info')[1] }}</div>
            <div class="value">{{ info.eraPoint }}</div>
          </div>
          <div class="item">
            <div class="key" style="text-align:right;">{{ $t('info')[2] }}</div>
            <div class="value">#{{ thousandth(info.height) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-wrap-white" v-if="!isMobile">
      <div class="content">
        <nominator :nominators="info.nominators || []" />
      </div>
    </div>
    <div class="item-wrap-grey" v-if="!isMobile">
      <div class="content">
        <slash :autoRefresh="false" :addr="$route.query.id" />
      </div>
    </div>

    <div class="table-h5-wrap" v-if="isMobile">
      <div class="tabs" ref="tabWrap" v-sticky="{ zIndex: 50, stickyTop: 55, disabled: false }">
        <div class="tab-wrap">
          <div
            v-for="(item, i) in $t('nav')"
            :key="i"
            @click="switchTab(+i)"
            :class="['tab', isActive(+i) && 'active']"
          >
            {{ $t('nav')[i] }}
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
