const Apisauce = require('apisauce')
const hmacSha256 = require('crypto-js/hmac-sha256')
const SHA256 = require('crypto-js/sha256')

const registration = async ({ pgBaseUrl, payload: { userId } }) => {
  // SHA256 (timeStamp + iMid + referenceNo + amt + merchantKey)
  const now = new Date().getTime()
  const iMid = 'FIXTEST001'
  // IONPAYTEST untuk cc
  const amt = 2000 // payment amount
  const referenceNo = now // merchant ref num
  const merchantKey = '33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A=='
  const merchantToken = SHA256(`${now}${iMid}${referenceNo}${amt}${merchantKey}`).toString()

  //   Dan untuk CC bisa redirect ke API v1 Profresional https://docs.nicepay.co.id/api-v1-EN.html#nicepay-professional

  var bodyHit = {
    deliveryPhone: '62-21-0000-0000',
    fee: '0',
    amt,
    description: 'this is test transaction!!',
    notaxAmt: '0',
    reqDomain: 'localhost',
    userLanguage: 'en-US',
    vacctValidDt: '20201225',
    vacctValidTm: '135959',
    billingEmail: 'nofrets.poai@gmail.com',
    merFixAcctId: '12345678',
    payMethod: '02',
    deliveryAddr: 'Jalan Jenderal Gatot Subroto Kav.57',
    billingCountry: 'ID',
    userIP: '',
    currency: 'IDR',
    deliveryCity: 'Jakarta',
    merchantToken,
    goodsNm: 'Merchant Goods 1',
    referenceNo,
    vat: '0',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/60.0.3112.101 Safari/537.36',
    billingState: 'Jakarta',
    userSessionID: '697D6922C961070967D3BA1BA5699C2C',
    deliveryNm: 'HongGilDong',
    deliveryPostCd: '12950',
    reqClientVer: '',
    iMid,
    billingNm: 'Nofrets Poai',
    timeStamp: '20201223170942',
    dbProcessUrl: 'http://341e64e9b2d7.ngrok.io/core/api/v1/callback-nicepay', // *
    cartData: {
      count: '1',
      item: [
        {
          img_url: 'http://img.aaa.com/ima1.jpg',
          goods_name: 'Item 1 Name',
          goods_detail: 'Item 1 Detail',
          goods_amt: '700'
        }
      ]
    },
    deliveryState: 'Jakarta',
    deliveryCountry: 'ID',
    bankCd: 'BMRI',
    billingPostCd: '12950',
    billingAddr: 'Jalan Jenderal Gatot Subroto Kav.57',
    reqServerIP: '172.29.2.178',
    billingPhone: '085342805673',
    billingCity: 'Jakarta'
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
  console.log('bodyHit====>', bodyHit)
  console.log('resp.duration====>', resp.duration)
  console.log('resp.problem====>', resp.problem)
  console.log('resp.status====>', resp.status)
  console.log('resp.ok====>', resp.ok)
  console.log('resp.data====>', resp.data)
}
registration({ pgBaseUrl: '', payload: { userId: '' } })

module.exports = {
  registration
}
