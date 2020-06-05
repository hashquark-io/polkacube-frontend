export default {
  polkaTitle: 'PolkaCube - 更好的波卡生態 Staking 體驗 | HashQuark',

  // views
  notFound: {
    tips: 'Ohh...頁面離家出走了',
    toHome: '返回首頁'
  },
  polka: {
    intro: '歡迎來到 PolkaCube！',
    info: ['總發行量', '最終確認區塊', '驗證人', '通脹率', '抵押率', '節點預計每日收益', '時代', '紀元'],
    nav: ['驗證人', '全網收益記錄', 'Slash記錄', 'Slash 統計'],
    contact: '如有問題請聯繫我們：contact@hashquark.io'
  },
  polkaDetail: {
    title: '驗證人',
    chart: ['抵押總額', '自抵押', '提名人抵押'],
    chartLegend: {
      自抵押: 'selfBondedKsm',
      提名人抵押: 'nominatorsBondedKsm'
    },
    info: ['佣金', '紀元分', '最近出塊'],
    nav: ['提名人', 'Slash記錄', 'Slash 統計', '紀元分', '最近預計收益 ＆ Slash'],
    navPc: ['驗證人', '提名人', 'Slash 記錄', '紀元分', '最近預計收益 ＆ Slash']
  },
  polkaProposal: {
    intro: '提案和公投',
    info: ['啟動期', '當前提案數量', '公投數量'],
    nav: ['公投', '提案']
  },
  polkaStrategy: {
    title: 'Staking 策略',
    desc:
      'PolkaCube 針對不同的提名人和驗證人，及其自定義的資產額度，根據NPoS 算法、當前網絡狀態及優化的收益模型設計，給出最佳的抵押和節點搭建策略，併計算出預計的收益數據。',
    nomination: ['我是提名人', '將資產抵押給驗證節點，獲取收益。'],
    validator: ['我是驗證人', '搭建驗證節點，負責出塊，接受提名人的抵押，同時獲取收益。']
  },
  polkaWallet: {
    connecting: '連接中...',
    reconnect: '正在連接網絡... ',
    tips: '使用 Chrome 瀏覽器，並安裝以下插件來連接錢包：',
    tabs: ['我的賬戶', '抵押管理']
  },
  polkaAccount: {
    nodata: '未能在插件中檢測到賬戶，<br />請通過插件創建一個賬戶或導入已有賬戶。 ',
    notes: '備註',
    totalAssets: '總資產：',
    totalBalance: '總餘額',
    availableBalance: '可轉賬',
    lockedBalance: '已鎖定',
    reservedBalance: '已預留',
    bondedBalance: '抵押中',
    unbondingBalance: '贖回中',
    redeemable: '已贖回',
    redeem: '提取',
    comma: '，',
    remainBlocks: '個區塊後',
    send: '發送',
    receive: '接收'
  },
  polkaStake: {
    totalStake: '總抵押資產：',
    nodata: '暫無抵押資產。 ',
    newStake: '新增抵押',
    stashAccount: '儲存賬戶',
    controllerAccount: '管理賬戶',
    rewardDestination: '收益地址',
    Staked: '存儲賬戶（自動抵押）',
    Stash: '儲存賬戶（不自動抵押）',
    Controller: '管理賬戶',
    amounts: '資金',
    bondedBalance: '抵押中',
    unbondingBalance: '贖回中',
    redeemable: '已贖回',
    comma: '，',
    remainBlocks: '個區塊後',
    redeem: '提取',
    pendingReward: '待領取收益',
    noRewards: '暫無收益',
    Eras: '個紀元',
    Payout: '領取',
    Calculating: '計算中...',
    activeNoms: '已激活提名',
    inactiveNoms: '未激活提名',
    CommissionRate: '佣金比例',
    Nominate: '提名',
    Validate: '驗證',
    SetSessionKey: '設置 Session Key',
    BondMoreFunds: '添加抵押數額',
    UnbondFunds: '贖回',
    SetControllerAccount: '修改管理賬戶',
    SetRewardDestination: '修改收益地址',
    SetNominees: '修改被提名人',
    ChangeSessionKey: '修改 Session Key',
    SetValidatorReferences: '修改驗證人選項',
    Stop: '停止'
  },
  polkaDialog: {
    account: '賬戶',
    availableBalance: '可轉賬', //提取已贖回資產

    RedeemUnbondedFunds: '提取已贖回資產',
    Redeemable: '可提取',
    Fees: '交易費',
    Redeem: '提取', //接收
    Receive: '接收',
    Close: '關閉',
    CopySuccess: '複製成功',
    CopyFailed: '複製失敗', // 發送

    Send: '發送',
    Sender: '發送賬戶',
    Receiver: '接收賬戶',
    SendAmount: '發送數額',
    PleaseEnterAmount: '請輸入數額',
    MyAccounts: '我的賬戶',
    Recent: '最近轉賬',
    NoAccountsFound: '未搜索到賬戶。', //新增抵押

    NewStake: '新增抵押',
    StashAccount: '儲存賬戶',
    ControllerAccount: '管理賬戶',
    Transferrable: '可轉賬',
    BondAmount: '抵押數額',
    RewardDestination: '收益地址',
    Staked: '存儲賬戶（自動抵押）',
    Stash: '儲存賬戶（不自動抵押）',
    Controller: '管理賬戶',
    Confirm: '確認', //提名
    errTips: '該賬戶已在抵押中。',

    Nominate: '提名',
    ChooseNominees: '選擇被提名人',
    SearchValidatorAccounts: '搜索驗證人賬戶',
    NomiatedAccounts: '已選被提名人',
    startNominate: '開始提名', //設置 Session Key

    SetSessionKey: '設置 Session Key',
    EnterSessionKey: '輸入 Session Key', //設置驗證人選項

    SetValidator: '設置驗證人選項',
    SetCommissionRate: '設置佣金比例（0~100）',
    Validate: '開始驗證', // 領取收益

    Payout: '領取收益',
    PendingReward: '待領取', // 添加抵押數額

    BondMoreFunds: '添加抵押數額', // 贖回

    UnbondFunds: '贖回',
    bonded: '抵押中',
    UnbondAmount: '贖回數額', // 修改管理賬戶

    SetControllerAccount: '修改管理賬戶', // 修改收益地址

    SetRewardDestination: '修改收益地址', // 停止
    StopValidating: '停止驗證',

    StopNonimating: '停止提名',

    // 公投投票
    voteTitle: '投票',
    convictionOptsDefault: '0.1 倍投票權，無鎖定期',
    convictionOpts: '{0}倍投票權， 鎖定 {2} 天',
    voteAccount: '投票賬戶',
    Aye: '贊同',
    Nay: '反對',
    voteAmount: '投票數額',
    voteBalance: '投票可用數額',
    lockupPeriod: '鎖定期',
    vote: '投票',
    // 提案支持
    secondTitle: '支持提案',
    secondAccount: '支持賬戶',
    second: '支持'
  },

  // components
  announcementComp: {
    validatorName: '驗證人'
  },
  blockChartComp: {
    title: '紀元分',
    legend: ['紀元分', '平均紀元分']
  },
  footerComp: {
    LianXi: '聯繫我們：',
    GuanYuWoMen: '友情鏈接'
  },
  incomeComp: {
    title: '全網收益記錄',
    tableTitle: ['紀元', '收益'],
    btn: '刷新',
    loadBtn: '加載更多',
    emptyText: '暫無數據'
  },
  incomeSlashChartComp: {
    title: '最近預計收益 ＆ Slash',
    legend: ['預計收益', 'Slash', '平均收益']
  },
  judgementPopoverComp: {
    Unknown: '未知',
    Reasonable: '合理',
    'Known Good': '良好',
    'Out of Date': '過期',
    'Low Quality': '較差',
    'Erroneous:': '錯誤',
    judgement: '個評價：',
    noJudgement: '無評價',
    display: '顯示名',
    legal: '本名',
    email: '郵箱 ',
    web: '網站',
    twitter: '推特',
    riot: 'Riot'
  },
  navComp: {
    backHome: '返回首頁',

    language: '繁体中文',
    monitor: '看板',
    strategy: '策略',
    wallet: '錢包',
    'Proposals & Referenda': '提案和公投'
  },
  nominatorComp: {
    title: '提名人',
    tableTitle: ['提名人', '金額', '百分比'],
    emptyText: '暫無數據'
  },
  nominatorStrategyComp: {
    title: 'Staking 策略',
    subTitle: '我是提名人',
    inputTitle: '期望抵押數量（{0}）',
    inputPlaceholder: '請輸入數量',
    btn: '計 算',
    cardLabel: ['預計收益為：', 'Staking 策略模型表明，抵押給以下驗證人時可獲得較高收益。', '每日總收益', '年化收益率'],
    tableTitle: ['驗證人', '抵押總額', '佣金', '預計紀元收益', '預計每日收益'],
    validatorName: '驗證人',
    invalideNum: '超出最大數量 10,000,000。',
    timeout: '請求超時',
    emptyText: '暫無數據'
  },
  proposalComp: {
    title: '提案',
    tableTitle: ['序号', ['提案哈希', '預覽哈希'], '保證金', '支持者', '賬戶'],
    emptyText: '暫無數據',
    Second: '支持'
  },
  referendumsComp: {
    title: '公投',
    tableTitle: ['序號', ['提案哈希', '預覽哈希'], '剩餘', '激活區塊', '贊同', '反對'],
    emptyText: '暫無數據',
    blocks: '個區塊',
    Vote: '投票'
  },
  slashComp: {
    title1: 'Slash 記錄',
    title2: 'Slash 統計',
    recordsTitle: ['驗證人', '紀元', '金額'],
    statisticsTitle: ['驗證人', '次數', '總金額'],
    refreshBtn: '刷新',
    searchBtn: '搜索',
    placeholder: '請輸入地址',
    loadBtn: '加載更多',
    emptyText: '暫無數據'
  },
  validatorComp: {
    title: '驗證人',
    tableTitle: ['驗證人', '抵押總額', '佣金', '紀元分', '最近出塊', '收藏'],
    validatorName: '驗證人',
    emptyText: '暫無數據',
    description: '提名該驗證人可獲得 <span style="font-weight:600;">PHA 代幣空投</span>，詳情請查看',
    detail: 'Phala network 社區',
    descriptionEnd: '。'
  },
  validatorStrategyComp: {
    title: 'Staking 策略',
    subTitle: '我是驗證人',
    inputTitle: '期望抵押數量（{0}）',
    inputPlaceholder: '請輸入數量',
    btn: '計 算',
    cardLabel: [
      '預計收益為：',
      'Staking 策略模型表明，按照以下結果進節點搭建和抵押時可獲得較高收益。',
      '每日總收益',
      '年化收益率'
    ],
    tips1: '注：以上結果為方便計算，暫未考慮點搭建的硬件和人力等成本。',
    tips2: '您輸入的抵押金額過小，搭建節點後無法成功被選中為驗證人，請輸入一個更大的金額，或選擇',
    link: ' 我是提名人',
    punctuation: '。',
    resultLabel: ['節點數量：', '每個節點抵押數量：'],
    invalideNum: '超出最大數量 10,000,000。',
    timeout: '請求超時'
  }
}
