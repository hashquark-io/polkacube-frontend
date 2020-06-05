import Identicon from '@polkadot/vue-identicon'
import transfer from '../components/transfer'
import redeem from '../components/redeem'
import receive from '../components/receive'

const operation = {
  notes: '',
  operateType: '',
  editNotes: false
}
export default {
  components: {
    Identicon,
    transfer,
    redeem,
    receive
  },
  data() {
    return {
      loading: true,
      operationAll: {},
      operateAccount: {},
      dialogVisible: false
    }
  },
  computed: {
    accounts() {
      return this.$store.state.accounts
    },
    list() {
      return this.accounts.map(t => {
        return { ...t, ...(this.operationAll[t.address] || operation) }
      })
    },
    totalAssets() {
      return this.accounts.reduce((a, t) => {
        return a + t.balancesAll?.freeBalance
      }, 0)
    }
  },
  beforeMount() {
    this.loadOperationAll()
  },
  methods: {
    loadOperationAll() {
      this.accounts.forEach(t => {
        const { notes } = this.$ls.get(t.address) || {}
        this.operationAll[t.address] = {
          ...operation,
          notes
        }
      })
      this.loading = false
    },

    edit(address, ind, key, isfocus) {
      if (isfocus) {
        this.updateOperation(address, 'editNotes', true)
        this.$nextTick(() => {
          this.$refs[key][ind]?.focus()
        })
      } else {
        const { notes } = this.operationAll[address]
        this.$ls.set(address, { notes })
        this.updateOperation(address, 'editNotes', false)
      }
    },
    editNotes(e, { address }) {
      this.updateOperation(address, 'notes', e.target.value.trim())
    },
    toggleOperateType({ address }, operateType) {
      this.list.forEach(t => {
        if (t.address === address) {
          this.updateOperation(address, 'operateType', operateType)
          this.operateAccount = { ...t, operateType }
        } else {
          this.updateOperation(address, 'operateType', '')
        }
      })
      this.dialogVisible = true
    },
    dialogClose(address) {
      this.operateAccount = {}
      this.updateOperation(address, 'operateType', '')
    },
    updateOperation(address, key, val) {
      this.operationAll[address][key] = val
      this.operationAll = { ...this.operationAll } // 更新引用 触发computed更新
    }
  }
}
