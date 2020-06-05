export default {
  polkaTitle: 'PolkaCube - 更好的波卡生态 Staking 体验 | HashQuark',

  // views
  notFound: {
    tips: 'Ohh...页面离家出走了',
    toHome: '返回首页'
  },
  polka: {
    intro: '欢迎来到 PolkaCube！',
    info: ['总发行量', '最终确认区块', '验证人', '通胀率', '抵押率', '节点预计每日收益', '时代', '纪元'],
    nav: ['验证人', '全网收益记录', 'Slash记录', 'Slash 统计'],
    contact: '如有问题请联系我们：contact@hashquark.io'
  },
  polkaDetail: {
    title: '验证人',
    chart: ['抵押总额', '自抵押', '提名人抵押'],
    chartLegend: {
      自抵押: 'selfBondedKsm',
      提名人抵押: 'nominatorsBondedKsm'
    },
    info: ['佣金', '纪元分', '最近出块'],
    nav: ['提名人', 'Slash记录', 'Slash 统计', '纪元分', '最近预计收益 & Slash'],
    navPc: ['验证人', '提名人', 'Slash 记录', '纪元分', '最近预计收益 & Slash']
  },
  polkaProposal: {
    intro: '提案和公投',
    info: ['启动期', '当前提案数量', '公投数量'],
    nav: ['公投', '提案']
  },
  polkaStrategy: {
    title: 'Staking 策略',
    desc:
      'PolkaCube 针对不同的提名人和验证人，及其自定义的资产额度，根据 NPoS 算法、当前网络状态及优化的收益模型设计，给出最佳的抵押和节点搭建策略，并计算出预计的收益数据。',
    nomination: ['我是提名人', '将资产抵押给验证节点，获取收益。'],
    validator: ['我是验证人', '搭建验证节点，负责出块，接受提名人的抵押，同时获取收益。']
  },
  polkaWallet: {
    connecting: '连接中...',
    reconnect: '正在连接网络... ',
    tips: '使用 Chrome 浏览器，并安装以下插件来连接钱包：',
    tabs: ['我的账户', '抵押管理']
  },
  polkaAccount: {
    nodata: '未能在插件中检测到账户，<br />请通过插件创建一个账户或导入已有账户。',
    notes: '备注',
    totalAssets: '总资产：',
    totalBalance: '总余额',
    availableBalance: '可转账',
    lockedBalance: '已锁定',
    reservedBalance: '已预留',
    bondedBalance: '抵押中',
    unbondingBalance: '赎回中',
    redeemable: '已赎回',
    redeem: '提取',
    comma: '，',
    remainBlocks: '个区块后',
    send: '发送',
    receive: '接收'
  },
  polkaStake: {
    totalStake: '总抵押资产：',
    nodata: '暂无抵押资产。',
    newStake: '新增抵押',
    stashAccount: '储存账户',
    controllerAccount: '管理账户',
    rewardDestination: '收益地址',
    Staked: '存储账户（自动抵押）',
    Stash: '储存账户（不自动抵押）',
    Controller: '管理账户',
    amounts: '资金',
    bondedBalance: '抵押中',
    unbondingBalance: '赎回中',
    redeemable: '已赎回',
    comma: '，',
    remainBlocks: '个区块后',
    redeem: '提取',
    pendingReward: '待领取收益',
    noRewards: '暂无收益',
    Eras: '个纪元',
    Payout: '领取',
    Calculating: '计算中...',
    activeNoms: '已激活提名',
    inactiveNoms: '未激活提名',
    CommissionRate: '佣金比例',
    Nominate: '提名',
    Validate: '验证',
    SetSessionKey: '设置 Session Key',
    BondMoreFunds: '添加抵押数额',
    UnbondFunds: '赎回',
    SetControllerAccount: '修改管理账户',
    SetRewardDestination: '修改收益地址',
    SetNominees: '修改被提名人',
    ChangeSessionKey: '修改 Session Key',
    SetValidatorReferences: '修改验证人选项',
    Stop: '停止'
  },
  polkaDialog: {
    account: '账户',
    availableBalance: '可转账',

    //提取已赎回资产
    RedeemUnbondedFunds: '提取已赎回资产',
    Redeemable: '可提取',
    Fees: '交易费',
    Redeem: '提取',
    //接收
    Receive: '接收',
    Close: '关闭',
    CopySuccess: '复制成功',
    CopyFailed: '复制失败',

    // 发送
    Send: '发送',
    Sender: '发送账户',
    Receiver: '接收账户',
    SendAmount: '发送数额',
    PleaseEnterAmount: '请输入数额',
    MyAccounts: '我的账户',
    Recent: '最近转账',
    NoAccountsFound: '未搜索到账户。',

    //新增抵押
    NewStake: '新增抵押',
    StashAccount: '储存账户',
    ControllerAccount: '管理账户',
    Transferrable: '可转账',
    BondAmount: '抵押数额',
    RewardDestination: '收益地址',
    Staked: '存储账户（自动抵押）',
    Stash: '储存账户（不自动抵押）',
    Controller: '管理账户',
    Confirm: '确认',
    errTips: '该账户已在抵押中。',

    //提名
    Nominate: '提名',
    ChooseNominees: '选择被提名人',
    SearchValidatorAccounts: '搜索验证人账户',
    NomiatedAccounts: '已选被提名人',
    startNominate: '开始提名',

    //设置 Session Key
    SetSessionKey: '设置 Session Key',
    EnterSessionKey: '输入 Session Key',

    //设置验证人选项
    SetValidator: '设置验证人选项',
    SetCommissionRate: '设置佣金比例（0~100）',
    Validate: '开始验证',

    // 领取收益
    Payout: '领取收益',
    PendingReward: '待领取',

    // 添加抵押数额
    BondMoreFunds: '添加抵押数额',

    // 赎回
    UnbondFunds: '赎回',
    bonded: '抵押中',
    UnbondAmount: '赎回数额',

    // 修改管理账户
    SetControllerAccount: '修改管理账户',

    // 修改收益地址
    SetRewardDestination: '修改收益地址',
    // 停止
    StopValidating: '停止验证',

    StopNonimating: '停止提名',

    // 公投投票
    voteTitle: '投票',
    convictionOptsDefault: '0.1 倍投票权，无锁定期',
    convictionOpts: '{0}倍投票权， 锁定 {2} 天',
    voteAccount: '投票账户',
    Aye: '赞同',
    Nay: '反对',
    voteAmount: '投票数额',
    voteBalance: '投票可用数额',
    lockupPeriod: '锁定期',
    vote: '投票',
    // 提案支持
    secondTitle: '支持提案',
    secondAccount: '支持账户',
    second: '支持'
  },

  // components
  announcementComp: {
    validatorName: '验证人'
  },
  blockChartComp: {
    title: '纪元分',
    legend: ['纪元分', '平均纪元分']
  },
  footerComp: {
    LianXi: '联系我们：',
    GuanYuWoMen: '友情链接'
  },
  incomeComp: {
    title: '全网收益记录',
    tableTitle: ['纪元', '收益'],
    btn: '刷新',
    loadBtn: '加载更多',
    emptyText: '暂无数据'
  },
  incomeSlashChartComp: {
    title: '最近预计收益 & Slash',
    legend: ['预计收益', 'Slash', '平均收益']
  },
  judgementPopoverComp: {
    Unknown: '未知',
    Reasonable: '合理',
    'Known Good': '良好',
    'Out of Date': '过期',
    'Low Quality': '较差',
    'Erroneous:': '错误',
    noJudgement: '无评价',
    judgement: '个评价：',
    display: '显示名',
    legal: '本名',
    email: '邮箱 ',
    web: '网站',
    twitter: '推特',
    riot: 'Riot'
  },
  navComp: {
    backHome: '返回首页',

    monitor: '看板',
    language: '简体中文',
    strategy: '策略',
    wallet: ' 钱包',
    'Proposals & Referenda': '提案和公投'
  },
  nominatorComp: {
    title: '提名人',
    tableTitle: ['提名人', '金额', '百分比'],
    emptyText: '暂无数据'
  },
  nominatorStrategyComp: {
    title: 'Staking 策略',
    subTitle: '我是提名人',
    inputTitle: '期望抵押数量（{0}）',
    inputPlaceholder: '请输入数量',
    btn: '计 算',
    cardLabel: ['预计收益为：', 'Staking 策略模型表明，抵押给以下验证人时可获得较高收益。', '每日总收益', '年化收益率'],
    tableTitle: ['验证人', '抵押总额', '佣金', '预计纪元收益', '预计每日收益'],
    validatorName: '验证人',
    invalideNum: '超出最大数量 10,000,000。',
    timeout: '请求超时',
    emptyText: '暂无数据'
  },
  proposalComp: {
    title: '提案',
    tableTitle: ['序号', ['提案哈希', '预览哈希'], '保证金', '支持者', '账户'],
    emptyText: '暂无数据',
    Second: '支持'
  },
  referendumsComp: {
    title: '公投',
    tableTitle: ['序号', ['提案哈希', '预览哈希'], '剩余', '激活区块', '赞同', '反对'],
    emptyText: '暂无数据',
    blocks: '个区块',
    Vote: '投票'
  },
  slashComp: {
    title1: 'Slash 记录',
    title2: 'Slash 统计',
    recordsTitle: ['验证人', '纪元', '金额'],
    statisticsTitle: ['验证人', '次数', '总金额'],
    refreshBtn: '刷新',
    searchBtn: '搜索',
    placeholder: '请输入地址',
    loadBtn: '加载更多',
    emptyText: '暂无数据'
  },
  validatorComp: {
    title: '验证人',
    tableTitle: ['验证人', '抵押总额', '佣金', '纪元分', '最近出块', '收藏'],
    validatorName: '验证人',
    emptyText: '暂无数据',
    description: '提名该验证人可获得 <span style="font-weight:600;">PHA 代币空投</span>，详情请查看',
    detail: 'Phala network 社区',
    descriptionEnd: '。'
  },
  validatorStrategyComp: {
    title: 'Staking 策略',
    subTitle: '我是验证人',
    inputTitle: '期望抵押数量（{0}）',
    inputPlaceholder: '请输入数量',
    btn: '计 算',
    cardLabel: [
      '预计收益为：',
      'Staking 策略模型表明，按照以下结果进节点搭建和抵押时可获得较高收益。',
      '每日总收益',
      '年化收益率'
    ],
    tips1: '注：以上结果为方便计算，暂未考虑点搭建的硬件和人力等成本。',
    tips2: '您输入的抵押金额过小，搭建节点后无法成功被选中为验证人，请输入一个更大的金额，或选择',
    link: ' 我是提名人',
    punctuation: '。',
    resultLabel: ['节点数量：', '每个节点抵押数量：'],
    invalideNum: '超出最大数量 10,000,000。',
    timeout: '请求超时'
  }
}
