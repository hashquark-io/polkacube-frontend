<template lang="html">
  <div class="h5-footer" v-if="isMobile">
    <p>
      {{ $t('footerComp.GuanYuWoMen') }}：
      <a :href="link.hub" rel="noopener noreferrer" target="_blank">
        HashKey hub
      </a>
      <a :href="link.pro" rel="noopener noreferrer" target="_blank">
        HashKey Pro
      </a>
    </p>
    <p>{{ $t('footerComp.LianXi') }}contact@hashquark.io</p>
  </div>
  <!--  -->
  <div class="pc-footer" v-else-if="!isMobile">
    <div class="pc-footer-wrapper">
      <div class="left">
        <div class="logo">
          <a :href="`https://www.hashquark${envSuffix}.io/#/`"><img src="@/assets/img/logo2.png" alt=""/></a>
          <div class="split-line"></div>
          <router-link :to="'/' + network" class="home">PolkaCube</router-link>
        </div>
        <div class="copyright">Copyright © {{ new Date().getFullYear() }} HashQuark All rights reserved</div>
      </div>
      <div class="center">
        <div class="item">
          <div class="title">
            {{ $t('footerComp.GuanYuWoMen') }}
          </div>
          <a :href="link.hub" rel="noopener noreferrer" target="_blank">HashKey Hub</a>
          <a :href="link.pro" rel="noopener noreferrer" target="_blank">HashKey Pro</a>
        </div>
      </div>
      <div class="right">
        <div class="contact">
          <p class="title">{{ $t('footerComp.LianXi') }}</p>
          <p>contact@hashquark.io</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./footer.scss" scoped></style>
<script src="./footer.js"></script>
