const jwt = require('jsonwebtoken')
const config = require('config')
const _ = require('lodash')
const Manifest = require('./manifest')
const User = require('../user/Model')
const entity = Manifest.entity
const EntityModel = require('./Model')
const TokoTeamModel = require('../toko_team/Model')
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
          { name: { $regex: args.string_to_search, $options: 'i' } },
          // { code: { $regex: args.string_to_search, $options: 'i' } },
          // { description: { $regex: args.string_to_search, $options: 'i' } }
        ]
      })
    }
    let isEligible = true
    let $or = []
    // check authorization
    // daftar toko yang anggota team nya termasuk user_id saya, dan toko yang owner nya adalah user_id saya
    const myListToko = await TokoTeamModel.find({ user_id: userId })
    if (myListToko) {
      console.log('myListToko=>', myListToko)
      $or = myListToko.map(v => ({ _id: '' + v.toko_id }))
      $or.push({ owner: userId })
    }
    // daftar toko yang created_by nya adalah user_id saya
    $or.push({ created_by: userId })
    if (!_.isEmpty($or)) {
      filter.$and.push({
        $or: $or
      })
    } else {
      isEligible = false
    }

    if (!isEligible) return { status: 200, success: 'Successfully get all Data', list_data: [], count: 0, page_count: 0 }

    const result = await EntityModel.find(filter)
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'owner' })
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
    let isEligible = true
    let $or = []
    const myListToko = await TokoTeamModel.find({ user_id: userId })
    if (myListToko) {
      console.log('myListToko=>', myListToko)
      $or = myListToko.map(v => ({ _id: '' + v.toko_id }))
      $or.push({ owner: userId })
      filter.$and.push({
        $or: $or
      })
    }
    // daftar toko yang created_by nya adalah user_id saya
    $or.push({ created_by: userId })
    if (!_.isEmpty($or)) {
      filter.$and.push({
        $or: $or
      })
    } else {
      isEligible = false
    }

    if (!isEligible) return { status: 200, success: 'Successfully get Data', data_detail: {} }

    const result = await EntityModel.findOne(filter)
      .populate({ path: 'owner' })
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
    let userDetailOwner
    // setup owner
    if (_.isEmpty(args.owner_email)) {
      data.owner = userDetail._id
      userDetailOwner = userDetail
    } else {
      // hanya privilege FIELD-TOKO-OWNER-EMAIL yang bole submit field toko owner email validasinya ada di authorizationFilter.js
      // get detail owner
      userDetailOwner = await User.findOne({ email: args.owner_email })
      data.owner = userDetailOwner._id
    }
    data.created_by = userDetail._id
    data.updated_by = userDetail._id
    data.created_at = now
    data.updated_at = now

    if (_.isEmpty(userDetailOwner)) throw new Error('Email dari pemilik toko, belum terdaftar.')

    if (!_.isEmpty(data.name)) data.slug = (data.name || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    const createResponse = (await EntityModel.create([data], opts))[0]
    console.log('createResponse====>', createResponse)

    // add a team members
    const teamMemberData = {}
    teamMemberData.user_id = userDetailOwner._id
    teamMemberData.toko_id = createResponse._id
    // role as Admin Merchant Tokoonline
    teamMemberData.role_id = '5f32230d88b5e341d08db535'
    teamMemberData.created_by = userDetailOwner._id
    teamMemberData.updated_by = userDetailOwner._id
    teamMemberData.created_at = now
    teamMemberData.updated_at = now
    const createTeamResponse = (await TokoTeamModel.create([teamMemberData], opts))[0]
    console.log('createTeamResponse====>', createTeamResponse)

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
    let userDetailOwner
    // setup owner
    if (_.isEmpty(args.owner_email)) {
      data.owner = userDetail._id
      userDetailOwner = userDetail
    } else {
      // hanya privilege FIELD-TOKO-OWNER-EMAIL yang bole submit field toko owner email validasinya ada di authorizationFilter.js
      // get detail owner
      userDetailOwner = await User.findOne({ email: args.owner_email })
      data.owner = userDetailOwner._id
    }
    if (_.isEmpty(userDetailOwner)) throw new Error('Email dari pemilik toko, belum terdaftar.')

    // data.created_by = userDetail._id
    data.updated_by = userDetail._id
    // data.created_at = now
    data.updated_at = now
    if (!_.isEmpty(data.name)) data.slug = (data.name || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
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
  ['doDelete' + entity]: doDeleteData
}
