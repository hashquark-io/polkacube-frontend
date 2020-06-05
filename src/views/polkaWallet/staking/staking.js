import Identicon from '@polkadot/vue-identicon'
import newStake from '../components/newStake.vue'
import nominate from '../components/nominate.vue'
import bondMore from '../components/bondMore.vue'
import setController from '../components/setController.vue'
import setRewardDestination from '../components/setRewardDestination.vue'
import setSessionkey from '../components/setSessionkey.vue'
import setValidator from '../components/setValidator.vue'
import unbond from '../components/unbond.vue'
import receiveReward from '../components/receiveReward.vue'
import stopStake from '../components/stopStake.vue'
import redeem from '../components/redeem.vue'
import { arraySort } from '@/methods/util'
import { u8aConcat, u8aToHex } from '@polkadot/util'

// 'default', 'sessionkey' , 'validating' , 'nominating'  数字代表排序优先级
const stashOrder = {
  default: 1,
  sessionkey: 2,
  validating: 4,
  nominating: 3
}

export default {
  components: {
    Identicon,
    newStake,
    nominate,
    bondMore,
    setController,
    setRewardDestination,
    setSessionkey,
    setValidator,
    stopStake,
    unbond,
    receiveReward,
    redeem
  },
  data() {
    return {
      stakeList: [],
      operateStake: null,
      isMounted: false,
      dialogVisible: false,
      dialogType: '',
      timer: null,
      queryRewards: []
    }
  },
  computed: {
    accounts() {
      return this.$store.state.accounts
    },
    totalStake() {
      return this.stakeList.reduce((a, t) => {
        return a + t.bondedBalance
      }, 0)
    }
  },
  mounted() {
    this.queryStakeList()
    this.queryRewards = Array(this.accounts.length).fill(false)
  },
  methods: {
    queryStakeList() {
      this.$store.dispatch('queryStakeList')
    },
    queryReward(address) {
      return this.axios.get(`${window._config.url.stakeRewards}/${address}`, {
        timeout: 0
      })
    },
    dealStakeStatus(stakeList) {
      stakeList.forEach(t => {
        this.updateType(t)
        this.getSessionkey(t)
        this.checkAccount(t)
        this.getRewards(t)
        this.setOperateStatus(t)
      })
      arraySort(stakeList, { order: 'desc', bondedBalance: 'desc' }) // 按照状态排序

      return stakeList
    },
    updateType(stake) {
      // 'default', 'sessionkey' , 'validating' , 'nominating'
      const { nextSessionIds } = stake.stakingAccount
      let type = 'defalut'
      if (stake.stashNominating) {
        type = 'nominating'
      } else if (stake.stashValidating) {
        type = 'validating'
      } else if (nextSessionIds.length) {
        type = 'sessionkey'
      } else {
        type = 'default'
      }
      stake.stashType = type
      stake.order = stashOrder[type]
    },
    getSessionkey(stake) {
      const { sessionKeys, nextSessionKeys } = stake
      const currConcat = u8aConcat(...sessionKeys.map(t => Object.values(t)))
      const nextConcat = u8aConcat(...nextSessionKeys.map(t => Object.values(t)))
      const hexSessionIdNext = u8aToHex(nextConcat, 48)
      const hexSessionIdQueue = u8aToHex(currConcat.length ? currConcat : nextConcat, 48)
      stake.withHexSessionId = hexSessionIdNext !== '0x' && [hexSessionIdQueue, hexSessionIdNext]
    },
    getRewards(stake) {
      if (![3, 4].includes(stake.order)) return
      this.queryReward(stake.stashId).then(res => {
        stake.rewardInfo = { ...res, totalErasLength: res.rewards[0].length }
      })
    },
    // 用户主动触发
    // getRewards(stake, stakeInd) {
    //   if (this.queryRewards[stakeInd]) return
    //   this.queryRewards[stakeInd] = true
    //   const prevStake = this.stakeList.find(t => t.stashId === stake.stashId)
    //   stake.rewardInfo = prevStake?.rewardInfo || null
    //   this.queryReward(stake.stashId).then(res => {
    //     this.queryRewards[stakeInd] = false
    //     const stakeList = this.stakeList.map(t => {
    //       if (t.stashId === stake.stashId) {
    //         const rewards = res?.rewards[0]
    //         const stakerPayoutsAfter = res?.stakerPayoutsAfter
    //         const available = rewards.filter(({ era }) => era < stakerPayoutsAfter)
    //         t.rewardInfo = { ...res, totalErasLength: res.rewards[0].length, canReceiveReward: available.length > 0 }
    //       }
    //       return t
    //     })
    //     this.$store.commit('setStakeList', stakeList)
    //   })
    // },
    checkAccount(stake) {
      const { controllerId, accountId } = stake.stakingAccount
      stake.inAccounts = !!this.accounts.find(t => t.address === controllerId)
      stake.stashIn = !!this.accounts.find(t => t.address === accountId)
    },
    setOperateStatus(stake) {
      //  三个下拉状态管理
      const prevStake = this.stakeList.find(t => t.stashId === stake.stashId)
      stake.dropStatus = prevStake?.dropStatus || [false, false, false, false, false]
      stake.settingPopover = prevStake?.settingPopover || false
    },
    changeOperateStake(stake) {
      this.operateStake = stake
    },
    toggleDialog(dialogType) {
      this.dialogType = dialogType
      this.dialogVisible = true
      this.operateStake && (this.operateStake.settingPopover = false)
    },
    toggleDropStatus(stakeInd, dropInd) {
      // if (dropInd === 0 && !this.stakeList[stakeInd].dropStatus[dropInd]) {
      //   this.getRewards(this.operateStake, stakeInd)
      // }
      this.stakeList[stakeInd].dropStatus[dropInd] = !this.stakeList[stakeInd].dropStatus[dropInd]
      this.$forceUpdate()
    },
    getName(address) {
      return this.accounts.find(t => t.address === address)?.name || address
    },
    updateStakeInfo(stake) {
      this.$store.dispatch('queryStake', stake.stashId).then(res => {
        const stakeList = this.stakeList.map(t => {
          if (t.stashId === stake.stashId) {
            return res.find(k => k.stashId === stake.stashId)
          }
          return t
        })
        this.$store.commit('setStakeList', stakeList)
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  watch: {
    '$store.state.stakeList'(stakeList) {
      this.stakeList = Array.isArray(stakeList) ? this.dealStakeStatus([...stakeList]) : []
      this.isMounted = true
    }
  }
}
