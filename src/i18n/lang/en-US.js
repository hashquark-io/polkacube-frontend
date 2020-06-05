export default {
  polkaTitle: 'PolkaCube - Better Staking Experience of the Polkadot Ecology | HashQuark',

  // views
  notFound: {
    tips: "Ohh...This page doesn't exist",
    toHome: 'Back to Homepage'
  },
  polka: {
    intro: 'Welcome to PolkaCube!',
    info: [
      'Total Issurance',
      'Finalized Block',
      'Validators',
      'Inflation',
      'Stake Bonded',
      'Est. Daily Node Reward',
      'Epoch',
      'Era'
    ],
    nav: ['Validator', 'Reward Records', 'Slashing Records', 'Statistics'],
    contact: 'If you have any questions, feel free to contact us at contact@hashquark.io'
  },
  polkaDetail: {
    title: 'Validator',
    chart: ['Total Bonded', 'Self bonded', 'Nominators bonded'],
    chartLegend: {
      'Self bonded': 'selfBondedKsm',
      'Nominators bonded': 'nominatorsBondedKsm'
    },
    info: ['Commission', 'Era Points', 'Recent Block'],
    nav: ['Nominators', 'Slashing Records', 'Statistics', 'Era Points', 'Recent Rewards & Slashes'],
    navPc: ['Validator', 'Nominators', 'Slashing Records', 'Era Points', 'Recent Rewards & Slashes']
  },
  polkaProposal: {
    intro: 'Proposals & Referenda',
    info: ['Launch Period', 'Active Proposals', 'Referendums'],
    nav: ['Referenda', 'Proposals']
  },
  polkaStrategy: {
    title: 'Staking Strategy',
    desc:
      'For different nominators and validators and their expected bonding amount, PolkaCube gives the best bond and node setup strategies based on the NPoS algorithm, current network status, and optimized rewards model, and calculates the estimated rewards.',
    nomination: ['Nominator', 'Bond my assets to validators and get rewards.'],
    validator: [
      'Validator',
      'Set up one or multiple validators, produce blocks, accept bonding tokens and get rewards.'
    ]
  },
  polkaWallet: {
    connecting: 'Connecting...',
    reconnect: 'Connecting network...',
    tips: 'Use Chrome explorer and install the following extension to connect to your wallets:',
    tabs: ['My Accounts', 'Staking']
  },
  polkaAccount: {
    nodata: 'No active accounts detected.<br />Please create a new account or import an existing one in the extension.',
    notes: 'Note',
    totalAssets: 'Total Asset: ',
    totalBalance: 'Total balance',
    availableBalance: 'Transferrable',
    lockedBalance: 'Locked',
    reservedBalance: 'Reserved',
    bondedBalance: 'Bonded',
    unbondingBalance: 'Unbonding',
    redeemable: 'Unbonded',
    redeem: 'Redeem',
    comma: ',',
    remainBlocks: 'blocks later',
    send: 'Send',
    receive: 'Receive'
  },
  polkaStake: {
    totalStake: 'Total Stake: ',
    nodata: 'No funds staked yet.',
    newStake: 'New stake',
    stashAccount: 'Stash account',
    controllerAccount: 'Controller account',
    rewardDestination: 'Reward destination',
    Staked: 'staked',
    Stash: 'stash',
    Controller: 'controller',
    amounts: 'Amounts',
    bondedBalance: 'Bonded',
    unbondingBalance: 'Unbonding',
    redeemable: 'Unbonded',
    comma: '，',
    remainBlocks: 'blocks later',
    redeem: 'Redeem',
    pendingReward: 'Pending reward',
    noRewards: 'No rewards',
    Eras: 'Eras',
    Payout: 'Payout',
    Calculating: 'Calculating...',
    activeNoms: 'Active nominations',
    inactiveNoms: 'Inactive nominations',
    CommissionRate: 'Commission rate',
    Nominate: 'Nominate',
    Validate: 'Validate',
    SetSessionKey: 'Set Session Key',
    BondMoreFunds: 'Bond more funds',
    UnbondFunds: 'Unbond funds',
    SetControllerAccount: 'Change controller account',
    SetRewardDestination: 'Change reward destination',
    SetNominees: 'Set nominees',
    ChangeSessionKey: 'Change Session Key',
    SetValidatorReferences: 'Set validator preferences',
    Stop: 'Stop'
  },
  polkaDialog: {
    account: 'Account',
    availableBalance: 'Transferrable',

    //提取已赎回资产
    RedeemUnbondedFunds: 'Redeem Unbonded Funds',
    Redeemable: 'Redeemable',
    Fees: 'Fees',
    Redeem: 'Redeem',
    //接收
    Receive: 'Receive',
    Close: 'Close',
    CopySuccess: 'Copy Success',
    CopyFailed: 'Copy Failed',

    // 发送
    Send: 'Send',
    Sender: 'Sender',
    Receiver: 'Receiver',
    SendAmount: 'Send amount',
    PleaseEnterAmount: 'Please enter amount',
    MyAccounts: 'My accounts',
    Recent: 'Recent',
    NoAccountsFound: 'No accounts found.',

    //新增抵押
    NewStake: 'New stake',
    StashAccount: 'Stash account',
    ControllerAccount: 'Controller account',
    Transferrable: 'Transferrable',
    BondAmount: 'Bond amount',
    RewardDestination: 'Reward destination',
    Staked: 'Stash account (increase the amount at stake)',
    Stash: 'Stash account (do not increase the amount at stake)',
    Controller: 'Controller account',
    Confirm: 'Confirm',
    errTips: 'Stake has been added with this account.',

    //提名
    Nominate: 'Nominate',
    ChooseNominees: 'Choose nominees',
    SearchValidatorAccounts: 'Search validator accounts',
    NomiatedAccounts: 'Nomiated accounts',
    startNominate: 'Nominate',

    //设置 Session Key
    SetSessionKey: 'Set Session Key',
    EnterSessionKey: 'Enter Session Key',

    //设置验证人选项
    SetValidator: 'Set Validator Preferences',
    SetCommissionRate: 'Set commission rate (0~100)',
    Validate: 'Validate',

    // 领取收益
    Payout: 'Payout Reward',
    PendingReward: 'Pending reward',

    // 添加抵押数额
    BondMoreFunds: 'Bond More Funds',

    // 赎回
    UnbondFunds: 'Unbond Funds',
    bonded: 'Bonded',
    UnbondAmount: 'Unbond amount',

    // 修改管理账户
    SetControllerAccount: 'Change Controller Account',

    // 修改收益地址
    SetRewardDestination: 'Change Reward Destination',
    // 停止
    StopValidating: 'Stop Validating',

    StopNonimating: 'Stop Nonimating',

    // 公投投票
    voteTitle: 'Vote on Proposal',

    convictionOptsDefault: '0.1x voting balance, no lockup period',
    convictionOpts: '{0}x voting balance, locked for {2} days',
    voteAccount: 'Vote with account',
    Aye: 'Aye',
    Nay: 'Nay',
    voteAmount: 'Vote amount',
    voteBalance: 'Voting balance',
    lockupPeriod: 'Lockup period',
    vote: 'Vote',
    // 提案支持
    secondTitle: 'Second Proposal',
    secondAccount: 'Second with account',
    second: 'Second'
  },
  // components
  announcementComp: {
    validatorName: 'Validator'
  },
  blockChartComp: {
    title: 'Era Points',
    legend: ['Era Points', 'Averge points']
  },
  footerComp: {
    LianXi: 'Contact Us：',
    GuanYuWoMen: 'Link Exchange'
  },
  incomeComp: {
    title: 'Reward Records',
    tableTitle: ['Era', 'Reward'],
    btn: 'Refresh',
    loadBtn: 'Load more',
    emptyText: 'No records'
  },
  incomeSlashChartComp: {
    title: 'Recent Rewards & Slashes',
    legend: ['Estimated rewards', 'Slashed', 'Average rewards']
  },
  judgementPopoverComp: {
    Unknown: 'Unknown',
    Reasonable: 'Reasonable',
    'Known Good': 'Known Good',
    'Out of Date': 'Out of Date',
    'Low Quality': 'Low Quality',
    'Erroneous:': 'Erroneous',
    judgement: 'judgement:',
    judgements: 'judgements:',
    noJudgement: 'No judgements',
    display: 'Display',
    legal: 'Legal',
    email: 'Email',
    web: 'Web',
    twitter: 'Twitter',
    riot: 'Riot'
  },
  navComp: {
    backHome: 'Back to Home',

    language: 'English',
    monitor: 'Dashboard',
    strategy: 'Strategy',
    wallet: 'Wallet',
    'Proposals & Referenda': 'Proposals & Referenda'
  },
  nominatorComp: {
    title: 'Nominators',
    tableTitle: ['Nominator', 'Amount', 'Percentage'],
    emptyText: 'No records'
  },
  nominatorStrategyComp: {
    title: 'Staking Strategy',
    subTitle: 'I am Nominator',
    inputTitle: 'Expected bonding amount ({0})',
    inputPlaceholder: 'Enter an amount',
    btn: 'Calculate',
    cardLabel: [
      'Estimated Rewards:',
      'Staking strategy model indicates that higher rewards can be obtained when bonded to the following validators.',
      'Total Daily Rewards',
      'ROI'
    ],
    tableTitle: ['Validator', 'Bonded', 'Commission', 'Est. Era Rewards', 'Est. Daily Rewards'],
    validatorName: 'Validator',
    invalideNum: 'Exceeded max amount 10,000,000.',
    timeout: 'Request timeout',
    emptyText: 'No records'
  },
  proposalComp: {
    title: 'Proposals',
    tableTitle: ['Index', ['Proposal hash', 'Preimage hash'], 'Locked', 'Seconds', 'Account'],
    emptyText: 'No records',
    Second: 'Second'
  },
  referendumsComp: {
    title: 'Referenda',
    tableTitle: ['Index', ['Proposal hash', 'Preimage hash'], 'Remaining', 'Activate at', 'Aye', 'Nay'],
    emptyText: 'No records',
    blocks: 'blocks',
    Vote: 'Vote'
  },
  slashComp: {
    title1: 'Slashing Records',
    title2: 'Statistics',
    recordsTitle: ['Validator', 'Era', 'Amount'],
    statisticsTitle: ['Validator', 'Count', 'Total Amount'],
    refreshBtn: 'Refresh',
    searchBtn: 'Search',
    placeholder: 'Enter an address',
    loadBtn: 'Load more',
    emptyText: 'No records'
  },
  validatorComp: {
    title: 'Validators',
    tableTitle: ['Validator', 'Bonded', 'Commission', 'Era Points', 'Recent Block', 'Favorite'],
    validatorName: 'Validator',
    emptyText: 'No records',
    description:
      'Nomination of this validator will also receive <span style="font-weight:600;">PHA token airdrop</span>, please check',
    detail: 'Phala network community',
    descriptionEnd: 'for details.'
  },
  validatorStrategyComp: {
    title: 'Staking Strategy',
    subTitle: 'I am Validator',
    inputTitle: 'Expected bonding amount ({0})',
    inputPlaceholder: 'Enter an amount',
    btn: 'Calculate',
    cardLabel: [
      'Estimated Rewards:',
      'Staking strategy model indicates that higher rewards can be obtained when validators are setup and bonded as follow.',
      'Total Daily Rewards',
      'ROI'
    ],
    tips1:
      'Note: The cost of hardware and labor is not considered in the above results for the convenience of calculation.',
    tips2:
      'The bonding amount you entered is too small to be selected as a validator. Please enter a larger amount, or choose ',
    link: ' I am Nominator',
    punctuation: '.',
    resultLabel: ['Number of Validators:', 'Amount Bonded per Validator:'],
    invalideNum: 'Exceeded max amount 10,000,000.',
    timeout: 'Request timeout'
  }
}
