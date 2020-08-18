const jwt = require('jsonwebtoken')
const config = require('config')
const _ = require('lodash')
const Manifest = require('./manifest')
const User = require('../user/Model')
const entity = Manifest.entity
const EntityModel = require('./Model')
const TokoProductModel = require('../toko_product/Model')
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
    const sessionId = args.session_id || context.req.cookies.JSESSIONID
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
    data.session_id = args.session_id || context.req.cookies.JSESSIONID
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

    const productDetail = await TokoProductModel.findById(args.product_id).populate({ path: 'toko_id' })
    if (!productDetail) throw new Error('Invalid Product')
    // console.log('productDetail===>', productDetail)
    // console.log('tokoId===>', args.toko_id)
    if (_.isEmpty(_.find(productDetail.toko_id, (o) => args.toko_id === '' + o._id))) throw new Error('Product Toko Id and Field Toko Id is not match')

    const data = args
    // data.created_by = userDetail._id
    // data.updated_by = userDetail._id
    data.session_id = args.session_id || context.req.cookies.JSESSIONID
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
  addToCart
}
