import device from 'current-device'

// eslint-disable-next-line no-undef
const polkaPrefix = `${APP_POLKA_BASE_HOST}/api/v1`

const url = {
  // polka
  validator: `${polkaPrefix}/validator`,
  identity: `${polkaPrefix}/validator/identity/`, // /api/v1/validator/identity/:accountId

  token: `${polkaPrefix}/token`,
  reward: `${polkaPrefix}/reward`,
  slashRecords: `${polkaPrefix}/slash`, // slash记录
  slashStatistics: `${polkaPrefix}/slash-count`, // slash 统计
  accountSlashStatistics: `${polkaPrefix}/slash-accountId`, // 验证人详情页 slash 统计
  tokenValidator: `${polkaPrefix}/token-validator`,
  finalizeNumber: `${polkaPrefix}/finalize-number`,

  overview: `${polkaPrefix}/democracy/overview`,
  referendums: `${polkaPrefix}/democracy/referendums`,
  proposals: `${polkaPrefix}/democracy/proposals`
}
window._config = {
  isMobile: device.type === 'mobile',
  device,
  locale: 'zh-TW',
  url
}
