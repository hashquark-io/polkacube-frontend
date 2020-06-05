<template>
  <div id="app" class="app">
    <Navi />
    <router-view class="router-view" :key="curTime" />
    <Footer />
  </div>
</template>
<script>
import { debounce } from '@/methods/util'
import { insertCss } from '@/methods/device'
import Navi from '@/components/navi/navi.vue'
import Footer from '@/components/footer/footer.vue'
export default {
  computed: {
    curTime() {
      return this.$store.state.curTime
    }
  },
  components: {
    Navi,
    Footer
  },
  mounted() {
    window.addEventListener('resize', this.onResize, false)
  },
  methods: {
    onResize: debounce(function() {
      insertCss()
      this.$store.commit('setIsMobile', window.device.type === 'mobile')
    }, 300)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>
