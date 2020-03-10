<i18n src="./locale.json"></i18n>
<template>
  <div class="validator-comp-wrap">
    <img src="@/assets/img/dot.png" alt class="img-dot" v-if="!isMobile" />
    <div class="top">
      <div class="title" v-if="!isMobile">{{ $t('title') }}</div>
      <announcement :marqueeList="marqueeList" />
    </div>
    <div class="table-comp-wrap">
      <el-table
        v-loading.fullscreen.lock="loading && isMobile && !isMounted"
        v-loading="!isMounted && !isMobile"
        :data="tableData"
        :height="isMobile ? undefined : tableHeight"
        :empty-text="dataLoaded ? $t('emptyText') : ' '"
        header-cell-class-name="table-header-cell"
        cell-class-name="table-body-cell"
        :row-class-name="tableRowClass"
        @row-click="toDetail"
        ref="table"
      >
        <el-table-column prop="validatorAddr" :label="$t('tableTitle')[0]" :width="isMobile ? '' : 520">
          <template slot-scope="scope">
            <div class="table-col-1">
              <Identicon :size="28" :theme="'polkadot'" :value="scope.row.validatorAddr" />
              <img src="@/assets/img/online.png" alt class="status-img" v-if="+scope.row.online" />
              <img src="@/assets/img/offline.png" alt class="status-img" v-else />
              <div class="name-address">
                <div :class="{ grey: !scope.row.validatorName }">
                  <judgement-popover
                    :identity="scope.row.validatorName"
                    v-if="Object.keys(scope.row.validatorName).length > 0"
                  />
                  {{ (scope.row.validatorName && scope.row.validatorName.display) || $t('validatorName') }}
                </div>
                <div>{{ isMobile ? strSlice(scope.row.validatorAddr) : scope.row.validatorAddr }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="totalBondedKsm" :label="$t('tableTitle')[1]" :width="isMobile ? 120 : 180" align="right">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              :trigger="isMobile ? 'click' : 'hover'"
              :content="popverText(scope.row)"
              popper-class="totalBonded-popover"
            >
              <span slot="reference" class="pointer">{{ scope.row.totalBondedKsm }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="commission"
          :label="$t('tableTitle')[2]"
          align="right"
          v-if="!isMobile"
        ></el-table-column>
        <el-table-column prop="eraPoint" :label="$t('tableTitle')[3]" align="right" v-if="!isMobile"></el-table-column>
        <el-table-column prop="height" :label="$t('tableTitle')[4]" align="right" v-if="!isMobile"></el-table-column>
        <el-table-column
          prop="star"
          :label="$t('tableTitle')[5]"
          align="center"
          v-if="!isMobile || true"
          :width="isMobile ? 60 : 80"
        >
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click.stop="star(scope.row, scope.$index)">
              <img src="@/assets/img/icon-star-on.png" class="star" alt v-if="scope.row.isStar" />
              <img src="@/assets/img/icon-star-off.png" class="star" alt v-else />
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Identicon from '@polkadot/vue-identicon'
import announcement from '@/components/announcement/announcement.vue'
import judgementPopover from '@/components/judgementPopover/judgementPopover.vue'
import { tableResize } from '@/methods/tableMixin'
export default {
  mixins: [tableResize],
  components: {
    announcement,
    Identicon,
    judgementPopover
  },
  data() {
    return {
      name: 'validator',
      loading: true,

      timer: null,
      waitTime: 10000,

      favoritelist: [],
      unfavoritelist: [],
      marqueeList: [{}], // 让第一条数据也有滚动效果

      dataLoaded: false,
      isMounted: false
    }
  },
  computed: {
    tableData() {
      function arraySort(a, b) {
        return b.totalBonded - a.totalBonded
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return [...this.favoritelist.sort(arraySort), ...this.unfavoritelist.sort(arraySort)]
    }
  },
  mounted() {
    this.queryData()
    this.dealSocket()
    this.startTimer()
  },
  methods: {
    dealSocket() {
      let id = Math.random()
      const self = this
      window.socket.on('headerChange', function(data) {
        self.updateSocketData(data)
        window.socket.emit('server', id)
      })
    },
    updateSocketData({ height, validatorAddr }) {
      const rowData = this.tableData.find(row => row.validatorAddr === validatorAddr)
      if (rowData) {
        this.marqueeList.push(rowData)
        rowData.height = `#${this.thousandth(height)}`
      }
    },
    toDetail({ validatorAddr }) {
      const ind = this.tableData.findIndex(row => row.validatorAddr === validatorAddr)
      this.$router.push(`/polka/detail?id=${validatorAddr}&ind=${ind}`)
    },
    queryData() {
      this.loading = true
      this.axios.get(window._config.url.validator).then(
        res => {
          const favorites = this.$ls.get('favorites') || {}
          // console.log(favoritelist);
          const favoritelist = []
          const unfavoritelist = res
            .map(t => {
              t.height = `#${this.thousandth(t.height)}`
              t.isStar = favorites[t.validatorAddr] !== undefined
              if (t.isStar) {
                favoritelist.push(t)
              }
              return t.isStar ? null : t
            })
            .filter(t => t !== null)
          this.unfavoritelist = unfavoritelist
          this.favoritelist = favoritelist
          this.loading = false
          this.dataLoaded = true
          this.isMounted = true
          setTimeout(() => {
            this.$refs.table && this.$refs.table.doLayout() // fix firefox and edge
          }, 0)
        },
        () => {
          this.loading = false
          this.dataLoaded = true
          this.isMounted = true
        }
      )
    },
    popverText({ selfBondedKsm, nominatorsBondedKsm }) {
      return `${selfBondedKsm}(+${nominatorsBondedKsm})`
    },
    tableRowClass({ row }) {
      return +row.online ? '' : 'table-row-class-grey'
    },
    startTimer() {
      this.endTimer()
      this.timer = setInterval(() => {
        this.queryData()
      }, this.waitTime)
    },
    endTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    star({ validatorAddr, isStar }, $index) {
      const favorites = this.$ls.get('favorites') || {}
      const expires = 30 * 24 * 60 * 60 * 1000
      if (!isStar) {
        favorites[validatorAddr] = true
        this.$ls.set('favorites', favorites, expires)
        const rowData = this.tableData[$index]
        this.favoritelist.push({ ...rowData, isStar: true })
        this.unfavoritelist = this.unfavoritelist.filter(t => t.validatorAddr !== rowData.validatorAddr)
      } else {
        delete favorites[validatorAddr]
        this.$ls.set('favorites', favorites, expires)
        const rowData = this.tableData[$index]
        this.unfavoritelist.push({ ...rowData, isStar: false })
        this.favoritelist = this.favoritelist.filter(t => t.validatorAddr !== rowData.validatorAddr)
      }
    }
  },
  beforeDestroy() {
    this.endTimer()
  }
}
</script>
<style src="./validator.scss" lang="scss"></style>
