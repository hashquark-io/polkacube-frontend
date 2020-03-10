<i18n src="./locale.json"></i18n>
<template>
  <el-popover trigger="hover" popper-class="judgement-popover">
    <img slot="reference" :src="curImg" :style="imgStyle" class="icon-judgement" />
    <div class="judgement">
      <p class="title" v-if="identityInfo.judgements">
        {{ identityInfo.judgementsNum }}
        {{ locale === 'en-US' && identityInfo.judgementsNum > 1 ? $t('judgements') : $t('judgement')
        }}{{ identityInfo.judgementsDesc }}
      </p>
      <p class="title" v-else>{{ $t('noJudgement') }}</p>
      <!-- <div class="detail" v-if="identityInfo.list && identityInfo.list.length > 0">
        <p v-for="(item, ind) in identityInfo.list" :key="ind">
          <span>{{ $t(item[0]) }} </span><span>{{ item[1] }}</span>
        </p>
      </div> -->
    </div>
  </el-popover>
</template>
<script>
const img1 = require('@/assets/img/icon-judge-1.png')
const img2 = require('@/assets/img/icon-judge-2.png')
const img3 = require('@/assets/img/icon-judge-3.png')
const img4 = require('@/assets/img/icon-judge-4.png')
const img5 = require('@/assets/img/icon-judge-5.png')
const img6 = require('@/assets/img/icon-judge-6.png')

export default {
  props: {
    identity: {
      type: [Object, String],
      default: function() {
        return {}
      }
    },

    imgStyle: {
      type: Object,
      default: function() {
        return {
          width: '13px',
          margin: 0
        }
      }
    }
  },

  data() {
    return {
      imgs: [img1, img2, img3, img4, img5, img6],
      identityInfo: {}
    }
  },

  computed: {
    curImg() {
      return this.identityInfo.judgementsNum ? this.imgs[this.identityInfo.judgementsNum] : img1
    }
  },
  watch: {
    identity: {
      handler: function(val) {
        {
          let identityInfo = null
          if (val && val.judgements && val.judgements.length > 0) {
            try {
              const judgementsText = {
                0: 'Unknown',
                1: 'Reasonable',
                2: 'Known Good',
                3: 'Out of Date',
                4: 'Low Quality',
                5: 'Erroneous'
              }
              identityInfo = {
                judgements: true,
                judgementsNum: val.judgements.length,
                judgementsDesc: this.$t(judgementsText[val.judgements.length])
              }
            } catch {
              identityInfo = {
                judgements: false
              }
            }
          } else {
            identityInfo = {
              judgements: false
            }
          }
          identityInfo.list = val
            ? Object.entries(val)
                .filter(([k, v]) => {
                  return !!v && k !== 'judgements' && k !== 'other'
                })
                .map(([k, v]) => [k, v])
            : []
          this.identityInfo = identityInfo
        }
      },
      immediate: true
    }
  }
}
</script>
<style>
.icon-judgement {
  cursor: pointer;
  transform: translateY(2px);
}
</style>
