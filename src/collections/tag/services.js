const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const config = require('config')
const _ = require('lodash')
const Manifest = require('./manifest')
const User = require('../user/Model')
const entity = Manifest.entity
const EntityModel = require('./Model')
const fetchAllData = async (args, context) => {
  // console.log('args.page_size====>', args.page_size)
  try {
    const filter = {}
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt
    const $and = [{ user_id: ObjectId(userId) }]
    if (!_.isEmpty(args.string_to_search)) {
      filter.$and.push({
        $or: [
          { name: { $regex: args.string_to_search, $options: 'i' } }
        ]
      })
    }
    if (!_.isEmpty($and)) filter.$and = $and

    // console.log('filterrrrr======', filter)
    const result = await EntityModel.find(filter)
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    const count = await EntityModel.countDocuments(filter)
    const pageCount = await Math.ceil(count / args.page_size)
    // console.log('resultresultresult=>', result)
    return { status: 200, success: 'Successfully get all Data', list_data: result, count, page_count: pageCount }
  } catch (err) {
    // console.log('err=> ', err)
    return { status: 400, error: err.message }
  }
}
const fetchDetailData = async (args, context) => {
  try {
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt
    const result = await EntityModel.findOne({ _id: args.id })
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
    // console.log('createResponse====>', createResponse)
    await session.commitTransaction()
    session.endSession()
    return { status: 200, success: 'Successfully save Data', detail_data: createResponse }
  } catch (err) {
    // console.log('errorrr====>', err)
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
    // console.log('update=> ', data)
    return { status: 200, success: 'Successfully save Data', detail_data: await EntityModel.findOneAndUpdate({ _id: args._id }, data).populate({ path: 'created_by' }).populate({ path: 'updated_by' }) }
  } catch (err) {
    // console.log('errorrr====>', err)
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
    // console.log('delete invoked args=', args)
    // delete privilege
    const dataDetail = await EntityModel.findById(args._id).session(session)
    await dataDetail.deleteOne()
    await session.commitTransaction()
    session.endSession()
    return { status: 200, success: 'Successfully delete Data', detail_data: {} }
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    // console.log('errorrr====>', err)
    return { status: 400, error: err.message }
  }
}
const doUpsertData = async ({ tagIds, userId, session }) => {
  const now = Date.now()
  let result = tagIds
  console.log('tagIdstagIdstagIdstagIds===>', tagIds)
  // tagIds = [id, id, id, tag, tag]
  const listNewTag = ((tagIds || []).map(v => {
    if (!mongoose.Types.ObjectId.isValid(v)) return (v || '').toLowerCase()
    else return null
  })).filter(v => v !== null)
  // listNewTag = [tag, tag]
  console.log('listNewTaglistNewTaglistNewTaglistNewTag===>', listNewTag)
  if (!_.isEmpty(listNewTag)) {
    // existedListNewTag = [ tag-doc, tag-doc ]
    const existedListNewTag = await EntityModel.find({ name: { $in: listNewTag } })
    // existedListNewTagName = [ tag, tag ]
    const existedListNewTagName = existedListNewTag.map(v => v.name)
    await EntityModel.updateMany({ name: { $in: listNewTag } }, { $addToSet: { user_id: userId } }, { session })
    console.log('existedListNewTagNameexistedListNewTagName=>', existedListNewTagName)
    // createListNewTag = listNewTag - existedListNewTagName
    // createListNewTag = []
    const createListNewTag = listNewTag.filter(n => !existedListNewTagName.includes(n))
    console.log('createListNewTag===>', createListNewTag)
    if (!_.isEmpty(createListNewTag)) {
      // dataListNewTag[new-tag-doc, new-tag-doc]
      const dataListNewTag = createListNewTag.map(v => ({
        user_id: [userId],
        name: v,
        created_by: userId,
        updated_by: userId,
        created_at: now,
        updated_at: now
      }))
      // console.log('dataListNewTag===>', dataListNewTag)
      const createNewTagResponse = await EntityModel.create(dataListNewTag, { session })
      console.log('createNewTagResponse===>', createNewTagResponse)
      const indexed = {}
      // createNewTagResponse = [new-tag-doc, new-tag-doc]
      createNewTagResponse.forEach((v, i) => {
        indexed[v.name] = v._id
      })
      // const dTemp = createNewTagResponse.map(v => ({ [v.name]: '' + v._id }))
      // indexed = { tag: id, tag: id }
      console.log('indexedindexed===>', indexed)
      result = (result || []).map(tagId => {
        if (indexed[tagId]) return indexed[tagId]
        else return tagId
      })
      console.log('tagIds => ', tagIds)
    } else {
      const indexed = {}
      existedListNewTag.forEach((v, i) => {
        indexed[v.name] = v._id
      })
      result = (result || []).map(tagId => {
        if (indexed[tagId]) return indexed[tagId]
        else return tagId
      })
    }
  }
  return result
}

module.exports = {
  ['fetchAll' + entity + 's']: fetchAllData,
  ['fetchDetail' + entity]: fetchDetailData,
  ['doCreate' + entity]: doCreateData,
  ['doUpdate' + entity]: doUpdateData,
  ['doDelete' + entity]: doDeleteData,
  doUpsertData
}
