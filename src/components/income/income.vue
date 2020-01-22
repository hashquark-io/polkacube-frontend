<i18n src="./locale.json"></i18n>
<template>
  <div class="income-comp-wrap">
    <img src="@/assets/img/dot.png" alt class="img-dot" v-if="!isMobile" />
    <div class="top">
      <div class="title" v-if="!isMobile">{{ $t('title') }}</div>
      <div class="refresh-btn" @click="refresh">
        <img src="@/assets/img/icon-refresh.png" alt />
        {{ $t('btn') }}
      </div>
    </div>
    <div class="table-comp-wrap">
      <el-table
        v-loading.fullscreen.lock="loading && isMobile && !isMounted"
        v-loading="loading && !isMobile"
        :data="tableData"
        :height="isMobile ? undefined : tableHeight"
        :empty-text="dataLoaded ? $t('emptyText') : ' '"
        header-cell-class-name="table-header-cell"
        cell-class-name="table-body-cell"
        ref="table"
      >
        <el-table-column prop="eventID" :label="$t('tableTitle')[0]" :width="isMobile ? '120' : ''"></el-table-column>
        <el-table-column
          prop="validatorsAmount"
          :label="$t('tableTitle')[1]"
          :width="isMobile ? '' : '240'"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="treasuryAmount"
          :label="$t('tableTitle')[2]"
          :width="isMobile ? '' : '218'"
          align="right"
        ></el-table-column>
        <p slot="append" v-if="!allLoaded && tableData.length !== 0" @click="loading || load()" class="loading-btn">
          <span v-if="!loading" class="btn">{{ $t('loadBtn') }}</span>
          <img v-if="!loading" src="@/assets/img/icon-arrow-down.png" alt />
          <i v-else class="el-icon-loading"></i>
        </p>
      </el-table>
    </div>
  </div>
</template>
<script>
import { debounce } from '@/methods/util'
import { tableRefresh, tableResize } from '@/methods/tableMixin'

export default {
  mixins: [tableRefresh, tableResize],
  data() {
    return {
      name: 'income',
      tableData: [],

      scrollTop: 0,

      dataLoaded: false,
      isMounted: false
    }
  },
  mounted() {
    this.queryData()
  },
  methods: {
    queryData(page = 1, size = this.pageSize) {
      this.loading = true
      return this.axios.get(`${window._config.url.reward}?page=${page}&size=${size}`).then(
        res => {
          const data = res.map(t => {
            t.eventID = `#${this.thousandth(t.height)} - ${t.index}`
            return t
          })
          this.tableData = page === 1 ? data : [...this.tableData, ...data]
          if (res.length < this.pageSize) {
            this.allLoaded = true
          }
          this.loading = false
          this.dataLoaded = true
          this.isMounted = true
          setTimeout(() => {
            this.$refs.table.doLayout() // fix firefox and edge
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
    // refresh table data
    refresh: debounce(
      function() {
        this.initTable()
        this.refreshTimer()
        setTimeout(() => {
          this.initTableListen()
        }, 1000)
      },
      500,
      true
    ),
    initTable() {
      const table = document.querySelector(`.${this.name}-comp-wrap .el-table__body-wrapper`)
      table.scrollTop = 0
      this.page = 1
      this.allLoaded = false
      this.queryData(this.page)
    }
  }
}
</script>
<style src="./income.scss" lang="scss"></style>
