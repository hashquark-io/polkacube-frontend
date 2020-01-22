<i18n src="./locale.json"></i18n>
<template>
  <div class="nominator-comp-wrap">
    <img src="@/assets/img/dot.png" alt class="img-dot" v-if="!isMobile" />
    <div class="top" v-if="!isMobile">
      <div class="title">
        {{ $t('title') }}
        <span v-if="totalNum">({{ totalNum }})</span>
      </div>
    </div>
    <div class="table-comp-wrap">
      <el-table
        :data="tableData"
        :height="isMobile ? undefined : tableHeight"
        :empty-text="dataLoaded ? $t('emptyText') : ' '"
        :row-style="rowStyle"
        header-cell-class-name="table-header-cell"
        cell-class-name="table-body-cell"
        ref="table"
      >
        <el-table-column prop="validatorAddr" :label="$t('tableTitle')[0]">
          <template slot-scope="scope">
            <div class="table-col-1">
              <Identicon :size="28" :theme="'polkadot'" :value="scope.row.who" />
              <div class="address">{{ isMobile ? strSlice(scope.row.who) : scope.row.who }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="valueKsm"
          :label="$t('tableTitle')[1]"
          align="right"
          :width="isMobile ? 110 : 160"
        ></el-table-column>
        <el-table-column prop="percent" :label="$t('tableTitle')[2]" align="right" :width="isMobile ? 70 : 160">
          <template slot-scope="scope">
            <span>{{ scope.row.percent + '%' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Identicon from '@polkadot/vue-identicon'
import { tableResize } from '@/methods/tableMixin'

export default {
  mixins: [tableResize],

  props: ['nominators'],
  components: {
    Identicon
  },
  data() {
    return {
      name: 'nominator',
      tableData: [],

      dataLoaded: false,
      totalNum: ''
    }
  },

  mounted() {
    this.tableData = this.nominators
  },
  methods: {
    rowStyle({ row }) {
      const percent = row.percent
      return {
        background: 'linear-gradient(180deg,#FFFFFF 0%, #EDF5FF 100%) no-repeat left top',
        backgroundSize: `${percent}% 62px`
      }
    }
  },
  watch: {
    nominators(val) {
      this.tableData = val
      setTimeout(() => {
        this.$refs.table.doLayout() // fix firefox and edge
      }, 0)
      this.totalNum = val.length
      this.dataLoaded = true
    }
  }
}
</script>
<style src="./nominator.scss" lang="scss"></style>
