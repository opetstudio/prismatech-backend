const jwt = require('jsonwebtoken')
const config = require('config')
const request = require('request')
const { path } = require('ramda')
// var http = require('http')
// var querystring = require('querystring')
const _ = require('lodash')
const Manifest = require('./manifest')
const User = require('../user/Model')
const entity = Manifest.entity
const EntityModel = require('./Model')
const TokoProductModel = require('../toko_product/Model')
const TokoCartModel = require('../toko_cart/Model')
const TokoTokoOnlineModel = require('../toko_toko_online/Model')
const { PostCode } = require('../../utils/services')
// import { create } from 'apisauce'
const Apisauce = require('apisauce')
const fetchAllData = async (args, context) => {
  try {
    const filter = {}
    const $and = []
    if (!_.isEmpty($and)) filter.$and = $and
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    // if (!_.isEmpty(args.string_to_search)) {
    //   filter.$and.push({
    //     $or: [
    //       { name: { $regex: args.string_to_search, $options: 'i' } }
    //     ]
    //   })
    // }
    const result = await EntityModel.find(filter)
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'product_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    const count = await EntityModel.countDocuments(filter)
    const pageCount = await Math.ceil(count / args.page_size)
    return { status: 200, success: 'Successfully get all Data', list_data: result, count, page_count: pageCount }
  } catch (err) {
    console.log('err=> ', err)
    return { status: 400, error: err }
  }
}
const fetchAllDataBySessionId = async (args, context) => {
  try {
    const filter = {}
    const $and = []
    const sessionId = args.session_id || context.req.cookies['connect.sid'] || path(['req', 'cookies', 'JSESSIONID'], context)
    $and.push({ session_id: sessionId })
    if (!_.isEmpty($and)) filter.$and = $and
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    // if (!_.isEmpty(args.string_to_search)) {
    //   filter.$and.push({
    //     $or: [
    //       { name: { $regex: args.string_to_search, $options: 'i' } }
    //     ]
    //   })
    // }
    const result = await EntityModel.find(filter)
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'cart_id', populate: { path: 'product_id' } })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    const count = await EntityModel.countDocuments(filter)
    const pageCount = await Math.ceil(count / args.page_size)
    return { status: 200, success: 'Successfully get all Data', list_data: result, count, page_count: pageCount }
  } catch (err) {
    console.log('err=> ', err)
    return { status: 400, error: err }
  }
}
const fetchDetailData = async (args, context) => {
  try {
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    const result = await EntityModel.findOne({ _id: args.id })
      .populate({ path: 'cart_id', populate: { path: 'product_id' } })
      .populate({ path: 'toko_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    return { status: 200, success: 'Successfully get Data', data_detail: result }
  } catch (err) {
    return { status: 400, error: err }
  }
}
const getDetailDataBySessionId = async (args, context) => {
  try {
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    const sessionId = args.session_id || context.req.cookies['connect.sid'] || path(['req', 'cookies', 'JSESSIONID'], context)
    const result = await EntityModel.findOne({ session_id: sessionId })
      .populate({ path: 'cart_id', populate: { path: 'product_id' } })
      .populate({ path: 'toko_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    return { status: 200, success: 'Successfully get Data', data_detail: result }
  } catch (err) {
    return { status: 400, error: err }
  }
}
const doCreateData = async (args, context) => {
  const session = await EntityModel.db.startSession()
  session.startTransaction()
  try {
    const opts = { session }
    const now = Date.now()
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    // const userDetail = await User.findById(userId)

    const productDetail = await TokoProductModel.findById(args.product_id)
    if (!productDetail) throw new Error('Invalid Product')

    const data = args
    // data.created_by = userDetail._id
    // data.updated_by = userDetail._id
    data.session_id = args.session_id || context.req.cookies['connect.sid'] || path(['req', 'cookies', 'JSESSIONID'], context)
    data.created_at = now
    data.updated_at = now
    console.log('dataCart====>', data)

    const set = {}
    set.$set = data
    if (!args.count) set.$inc = { count: 1 }

    const upsertResponse = await EntityModel.findOneAndUpdate(
      { product_id: args.product_id, session_id: data.session_id },
      set,
      { upsert: true, new: true })
      .populate({ path: 'product_id', populate: { path: 'image_id' } })
      .populate({ path: 'toko_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' }).session(opts.session)
    console.log('upsertResponse====>', upsertResponse)

    await session.commitTransaction()
    session.endSession()
    return { status: 200, success: 'Successfully save Data', detail_data: upsertResponse }
  } catch (err) {
    console.log('errorrr====>', err)
    await session.abortTransaction()
    session.endSession()
    return { status: 400, error: err }
  }
}
const checkoutProcess = async (args, context) => {
  const session = await EntityModel.db.startSession()
  session.startTransaction()
  try {
    const opts = { session }
    const now = Date.now()
    const { accesstoken } = context.req.headers
    let myUserId
    try {
      const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
      const { user_id: userId } = bodyAt
      myUserId = userId
    } catch (e) {

    }
    const sessionId = args.session_id || context.req.cookies['connect.sid'] || path(['req', 'cookies', 'JSESSIONID'], context)

    // const userDetail = await User.findById(userId)
    const tokoSlug = args.toko_slug
    let tokoId = args.toko_id
    let tokoDetail = {}
    if (_.isEmpty(tokoId)) {
      // get toko detail by toko slug
      tokoDetail = await TokoTokoOnlineModel.findOne({ slug: tokoSlug })
      tokoId = '' + tokoDetail._id
    }

    // get all cart
    const allOpenCart = await TokoCartModel.find({ session_id: sessionId, toko_id: tokoId, status: 'open' })
    if (_.isEmpty(allOpenCart)) throw new Error('Checkout Failed. The cart is empty')
    console.log('allOpenCart===>', allOpenCart)

    const totalProductAmount = allOpenCart.map(v => v.amount).reduce((a, b) => a + b, 0) // args.total_amount
    console.log('totalProductAmount===>', totalProductAmount)

    const dataPo = {}
    dataPo.full_name = args.full_name
    dataPo.phone_number = args.phone_number
    dataPo.email = args.email
    dataPo.session_id = sessionId
    dataPo.device_id = args.device_id
    dataPo.shipping_address = args.shipping_address
    dataPo.shipping_amount = args.shipping_amount
    dataPo.total_product_amount = totalProductAmount
    dataPo.total_amount = totalProductAmount
    if (!_.isEmpty(args.shipping_amount)) {
      dataPo.total_amount = totalProductAmount + args.shipping_amount // args.total_amount
      dataPo.shipping_amount = args.shipping_amount
    }
    dataPo.cart_id = allOpenCart.map(v => '' + v._id)
    dataPo.toko_id = tokoId
    if (myUserId) dataPo.user_id = myUserId
    dataPo.action = 'checkoutProcess'
    dataPo.invoice_code = '' + now
    dataPo.created_at = now
    dataPo.updated_at = now
    dataPo.created_by = myUserId || null
    dataPo.updated_by = myUserId || null

    // const createTokoPoResponse = await EntityModel.create([dataPo], opts)[0]
    // console.log('createTokoPoResponse===>', createTokoPoResponse)

    // if (!createTokoPoResponse) throw new Error('Checkout Failed.')

    const set = {}
    set.$set = dataPo
    // if (!args.count) set.$inc = { count: 1 }
    console.log('set===>', set)

    // validate product & toko id
    const upsertResponse = await EntityModel.findOneAndUpdate(
      { session_id: dataPo.session_id, toko_id: dataPo.toko_id },
      set,
      { upsert: true, new: true })
      .populate({ path: 'cart_id', populate: { path: 'product_id', populate: { path: 'image_id' } } })
      .populate({ path: 'toko_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' }).session(opts.session)
    console.log('upsertResponse====>', upsertResponse)
    if (!upsertResponse) throw new Error('Checkout Failed.')

    await session.commitTransaction()
    session.endSession()
    return { status: 200, success: 'Successfully save Data', detail_data: upsertResponse }
  } catch (err) {
    console.log('errorrr====>', err)
    await session.abortTransaction()
    session.endSession()
    return { status: 400, error: err }
  }
}
const paymentProcess = async (args, context) => {
  // const session = await EntityModel.db.startSession()
  // session.startTransaction()
  try {
    // const opts = { session }
    const now = Date.now()
    // const { accesstoken } = context.req.headers
    let myUserId
    try {
      // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
      // const { user_id: userId } = bodyAt
      // myUserId = userId
    } catch (e) {

    }

    // toko po detail
    const tokoPoDetail = await EntityModel.findOne({ _id: args._id, session_id: args.session_id })
    if (_.isEmpty(tokoPoDetail)) throw new Error('Purchase Failed.')

    var bodyHit = {
      transmission_date_time: '2019-10-09 08:24:57.100 +0700',
      merchant_key_id: '6d422ec3-87de-4234-b583-95f23a6a6cbf',
      merchant_id: '000000070070070',
      merchant_ref_no: 'ctrtesttrx001165',
      backend_callback_url: '',
      frontend_callback_url: '',

      user_id: 'endahparamita@gmail.com',
      user_contact: '0812345611',
      user_name: 'endah paramita',
      user_email: 'endahparamita@gmail.com',

      fds_user_device_id: 351757111290115,
      fds_user_ip_address: '127.0.0.1',
      fds_product_details: '[{"item_code":"kaosdnm","item_title":"kaos denim","quantity":2,"total":"2000", "currency": "IDR"},{"item_code":"sptadds","item_title":"sepatu adidas copa","quantity":4,"total":"10013", "currency": "IDR"}]',
      fds_shipping_details: '{"address":"jl.sanusi","telephoneNumber":"089634679074","handphoneNumber":"089634679074"}',

      transaction_amount: 12025,
      transaction_date_time: '2019-10-09 08:24:57.100 +0700',
      transaction_description: '[{"period": "August 2019"}, {"productCode": "125"}, {"description": "belanja bulanan"}]'
    }

    // define the api
    const api = Apisauce.create({
      baseURL: config.get('debitinPaymentPageBackendBaseUrl'),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        xsrfCookieName: 'myCatx',
        timeout: 10000,
        mac: '9b2d04b37ef3bd9a4be37447f173da0ab07ff0d523bb49bb8d082298e745c767',
        channelid: 'WEB'
      }
    })

    // start making calls
    // api
    //   .get('/repos/skellock/apisauce/commits')
    //   .then(response => response.data[0].commit.message)
    //   .then(console.log)

    // customizing headers per-request
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = await api.post('/generatetransaction', bodyHit)
    // console.log('resp.originalError====>', resp.originalError)
    // console.log('resp.response====>', resp.response)
    console.log('resp.duration====>', resp.duration)
    console.log('resp.problem====>', resp.problem)
    console.log('resp.status====>', resp.status)
    console.log('resp.ok====>', resp.ok)
    console.log('resp.data====>', resp.data)
    // console.log('resp====>', resp)
    if (!resp.ok) throw new Error('' + resp.problem)

    // get all cart
    // const allOpenCart = await TokoCartModel.find({ session_id: args.session_id, toko_id: args.toko_id, status: 'open' })
    // if (_.isEmpty(allOpenCart)) throw new Error('Checkout Failed. The cart is empty')

    // const totalProductAmount = allOpenCart.map(v => v.amount).reduce((a, b) => a + b, 0) // args.total_amount

    // const dataPo = {}
    // dataPo.full_name = args.full_name
    // dataPo.phone_number = args.phone_number
    // dataPo.email = args.email
    // dataPo.session_id = args.session_id
    // dataPo.device_id = args.device_id
    // dataPo.shipping_address = args.shipping_address
    // dataPo.total_product_amount = totalProductAmount
    // dataPo.total_amount = totalProductAmount + args.shipping_amount // args.total_amount
    // dataPo.shipping_amount = args.shipping_amount
    // dataPo.cart_id = allOpenCart.map(v => '' + v._id)
    // dataPo.toko_id = args.toko_id
    // if (myUserId) dataPo.user_id = myUserId
    // dataPo.created_at = now
    // dataPo.updated_at = now
    // dataPo.created_by = myUserId || null
    // dataPo.updated_by = myUserId || null

    // // const createTokoPoResponse = await EntityModel.create([dataPo], opts)[0]
    // // console.log('createTokoPoResponse===>', createTokoPoResponse)

    // // if (!createTokoPoResponse) throw new Error('Checkout Failed.')

    // const set = {}
    // set.$set = dataPo
    // // if (!args.count) set.$inc = { count: 1 }

    // validate product & toko id
    // const upsertResponse = await EntityModel.findOneAndUpdate(
    //   { _id: args._id, session_id: args.session_id },
    //   { action: 'paymentProcess' })
    //   .populate({ path: 'cart_id', populate: { path: 'product_id', populate: { path: 'image_id' } } })
    //   .populate({ path: 'toko_id' })
    //   .populate({ path: 'created_by' })
    //   .populate({ path: 'updated_by' }).session(opts.session)
    // console.log('upsertResponse====>', upsertResponse)
    // if (!upsertResponse) throw new Error('Checkout Failed.')

    // await session.commitTransaction()
    // session.endSession()
    console.log('return response ', resp.data)
    return { status: 200, success: 'Successfully save Data', payment_page_url: resp.data.url }
  } catch (err) {
    console.log('errorrr====>', err)
    // await session.abortTransaction()
    // session.endSession()
    return { status: 400, error: err }
  }
}
const doUpdateData = async (args, context) => {
  try {
    const now = Date.now()
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    // const userDetail = await User.findById(userId)
    const data = args
    // data.created_by = userDetail._id
    // data.updated_by = userDetail._id
    // data.created_at = now
    data.session_id = context.req.sessionID
    data.updated_at = now
    console.log('update=> ', data)
    return { status: 200, success: 'Successfully save Data', detail_data: await EntityModel.findOneAndUpdate({ _id: args._id }, data).populate({ path: 'created_by' }).populate({ path: 'updated_by' }) }
  } catch (err) {
    console.log('errorrr====>', err)
    return { status: 400, error: err }
  }
}
const doDeleteData = async (args, context) => {
  const session = await EntityModel.db.startSession()
  session.startTransaction()
  const opts = { session }
  try {
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    console.log('delete invoked args=', args)
    const sessionId = context.req.sessionID
    // delete privilege
    const dataDetail = await EntityModel.findOne({ _id: args._id, session_id: sessionId }).session(session)
    await dataDetail.deleteOne()
    await session.commitTransaction()
    session.endSession()
    return { status: 200, success: 'Successfully delete Data', detail_data: {} }
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    console.log('errorrr====>', err)
    return { status: 400, error: err }
  }
}

module.exports = {
  ['fetchAll' + entity + 'sBySessionId']: fetchAllDataBySessionId,
  ['fetchAll' + entity + 's']: fetchAllData,
  ['fetchDetail' + entity]: fetchDetailData,
  ['doCreate' + entity]: doCreateData,
  ['doUpdate' + entity]: doUpdateData,
  ['doDelete' + entity]: doDeleteData,
  checkoutProcess,
  paymentProcess,
  getDetailDataBySessionId
}
