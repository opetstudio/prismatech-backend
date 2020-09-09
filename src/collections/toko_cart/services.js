const jwt = require('jsonwebtoken')
const config = require('config')
const _ = require('lodash')
const Manifest = require('./manifest')
const User = require('../user/Model')
const entity = Manifest.entity
const { path } = require('ramda')
const EntityModel = require('./Model')
const TokoProductModel = require('../toko_product/Model')
const TokoTokoOnlineModel = require('../toko_toko_online/Model')
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
    return { status: 400, error: err.message }
  }
}
const fetchAllDataBySessionId = async (args, context = {}) => {
  try {
    const filter = {}
    const $and = []
    console.log('context.req.sessionID=====>', context.req.sessionID)
    const sessionId = args.session_id || context.req.cookies['connect.sid'] || path(['req', 'cookies', 'JSESSIONID'], context)

    $and.push({ session_id: sessionId, status: 'open' })
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
    console.log('context.req.cookies========>', path(['req', 'cookies', 'connect.sid'], context))
    console.log('filter========>', filter)
    const result = await EntityModel.find(filter)
      .sort({ 'product_id.name': 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'product_id', populate: { path: 'image_id' } })
      .populate({ path: 'toko_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    const isNeedShippingArr = (result || []).map(v => v.product_id.isneed_shipping) // args.total_amount
    let isneedShipping = 'N'
    if (isNeedShippingArr.includes('Y')) isneedShipping = 'Y'
    const count = await EntityModel.countDocuments(filter)
    const pageCount = await Math.ceil(count / args.page_size)
    return { status: 200, success: 'Successfully get all Data', list_data: result, count, page_count: pageCount, is_need_shipping: isneedShipping }
  } catch (err) {
    console.log('err=> ', err)
    return { status: 400, error: err.message }
  }
}
const fetchDetailData = async (args, context) => {
  try {
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    const result = await EntityModel.findOne({ _id: args.id })
      .populate({ path: 'product_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    return { status: 200, success: 'Successfully get Data', data_detail: result }
  } catch (err) {
    return { status: 400, error: err.message }
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
    data.session_id = args.session_id || context.req.cookies['connect.sid']
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
    return { status: 400, error: err.message }
  }
}
const addToCart = async (args, context) => {
  const session = await EntityModel.db.startSession()
  session.startTransaction()
  try {
    const opts = { session }
    const now = Date.now()
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    // const userDetail = await User.findById(userId)
    console.log('args.product_id=>', args.product_id)
    console.log('args.toko_id=>', args.toko_id)
    const productDetail = await TokoProductModel.findById(args.product_id).populate({ path: 'toko_id' })
    if (!productDetail) throw new Error('Invalid Product')
    console.log('productDetail===>', productDetail)
    console.log('tokoId===>', args.toko_id)

    const tokoSlug = args.toko_slug
    let tokoId = args.toko_id
    let tokoDetail = {}
    if (_.isEmpty(tokoId)) {
      // get toko detail by toko slug
      tokoDetail = await TokoTokoOnlineModel.findOne({ slug: tokoSlug })
      tokoId = '' + tokoDetail._id
    }

    if (_.isEmpty(_.find(productDetail.toko_id, (o) => tokoId === '' + o._id))) throw new Error('Product Toko Id and Field Toko Id is not match')

    const data = args
    // data.created_by = userDetail._id
    // data.updated_by = userDetail._id
    const sessionId = args.session_id || context.req.cookies['connect.sid'] || path(['req', 'cookies', 'JSESSIONID'], context)
    data.session_id = sessionId
    data.created_at = now
    data.updated_at = now
    data.status = 'open'
    // console.log('dataCart====>', data)
    const set = {}
    let $inc
    if (!args.count) $inc = { count: 1, amount: productDetail.price }
    else data.amount = productDetail.price * args.count
    set.$set = data
    if ($inc) set.$inc = $inc

    const upsertResponse = await EntityModel.findOneAndUpdate(
      { product_id: args.product_id, session_id: data.session_id },
      set,
      { upsert: true, new: true })
      .populate({ path: 'product_id', populate: [{ path: 'image_id' }, { path: 'toko_id' }] })
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
    return { status: 400, error: err.message }
  }
}
const removeFromCart = async (args, context) => {
  const session = await EntityModel.db.startSession()
  session.startTransaction()
  try {
    const opts = { session }
    const now = Date.now()
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    // const userDetail = await User.findById(userId)

    const tokoSlug = args.toko_slug
    let tokoId = args.toko_id
    let tokoDetail = {}
    if (_.isEmpty(tokoId)) {
      // get toko detail by toko slug
      tokoDetail = await TokoTokoOnlineModel.findOne({ slug: tokoSlug })
      tokoId = '' + tokoDetail._id
    }

    const productDetail = await TokoProductModel.findById(args.product_id).populate({ path: 'toko_id' })
    if (!productDetail) throw new Error('Invalid Product')
    // console.log('productDetail===>', productDetail)
    // console.log('tokoId===>', args.toko_id)
    if (_.isEmpty(_.find(productDetail.toko_id, (o) => tokoId === '' + o._id))) throw new Error('Product Toko Id and Field Toko Id is not match')

    const data = args
    // data.created_by = userDetail._id
    // data.updated_by = userDetail._id
    const sessionId = args.session_id || context.req.cookies['connect.sid'] || path(['req', 'cookies', 'JSESSIONID'], context)
    data.session_id = sessionId
    data.created_at = now
    data.updated_at = now
    data.status = 'open'
    // console.log('dataCart====>', data)
    const set = {}
    let $inc
    if (!args.count) $inc = { count: -1, amount: -productDetail.price }
    else data.amount = productDetail.price * args.count
    set.$set = data
    if ($inc) set.$inc = $inc

    const cartDetail = await EntityModel.findOne({ product_id: args.product_id, session_id: data.session_id })
    console.log('cartDetail===>', cartDetail)
    if (cartDetail.count === 1) {
      // delete
      await EntityModel.deleteOne({ product_id: args.product_id, session_id: data.session_id }).session(session)
      await session.commitTransaction()
      session.endSession()
      return { status: 200, success: 'Successfully save Data', detail_data: {} }
    }

    const upsertResponse = await EntityModel.findOneAndUpdate(
      { product_id: args.product_id, session_id: data.session_id },
      set,
      { upsert: true, new: true })
      .populate({ path: 'product_id', populate: [{ path: 'image_id' }, { path: 'toko_id' }] })
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
    return { status: 400, error: err.message }
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
    const sessionId = args.session_id || context.req.cookies['connect.sid'] || path(['req', 'cookies', 'JSESSIONID'], context)
    data.session_id = sessionId
    data.updated_at = now
    console.log('update=> ', data)
    return { status: 200, success: 'Successfully save Data', detail_data: await EntityModel.findOneAndUpdate({ _id: args._id }, data).populate({ path: 'created_by' }).populate({ path: 'updated_by' }) }
  } catch (err) {
    console.log('errorrr====>', err)
    return { status: 400, error: err.message }
  }
}
const doDeleteData = async (args, context) => {
  const session = await EntityModel.db.startSession()
  session.startTransaction()
  const opts = { session }
  try {
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt
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
    return { status: 400, error: err.message }
  }
}

module.exports = {
  ['fetchAll' + entity + 'sBySessionId']: fetchAllDataBySessionId,
  ['fetchAll' + entity + 's']: fetchAllData,
  ['fetchDetail' + entity]: fetchDetailData,
  ['doCreate' + entity]: doCreateData,
  ['doUpdate' + entity]: doUpdateData,
  ['doDelete' + entity]: doDeleteData,
  addToCart,
  removeFromCart
}
