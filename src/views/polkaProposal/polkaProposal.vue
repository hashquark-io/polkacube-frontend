<i18n src="./locale.json"></i18n>
<template>
  <div class="polka-proposal wrapper">
    <div class="info-wrap">
      <img src="./img/bg-1.png" alt class="bg-1" />
      <p class="intro">{{ $t('intro') }}</p>
      <div class="info">
        <div class="item">
          <p class="key">{{ $t('info')[0] }}</p>
          <div data-name="Era">
            <p class="value progress">
              <span v-if="polkaInfo.progress">
                {{ thousandth(polkaInfo.progress, 0) }} / {{ polkaInfo.launchPeriodFormat }}
              </span>
              <span v-else> -- / --</span>
            </p>
            <div class="progress-bar">
              <div class="bar" :style="{ width: curProgress }"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <p class="key">{{ $t('info')[1] }}</p>
          <p class="value" v-if="polkaInfo.proposalsFormat">{{ polkaInfo.proposalsFormat }}</p>
          <p class="value" v-else>--</p>
        </div>
        <div class="item">
          <p class="key">{{ $t('info')[2] }}</p>
          <p class="value" v-if="polkaInfo.referendumCountFormat">{{ polkaInfo.referendumCountFormat }}</p>
          <p class="value" v-else>--</p>
        </div>
      </div>
    </div>
    <div class="item-wrap-white" v-if="!isMobile">
      <div class="content">
        <referendums />
        <proposal />
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
          </div>
        </div>
      </div>
      <referendums v-if="activeInd === 0" />
      <proposal v-if="activeInd === 1" />
    </div>
  </div>
</template>
<style lang="scss" src="./polkaProposal.scss" scoped></style>
<script src="./polkaProposal.js"></script>
