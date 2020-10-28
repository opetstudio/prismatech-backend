const jwt = require('jsonwebtoken')
const config = require('config')
const _ = require('lodash')
const Manifest = require('./manifest')
const User = require('../user/Model')
const entity = Manifest.entity
const EntityModel = require('./Model')
const TokoTeamModel = require('../toko_team/Model')
const TokoTokoOnlineModel = require('../toko_toko_online/Model')
const fetchAllData = async (args, context) => {
  try {
    const filter = {}
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt
    filter.$and = []
    if (!_.isEmpty(args.string_to_search)) {
      filter.$and.push({
        $or: [
          { title: { $regex: args.string_to_search, $options: 'i' } }
        ]
      })
    }

    // check authorization
    let isEligible = false
    const $or = []
    $or.push({ created_by: userId })
    const myListToko = await TokoTeamModel.find({ user_id: userId })
    if (myListToko) {
      console.log('myListToko=>', myListToko)
      myListToko.forEach(v => {
        $or.push({ toko_id: '' + v.toko_id })
      })
      isEligible = true
    }
    const myOwnListToko = await TokoTokoOnlineModel.find({ owner: userId })
    if (myOwnListToko) {
      myOwnListToko.forEach(v => {
        $or.push({ toko_id: '' + v._id })
      })
      isEligible = true
    }
    if (!_.isEmpty($or)) {
      filter.$and.push({
        $or: $or
      })
    }
    if (_.isEmpty(filter.$and)) isEligible = false
    if (!isEligible) return { status: 200, success: 'Successfully get all Data', list_data: [], count: 0, page_count: 0 }

    const result = await EntityModel.find(filter)
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'parent_id' })
      .populate({ path: 'toko_id' })
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
const getAllDataByTokoId = async (args, context) => {
  try {
    const filter = { toko_id: args.toko_id }
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    // if (!_.isEmpty(args.string_to_search)) {
    //   filter.$and = []
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
      .populate({ path: 'parent_id' })
      .populate({ path: 'toko_id' })
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
const fetchDetailData = async (args, context) => {
  try {
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt

    const filter = {}
    filter.$and = []
    filter.$and.push({ _id: args.id })

    // check authorization
    let isEligible = false
    const $or = []
    const myListToko = await TokoTeamModel.find({ user_id: userId })
    if (myListToko) {
      console.log('myListToko=>', myListToko)
      myListToko.forEach(v => {
        $or.push({ toko_id: '' + v.toko_id })
      })
      isEligible = true
    }
    const myOwnListToko = await TokoTokoOnlineModel.find({ owner: userId })
    if (myOwnListToko) {
      myOwnListToko.forEach(v => {
        $or.push({ toko_id: '' + v._id })
      })
      isEligible = true
    }
    if (!_.isEmpty($or)) {
      filter.$and.push({
        $or: $or
      })
    }
    if (!isEligible) return { status: 200, success: 'Successfully get Data', data_detail: {} }

    const result = await EntityModel.findOne({ _id: args.id })
      .populate({ path: 'parent_id' })
      .populate({ path: 'toko_id' })
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
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt
    const userDetail = await User.findById(userId)
    const data = args
    data.created_by = userDetail._id
    data.updated_by = userDetail._id
    data.created_at = now
    data.updated_at = now
    const createResponse = (await EntityModel.create([data], opts))[0]
    console.log('createResponse====>', createResponse)
    await session.commitTransaction()
    session.endSession()
    return { status: 200, success: 'Successfully save Data', detail_data: createResponse }
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
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt
    const userDetail = await User.findById(userId)
    const data = args
    // data.created_by = userDetail._id
    data.updated_by = userDetail._id
    // data.created_at = now
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
    // delete privilege
    const dataDetail = await EntityModel.findById(args._id).session(session)
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
  ['fetchAll' + entity + 's']: fetchAllData,
  ['fetchDetail' + entity]: fetchDetailData,
  ['doCreate' + entity]: doCreateData,
  ['doUpdate' + entity]: doUpdateData,
  ['doDelete' + entity]: doDeleteData,
  getAllDataByTokoId
}
