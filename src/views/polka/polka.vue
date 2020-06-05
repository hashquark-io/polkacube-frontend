<template>
  <div class="polka wrapper">
    <div class="info-wrap">
      <img src="./img/bg-1.png" alt class="bg-1" />
      <p class="intro">{{ $t('polka.intro') }}</p>
      <div class="info">
        <div class="item">
          <p class="key">{{ $t('polka.info')[0] }}</p>
          <p class="value">{{ polkaInfo.totalIssuance }}</p>
        </div>
        <div class="item">
          <p class="key">{{ $t('polka.info')[1] }}</p>
          <p class="value" v-if="polkaInfo.height">{{ '#' + polkaInfo.height }}</p>
          <p class="value" v-else>--</p>
        </div>
        <div class="item">
          <p class="key">{{ $t('polka.info')[2] }}</p>
          <p class="value">{{ polkaInfo.actualValidator || '--' }} / {{ polkaInfo.maxValidator || '--' }}</p>
        </div>
        <div class="item">
          <p class="key">{{ $t('polka.info')[3] }}</p>
          <p class="value" v-if="units === 'KSM'">{{ Mathfloor(polkaInfo.inflation * 100, 2) }}%</p>
          <p class="value" v-else>N/A</p>
        </div>

        <div class="item">
          <p class="key">{{ $t('polka.info')[4] }}</p>
          <p class="value">{{ Mathfloor(polkaInfo.stakingRatio * 100, 2) }}%</p>
        </div>
        <div class="item">
          <p class="key">{{ $t('polka.info')[5] }}</p>
          <p class="value" v-if="units === 'KSM'">{{ polkaInfo.valDayRewards }}</p>
          <p class="value" v-else>0 DOT</p>
        </div>

        <div class="item">
          <p class="key">{{ $t('polka.info')[6] }}</p>
          <div data-name="Epoch">
            <p class="value progress">
              {{ thousandth(polkaInfo.sessionProgress) }} / {{ thousandth(polkaInfo.sessionLength) }}
            </p>
            <div class="progress-bar">
              <div class="bar" :style="{ width: eporchProgress }"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <p class="key">{{ $t('polka.info')[7] }}</p>
          <div data-name="Era">
            <p class="value progress">
              {{ thousandth(polkaInfo.eraProgress) }} / {{ thousandth(polkaInfo.eraLength) }}
            </p>
            <div class="progress-bar">
              <div class="bar" :style="{ width: eraProgress }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-wrap-white" v-if="!isMobile">
      <div class="content">
        <validator />
      </div>
    </div>

    <div class="item-wrap-grey" v-if="!isMobile">
      <div class="content">
        <income />
      </div>
    </div>

    <div class="item-wrap-white" v-if="!isMobile">
      <div class="content">
        <slash />
      </div>
    </div>

    <div class="table-h5-wrap" v-if="isMobile">
      <div class="tabs" ref="tabWrap" v-sticky="{ zIndex: 50, stickyTop: 55, disabled: false }">
        <div class="tab-wrap">
          <div
            v-for="(item, i) in $t('polka.nav')"
            :key="i"
            @click="switchTab(+i)"
            :class="['tab', isActive(+i) && 'active']"
          >
            {{ $t('polka.nav')[i] }}
          </div>
        </div>
      </div>
      <validator v-if="activeInd === 0" />
      <income v-if="activeInd === 1" />
      <slash v-if="activeInd === 2 || activeInd === 3" :tabInd="activeInd - 1" />
    </div>
    <!-- <div class="item-wrap-white">
      <p class="contact content dark">
        <img src="@/assets/img/contact.png" />
        {{ $t('polka.contact') }}
      </p>
    </div> -->
    <div class="item-wrap-white">
      <div class="web3">
        <a class="link" href="https://web3.foundation/" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/img/web3.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./polka.scss" scoped></style>
<script src="./polka.js"></script>
