<template>
  <div class="polka-strategy-page">
    <div class="polka-strategy-bg" v-if="identity === undefined && !isMobile">
      <img class="bg1" src="./img/polka-strategy-bg.png" alt />
      <img class="bg2" src="./img/polka-strategy-bg2.png" alt />
    </div>
    <div class="polka-strategy-bg" v-if="identity === undefined && isMobile">
      <img class="bg1" src="./img/polka-strategy-h5-bg.png" alt />
      <img class="bg2" src="./img/polka-strategy-h5-bg2.png" alt />
    </div>
    <div class="polka-strategy" v-if="identity === undefined">
      <div class="title-wrap">
        <p class="title">{{ $t('polkaStrategy.title') }}</p>
        <p class="desc">{{ $t('polkaStrategy.desc') }}</p>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="btn" @click="$router.push(`/${network}/strategy/nominator`)">
            <img src="./img/nomination.png" alt />
            <span>{{ $t('polkaStrategy.nomination')[0] }}</span>
          </div>
          <p>{{ $t('polkaStrategy.nomination')[1] }}</p>
        </div>
        <div class="card-item">
          <div class="btn" @click="$router.push(`/${network}/strategy/validator`)">
            <img src="./img/validator.png" alt />
            <span>{{ $t('polkaStrategy.validator')[0] }}</span>
          </div>
          <p>{{ $t('polkaStrategy.validator')[1] }}</p>
        </div>
      </div>
    </div>
    <validator-strategy v-if="identity === 'validator'" />
    <nominator-strategy v-if="identity === 'nominator'" />
  </div>
</template>

<script>
import validatorStrategy from '@/components/validatorStrategy/validatorStrategy'
import nominatorStrategy from '@/components/nominatorStrategy/nominatorStrategy'
export default {
  data() {
    return {
      identity: this.$route.params.identity
    }
  },
  components: {
    validatorStrategy,
    nominatorStrategy
  },
  beforeRouteUpdate(to, from, next) {
    this.identity = to.params.identity
    next()
  }
}
</script>
<style src="./polkaStrategy.scss" lang="scss"></style>
