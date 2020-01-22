<i18n src="./locale.json"></i18n>
<template lang="html">
  <div class="h5-footer" v-if="isMobile">
    <p>
      {{ $t('GuanYuWoMen') }}：
      <a :href="link.group" rel="noopener noreferrer" target="_blank">
        HashKey Group
      </a>
      <a :href="link.hub" rel="noopener noreferrer" target="_blank">
        HashKey hub
      </a>
    </p>
    <p>
      {{ $t('LianXi') }}
    </p>
  </div>
  <!--  -->
  <div class="pc-footer" v-else-if="!isMobile">
    <div class="pc-footer-wrapper">
      <div class="left">
        <img src="../../assets/img/logo2.svg" alt="" />
        <span class="sub-title">|<span>Labs</span></span>
      </div>
      <div class="center">
        <div class="item">
          <div class="title">
            {{ $t('GuanYuWoMen') }}
          </div>
          <a :href="link.group" rel="noopener noreferrer" target="_blank">HashKey Group</a>
          <a :href="link.hub" rel="noopener noreferrer" target="_blank">HashKey Hub</a>
        </div>
      </div>
      <div class="right">
        <div class="contact">
          {{ $t('LianXi') }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./footer.scss" scoped></style>
<script src="./footer.js"></script>
