<i18n src="./locale.json"></i18n>
<template>
  <div class="slash-comp-wrap">
    <img src="@/assets/img/dot.png" alt class="img-dot" v-if="!isMobile" />
    <div class="top">
      <div v-if="!isMobile" class="title">
        <div :class="{ active: activeInd === 1, item: true }" @click="changeType(1)">{{ $t('title1') }}</div>
        <div :class="{ active: activeInd === 2, item: true }" @click="changeType(2)">{{ $t('title2') }}</div>
      </div>
      <div class="search" v-if="!addr">
        <div class="search-btn-wrap">
          <input
            type="text"
            v-model="inpVal"
            @input="dealInp"
            :placeholder="$t('placeholder')"
            @keyup.enter="loading || search()"
          />
          <span class="search-btn" @click="loading || search()">{{ $t('searchBtn') }}</span>
        </div>
        <span class="refresh-btn" @click="refresh">
          <img src="@/assets/img/icon-refresh.png" alt />
          {{ $t('refreshBtn') }}
        </span>
      </div>
    </div>
    <div class="table-comp-wrap">
      <el-table
        v-loading.fullscreen.lock="loading && isMobile && !isMounted"
        v-loading="loading && !isMobile"
        :data="activeInd === 1 ? tableRecordsData : tableStatisticsData"
        :height="isMobile ? undefined : tableHeight"
        :empty-text="dataLoaded ? $t('emptyText') : ' '"
        header-cell-class-name="table-header-cell"
        cell-class-name="table-body-cell"
        ref="table"
      >
        <el-table-column prop="accountAddr" :label="(activeInd === 1 ? $t('recordsTitle') : $t('statisticsTitle'))[0]">
          <template slot-scope="scope">
            <div class="table-col-1">
              <Identicon :size="28" :theme="'polkadot'" :value="scope.row.accountAddr" />
              <div class="name-address">
                <div :class="{ grey: !scope.row.nickname }">{{ scope.row.nickname || $t('recordsTitle')[0] }}</div>
                <div class="grey">{{ isMobile ? strSlice(scope.row.accountAddr) : scope.row.accountAddr }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :prop="activeInd === 1 ? 'eventID' : 'num'"
          :label="(activeInd === 1 ? $t('recordsTitle') : $t('statisticsTitle'))[1]"
          :width="isMobile ? 100 : 180"
          align="right"
        ></el-table-column>
        <el-table-column
          :prop="activeInd === 1 ? 'amount' : 'amount'"
          :label="(activeInd === 1 ? $t('recordsTitle') : $t('statisticsTitle'))[2]"
          align="right"
          :width="isMobile ? 120 : 218"
        ></el-table-column>
        <p
          slot="append"
          v-if="!allLoaded && (activeInd === 1 ? tableRecordsData : tableStatisticsData).length !== 0"
          @click="loading || load()"
          class="loading-btn"
        >
          <span v-if="!loading" class="btn">{{ $t('loadBtn') }}</span>
          <img v-if="!loading" src="@/assets/img/icon-arrow-down.png" alt />
          <i v-else class="el-icon-loading"></i>
        </p>
      </el-table>
    </div>
  </div>
</template>
<script>
import Identicon from '@polkadot/vue-identicon'
import { tableRefresh, tableResize } from '@/methods/tableMixin'
import { debounce } from '@/methods/util'
export default {
  mixins: [tableRefresh, tableResize],
  props: {
    autoRefresh: {
      type: Boolean,
      default: true
    },
    addr: {
      type: String,
      default: ''
    },
    tabInd: {
      type: Number,
      default: 1
    }
  },
  components: {
    Identicon
  },
  data() {
    return {
      name: 'slash',
      tableRecordsData: [],
      tableStatisticsData: [],

      inpVal: '',
      isSearch: false,

      scrollTop: 0,

      dataLoaded: false,

      activeInd: 1,
      isMounted: false
    }
  },
  mounted() {
    this.activeInd = this.tabInd
    this.queryData(this.page)
  },
  methods: {
    queryData(page, accountAddr = this.addr || this.inpVal, size = this.pageSize) {
      this.loading = true
      const { slashRecords, slashStatistics } = window._config.url
      const url = `${this.activeInd === 1 ? slashRecords : slashStatistics}?page=${page}&size=${size}&accountAddr=${
        this.isSearch || this.addr ? accountAddr : ''
      }`
      return this.axios.get(url).then(
        res => {
          const data = res.map(t => {
            t.eventID = `#${this.thousandth(t.height)} - ${t.index}`
            return t
          })
          this[`table${this.activeInd === 1 ? 'Records' : 'Statistics'}Data`] =
            page === 1 ? data : [...this[`table${this.activeInd === 1 ? 'Records' : 'Statistics'}Data`], ...data]
          if (res.length < this.pageSize) {
            this.allLoaded = true
          }
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
    // loadmore table data
    load() {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.queryData(++this.page).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop
      })
    },
    search: debounce(
      function() {
        if (!this.inpVal) return
        this.endTimer()
        this.isSearch = true
        this.queryData((this.page = 1))
      },
      500,
      true
    ),
    // refresh table data
    refresh: debounce(
      function() {
        this.initTable()
        if (this.autoRefresh) {
          this.refreshTimer()
          this.initTableListen()
        }
      },
      500,
      true
    ),
    initTable() {
      const table = document.querySelector(`.${this.name}-comp-wrap .el-table__body-wrapper`)
      table.scrollTop = 0
      this.isSearch = false
      this.inpVal = ''
      this.page = 1
      this.allLoaded = false
      this.isMounted = false
      this.queryData(this.page)
    },
    dealInp() {
      this.inpVal = this.inpVal.replace(/(^\s*)/g, '')
    },
    changeType(ind) {
      if (this.activeInd === ind) return
      this.activeInd = ind
      this.initTable()
      if (this.autoRefresh) {
        this.refreshTimer()
        this.initTableListen()
      }
    }
  },
  watch: {
    tabInd: {
      handler: function(val) {
        this.changeType(val)
      }
    }
  }
}
</script>
<style src="./slash.scss" lang="scss"></style>
