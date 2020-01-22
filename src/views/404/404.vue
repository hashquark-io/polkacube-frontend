<i18n src="./locale.json"></i18n>
<template lang="html">
  <div class="notfound">
    <div class="wrapper">
      <img src="./404.png" alt="" />
    </div>
    <div class="words">
      <div>{{ $t('Ohh') }}</div>
      <router-link to="/" class="btn">{{ $t('FanHuiShouYe') }}</router-link>
    </div>
  </div>
</template>
<style lang="scss" src="./404.scss" scoped></style>
