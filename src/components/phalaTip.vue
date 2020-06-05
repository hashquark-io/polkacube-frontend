<template>
  <div class="phala">
    <img class="phala-img" src="@/assets/img/icon-judge-7.png" />
    <div>
      <span v-html="$t('validatorComp.description')"></span>
      &nbsp;
      <a href="https://forum.phala.network/" rel="noopener noreferrer" target="_blank">{{
        $t('validatorComp.detail')
      }}</a>
      &nbsp;
      {{ $t('validatorComp.descriptionEnd') }}
    </div>
  </div>
</template>
<style lang="scss">
html.desktop .phala {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-left: 34px;
  height: 54px;
  background: linear-gradient(270deg, rgba(223, 231, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
  box-shadow: 0px 8px 22px 0px rgba(227, 237, 255, 1);
  border-radius: 10px;
  font-size: 12px;
  line-height: 18px;

  .phala-img {
    margin-right: 8px;
    height: 28px;
    vertical-align: middle;
  }
  a {
    cursor: pointer;
    color: $color-2;
    text-decoration: $color-2;
  }
}

html.mobile .phala {
  display: flex;
  margin: 12px 15px;
  padding: 15px 30px 15px 19px;
  font-size: 12px;

  border-radius: 10px;
  box-shadow: 0px 8px 22px 0px rgba(227, 237, 255, 1);
  background: linear-gradient(270deg, rgba(223, 231, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
  .phala-img {
    margin-right: 10px;
    height: 28px;
    vertical-align: middle;
  }
  a {
    cursor: pointer;
    color: $color-2;
    text-decoration: $color-2;
  }
}
</style>
