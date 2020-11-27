const Apisauce = require('apisauce')
const hmacSha256 = require('crypto-js/hmac-sha256')
const SHA256 = require('crypto-js/sha256')

const registration = async ({ pgBaseUrl, payload: { userId } }) => {
  // SHA256 (timeStamp + iMid + referenceNo + amt + merchantKey)
  const now = new Date().getTime()
  const iMid = 'FIXTEST001'
  const amt = 2000 // payment amount
  const referenceNo = now // merchant ref num
  const merchantKey = '33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A=='
  const merchantToken = SHA256(`${now}${iMid}${referenceNo}${amt}${merchantKey}`).toString()

  //   Dan untuk CC bisa redirect ke API v1 Profresional https://docs.nicepay.co.id/api-v1-EN.html#nicepay-professional

  var bodyHit = {
    merchantToken,
    timeStamp: now,
    iMid,
    referenceNo,
    amt,
    payMethod: '02',
    currency: 'IDR',
    goodsNm: 'Merchant Goods 1',
    billingNm: 'Nofrets Poai',
    billingPhone: '085342805673',
    billingEmail: 'nofrets.poai@gmail.com',
    dbProcessUrl: 'http://1fa308ac8a4c.ngrok.io/core/api/v1/callback-nicepay', // *
    bankCd: 'BMRI',
    vacctValidDt: 20201201,
    vacctValidTm: 135959,
    merFixAcctId: 12345678
  }
  const api = Apisauce.create({
    baseURL: 'https://dev.nicepay.co.id/nicepay/direct/v2',
    headers: {
      'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   xsrfCookieName: 'myCatx',
      timeout: 10000,
      channelid: 'WEB'
    }
  })
  api.setHeader('hmac', '')
  const resp = await api.post('/registration', bodyHit)
  console.log('resp.duration====>', resp.duration)
  console.log('resp.problem====>', resp.problem)
  console.log('resp.status====>', resp.status)
  console.log('resp.ok====>', resp.ok)
  console.log('resp.data====>', resp.data)
  console.log('bodyHit====>', bodyHit)
}

module.exports = {
  registration
}
