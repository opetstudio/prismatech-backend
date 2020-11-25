var express = require('express')
var router = express.Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('config')
const formidable = require('formidable')
const FileModel = require('../src/collections/file/Model')
// const TokoTokoOnlineModel = require('../src/collections/toko_toko_online/Model')
const pathmodule = require('path')
// const TokoProductService = require('../src/collections/toko_product/services')
// const TokoCartService = require('../src/collections/toko_cart/services')
// const TokoPoService = require('../src/collections/toko_po/services')
const Moment = require('moment')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('backoffice/index', { title: 'Express' })
})
router.get('/renderfile/:filename', (req, res, next) => {
  res.sendFile(pathmodule.join(__dirname, '..', '..', 'uploadfile', req.params.filename))
  // res.sendFile(__dirname + './uploadfile/1595349658069.png')
})
// router.get('/tokoonline/javascript-sdk/:module', (req, res, next) => {
//   var marketPlinkHost = config.get('marketPlinkHost')
//   var referer = req.header('Referer')
//   console.log('referer==>', referer)
//   // var origin = 'http://dev.plink.co.id'
//   var origin = req.get('origin') || referer || ''
//   // get toko id by origin url
//   // var tokoId = '5f3373db203efa581d2354a2'
//   // var tokoId = req.query.id
//   console.log('origin=====>', origin)
//   console.log('tokoid=====>', req.query.tokoid)
//   var arr = origin.split('/')
//   var website = arr[0] + '//' + arr[2]
//   TokoTokoOnlineModel.findOne({ website: { $regex: '.*' + website + '.*' }, _id: req.query.tokoid }, (err, doc) => {
//     if (!origin.includes(marketPlinkHost) && (err || !doc)) return res.send('error')
//     console.log('doc====>', doc)
//     var tokoId = '' + (doc || {})._id

//     if (origin.includes(marketPlinkHost)) tokoId = req.query.tokoid

//     var backendBaseUrl = config.get('backendBaseUrl')
//     // res.sendFile(pathmodule.join(__dirname + '/../javascript-sdk/' + req.params.module))
//     res.setHeader('Content-Type', 'text/javascript; charset=UTF-8')
//     res.write('var tokoId="' + tokoId + '";var baseUrl="' + backendBaseUrl + '";')
//     // res.write('var tokoId="5f3373db203efa581d2354a2";')
//     fs.createReadStream(pathmodule.join(__dirname + '/../javascript-sdk/' + req.params.module))
//     // .pipe(newLineStream())
//     // .pipe(parser)
//       .on('end', () => {
//       // console.log('cekkkkk')
//       // res.write('\n<!-- End stream -->')
//       }).pipe(res)
//     // res.sendFile(__dirname + './uploadfile/1595349658069.png')
//     // res.sendFile(pathmodule.join(__dirname + '/../javascript-sdk/' + req.params.module))
//   })
// })
router.post('/uploadfile', (req, res, next) => {
  const form = formidable({ multiples: true })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    const { path, size, name, type, mtime } = files.file
    const now = new Date().getTime()
    try {
      const { accesstoken } = req.headers
      const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
      const { user_id: userId } = bodyAt
      const fileType = type.split('/').pop()
      const newPath = pathmodule.join(__dirname, '..', '..', 'uploadfile', `${now}.${fileType}`)
      console.log('newPath===>', newPath)
      var source = fs.createReadStream(path)
      var dest = fs.createWriteStream(newPath)

      source.pipe(dest)
      source.on('end', function () { console.log('success copy') })
      source.on('error', function (err) { console.log('error copy ', err) })

      const data = {
        mtime: mtime,
        file_size: size,
        file_type: fileType,
        filename: '' + now + '',
        filenameorigin: name,
        created_at: now,
        updated_at: now,
        created_by: userId,
        updated_by: userId
      }
      const detailData = await FileModel.create(data)
      // return { status: 200, success: 'Successfully save Data', detail_data: await Subject.create(data) }
      res.json({ status: 200, success: 'Successfully save Data', detail_data: detailData })
    } catch (err) {
      console.log('errorrr====>', err)
      // return { status: 400, error: err }
      res.json({ fields, files, status: 400, error: err })
    }
    // res.writeHead(200, { 'content-type': 'application/json' })
    // res.end(JSON.stringify({ fields, files }, null, 2))
    // res.render('index', { title: req.body.name })
  })
})
// router.get('/product-catalog/:tokoSlug', async function (req, res, next) {
//   try {
//     const tokoSlug = req.params.tokoSlug
//     const pageSize = 10
//     const pageIndex = 0
//     const allMyTokoProducts = await TokoProductService.getAllDataByTokoSlug({ toko_slug: tokoSlug, page_size: pageSize, page_index: pageIndex })
//     console.log('allMyTokoProducts===>', allMyTokoProducts)
//     res.render('tokoonline/product-catalog', { title: 'Express', allMyTokoProducts, tokoSlug: req.params.tokoSlug })
//   } catch (err) {
//     console.log('err===>', err)
//     res.render('tokoonline/product-catalog', { title: 'Express', allMyTokoProducts: [], tokoSlug: req.params.tokoSlug })
//   }
// })
// router.get('/product-detail/:tokoSlug/:code', async function (req, res, next) {
//   const productDetail = await TokoProductService.getDetailDataByCode({ code: req.params.code })
//   console.log('productDetail===>', productDetail)

//   res.render('tokoonline/product-detail', { title: 'Express', data: productDetail.data_detail, tokoSlug: req.params.tokoSlug })
// })
// router.get('/shopping-cart/:tokoSlug', async function (req, res, next) {
//   console.log('req.cookies===>', req.cookies)
//   const sessionId = req.cookies['connect.sid']
//   // const sessionId = args.session_id || req.cookies.JSESSIONID
//   const listAllTokoCarts = await TokoCartService.fetchAllTokoCartsBySessionId({ session_id: sessionId })
//   console.log('listAllTokoCarts===>', listAllTokoCarts)
//   console.log('sessionId===>', sessionId)
//   res.render('tokoonline/shopping-cart', { title: 'Express', listAllTokoCarts, tokoSlug: req.params.tokoSlug })
// })
// router.get('/shopping-invoice/:tokoSlug/:tokoPoId', async function (req, res, next) {
//   console.log('req.cookies===>', req.cookies)
//   const sessionId = req.cookies['connect.sid']
//   // const sessionId = args.session_id || req.cookies.JSESSIONID
//   const detalDataTokoPo = await TokoPoService.fetchDetailTokoPo({ id: req.params.tokoPoId })
//   console.log('detalDataTokoPo===>', detalDataTokoPo)
//   console.log('sessionId===>', sessionId)
//   res.render('tokoonline/shopping-invoice', { title: 'Express', detalDataTokoPo: detalDataTokoPo || {}, tokoSlug: req.params.tokoSlug, dateTime: Moment().format('MMMM Do YYYY, h:mm:ss a') })
// })
router.all('/*', (req, res, next) => {
  res.render('backoffice/index', { title: 'Express' })
})

module.exports = router
