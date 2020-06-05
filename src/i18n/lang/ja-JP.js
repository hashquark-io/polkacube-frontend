export default {
  polkaTitle: 'PolkaCube - より良いボカエコステーキング体験 | HashQuark',

  // views
  notFound: {
    tips: 'Webページが見つかりません',
    toHome: 'ホームページに戻る'
  },
  polka: {
    intro: 'PolkaCubeへようこそ！',
    info: ['総発行量', '最後のブロック', '認証者', 'インフレ率', '抵当率', 'ノードの予想利益', '時代', 'エポック'],
    nav: ['認証者', 'ネットワーク全体の収益記録', 'Slash記録', 'Slash統計'],
    contact: 'ご不明な点がございましたらご連絡ください：contact@hashquark.io'
  },
  polkaDetail: {
    title: '認証者',
    chart: ['抵当総額', 'セルフ抵当', '候補者の抵当'],
    chartLegend: {
      自抵押: 'selfBondedKsm',
      提名人抵押: 'nominatorsBondedKsm'
    },
    info: ['手数料', 'エポック', '最近のブロック'],
    nav: ['候補者', 'Slash記録', 'Slash統計', '最近のブロック', '最近の予想利益 & Slash'],
    navPc: ['認証者', '候補者', 'Slash記録', '最近のブロック', '最近の予想利益 & Slash']
  },
  polkaProposal: {
    intro: '提案と投票',
    info: ['スタートアップ期間', '現在の提案数', '投票量'],
    nav: ['投票', '提案']
  },
  polkaStrategy: {
    title: 'Stakingストラテジー',
    desc:
      'PolkaCube さまざまな候補者と検証者、およびそれらのカスタマイズされた資産割り当てについて、NPoSアルゴリズム、現在のネットワークステータス、最適化された収益モデルの設計に基づいて、最良の抵当とノード戦略が与えられ、推定収益データが計算されます。',
    nomination: ['私は候補者です', '資産を検証ノードに抵当に入れて収入を得ます。'],
    validator: [
      '私は認証者です',
      '検証ノードをセットアップします。これは、ブロックを作成し、候補者の抵当を受け入れ、同時に収入を得ることを担当します。'
    ]
  },
  // TODO:上周上线功能未翻译
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

    StopNonimating: '停止提名'
  },
  // TODO:上周上线功能未翻译
  // components
  announcementComp: {
    validatorName: '認証者'
  },
  blockChartComp: {
    title: '最近のブロック',
    legend: ['ブロック生成数', '平均ブロック生成数', '有効抵当数量']
  },
  footerComp: {
    LianXi: 'お問い合わせ：contact@hashquark.io',
    GuanYuWoMen: 'フレンドリーリンク'
  },
  incomeComp: {
    title: 'ネットワーク全体の収益記録',
    tableTitle: ['イベント番号', '認証者収益', '財務収益'],
    btn: 'リフレッシュ',
    loadBtn: 'さらに読み込む',
    emptyText: 'データなし'
  },
  incomeSlashChartComp: {
    title: '最近の予想利益 & Slash',
    legend: ['予想利益', 'Slash', '平均利益']
  },
  judgementPopoverComp: {
    Unknown: '不明',
    Reasonable: '合理',
    'Known Good': 'グッド',
    'Out of Date': '期限切れ',
    'Low Quality': '低品質',
    'Erroneous:': '誤り',
    noJudgement: '評価ない',
    judgement: '評価：',
    display: '掲示',
    legal: '合法',
    email: 'E-mail ',
    web: 'ウェブサイト',
    twitter: 'ツイッター',
    riot: 'Riot'
  },
  navComp: {
    backHome: 'HashQuarkに移動',

    monitor: 'モニター',
    language: '日本語',
    strategy: 'ストラテジー',
    'Proposals & Referenda': '提案と投票'
  },
  nominatorComp: {
    title: '候補者',
    tableTitle: ['候補者', '金額', 'パーセンテージ'],
    emptyText: 'データなし'
  },
  nominatorStrategyComp: {
    title: 'Staking 戦略',
    subTitle: '私は候補者です',
    inputTitle: '希望される抵当量（{0}）',
    inputPlaceholder: '数量を入力してください',
    btn: '計算',
    cardLabel: [
      '機体収益は：',
      'ステーキング戦略モデルは、以下の認証者に抵当に入れたときに、より高い収益が得られることを示しています。',
      '1日の総収入',
      '年間収益率'
    ],
    tableTitle: ['認証者', '抵当総額', '手数料', '予測されるエポック収益', '予測される1日の収益'],
    validatorName: '認証者',
    invalideNum: '最大数の10,000,000を超えています。',
    timeout: 'タイムアウト',
    emptyText: 'データなし'
  },
  proposalComp: {
    title: '提案',
    tableTitle: ['シリアル番号', ['提案ハッシュ', 'プレビューハッシュ'], '敷金', 'サポーター', '認証者'],
    emptyText: 'データなし'
  },
  referendumsComp: {
    title: '投票',
    tableTitle: [
      'シリアル番号',
      ['提案ハッシュ', 'プレビューハッシュ'],
      '残り',
      'ブロックをアクティブする',
      '同意',
      '反対'
    ],
    emptyText: 'データなし',
    blocks: 'ブロック'
  },
  slashComp: {
    title1: 'Slash 記録',
    title2: 'Slash 統計',
    recordsTitle: ['認証者', 'イベント番号', '金額'],
    statisticsTitle: ['認証者', '回数', '総額'],
    refreshBtn: 'リフレッシュ',
    searchBtn: '検索',
    placeholder: 'アドレスを入力してください',
    loadBtn: 'さらに読み込む',
    emptyText: 'データなし'
  },
  validatorComp: {
    title: '認証者',
    tableTitle: ['認証者', '抵当総額', '手数料', 'エポック', '最近のブロック', 'ブックマーク'],
    validatorName: '認証者',
    emptyText: 'データなし',
    description: '提名该验证人可获得 PHA 代币空投，详情请查看',
    detail: 'Phala network 社区'
  },
  validatorStrategyComp: {
    title: 'ステーキング戦略',
    subTitle: '私は認証者です',
    inputTitle: '希望される抵当量（{0}）',
    inputPlaceholder: '数量を入力してください',
    btn: '計算',
    cardLabel: [
      '期待収益は：',
      'ステーキング戦略モデルは、ノードの建設と抵当に入るときに、次の結果に従ってより高い利益が得られることを示しています。',
      '1日の総収入',
      '年間収益率'
    ],
    tips1: '上記の結果は計算の便宜上のものであり、構築に必要なハードウェアと労力のコストはまだ考慮されていません。',
    tips2:
      '入力した抵当の金額が小さすぎるため、ノードの作成後に認証者として選ばれないです。金額を大きくするか、選択してください',
    link: ' 私は候補者です',
    punctuation: '。',
    resultLabel: ['ノード数：', 'ノードあたりの抵当数：'],
    invalideNum: '最大数の10,000,000を超えています。',
    timeout: 'タイムアウト'
  }
}
