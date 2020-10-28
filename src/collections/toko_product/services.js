const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const config = require('config')
const _ = require('lodash')
const { flatten } = require('../../../src/utils/services')
const Manifest = require('./manifest')
const User = require('../user/Model')
const entity = Manifest.entity
const EntityModel = require('./Model')
const TagModel = require('../tag/Model')
const TokoTeamModel = require('../toko_team/Model')
const TokoCartModel = require('../toko_cart/Model')
const TokoTokoOnlineModel = require('../toko_toko_online/Model')
const fetchAllData = async (args, context) => {
  try {
    const filter = {}
    filter.$and = []
    const $or = []
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt
    if (!_.isEmpty(args.string_to_search)) {
      $or.push({ title: { $regex: args.string_to_search, $options: 'i' } })
      $or.push({ code: { $regex: args.string_to_search, $options: 'i' } })
      $or.push({ description: { $regex: args.string_to_search, $options: 'i' } })
      // filter.$and.push()
    }

    

    // check authorization
    // let isEligible = false
    // const $or = []
    // const myListToko = await TokoTeamModel.find({ user_id: userId })
    // if (myListToko) {
    //   console.log('myListToko=>', myListToko)
    //   myListToko.forEach(v => {
    //     $or.push({ toko_id: '' + v.toko_id })
    //   })
    //   isEligible = true
    // }
    // const myOwnListToko = await TokoTokoOnlineModel.find({ owner: userId })
    const myOwnListToko = await getAllMyEligibleToko({ userId })
    if (myOwnListToko) {
      myOwnListToko.forEach(v => {
        $or.push({ toko_id: '' + v._id })
      })
      // isEligible = true
    }
    $or.push({ created_by: userId })
    if (!_.isEmpty($or)) {
      filter.$and.push({
        $or: $or
      })
    }
    // if (_.isEmpty(filter.$and)) isEligible = false
    // if (!isEligible) return { status: 200, success: 'Successfully get all Data', list_data: [], count: 0, page_count: 0 }

    const result = await EntityModel.find(filter)
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'image_id' })
      .populate({ path: 'category_id' })
      .populate({ path: 'tag_id' })
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
    if (!_.isEmpty(args.string_to_search)) {
      // filter.$and = []
      // filter.$and.push({
      //   $or: [
      //     { title: { $regex: args.string_to_search, $options: 'i' } },
      //     { code: { $regex: args.string_to_search, $options: 'i' } },
      //     { description: { $regex: args.string_to_search, $options: 'i' } }
      //   ]
      // })
    }
    const result = await EntityModel.find(filter)
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'image_id' })
      .populate({ path: 'category_id' })
      .populate({ path: 'tag_id' })
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
const getAllDataByTokoSlug = async (args, context) => {
  try {
    const tokoDetail = await TokoTokoOnlineModel.findOne({ slug: args.toko_slug })
    const filter = { toko_id: '' + tokoDetail._id }
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    if (!_.isEmpty(args.string_to_search)) {
      // filter.$and = []
      // filter.$and.push({
      //   $or: [
      //     { title: { $regex: args.string_to_search, $options: 'i' } },
      //     { code: { $regex: args.string_to_search, $options: 'i' } },
      //     { description: { $regex: args.string_to_search, $options: 'i' } }
      //   ]
      // })
    }
    const result = await EntityModel.find(filter)
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'image_id' })
      .populate({ path: 'category_id' })
      .populate({ path: 'tag_id' })
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
const getAllDataByCategoryId = async (args, context) => {
  try {
    const filter = {}
    // const { accesstoken } = context.req.headers
    // const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    // const { user_id: userId } = bodyAt
    if (!_.isEmpty(args.string_to_search)) {
      // filter.$and = []
      // filter.$and.push({
      //   $or: [
      //     { title: { $regex: args.string_to_search, $options: 'i' } },
      //     { code: { $regex: args.string_to_search, $options: 'i' } },
      //     { description: { $regex: args.string_to_search, $options: 'i' } }
      //   ]
      // })
    }
    const result = await EntityModel.find({ category_id: args.category_id })
      .sort({ updated_at: 'desc' })
      .skip(args.page_index * args.page_size)
      .limit(args.page_size)
      .populate({ path: 'image_id' })
      .populate({ path: 'category_id' })
      .populate({ path: 'tag_id' })
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
const getDetailDataByCode = async (args, context) => {
  try {
    const result = await EntityModel.findOne({ code: args.code })
      .populate({ path: 'image_id' })
      .populate({ path: 'category_id' })
      .populate({ path: 'tag_id' })
      .populate({ path: 'toko_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    return { status: 200, success: 'Successfully get Data', data_detail: result }
  } catch (err) {
    return { status: 400, error: err.message }
  }
}
const getDetailDataJoinCartByCode = async (args, context) => {
  try {
    const result = await EntityModel.findOne({ code: args.code })
      .populate({ path: 'image_id' })
      .populate({ path: 'category_id' })
      .populate({ path: 'tag_id' })
      .populate({ path: 'toko_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })
    let productDetailInCart = {}
    if (!_.isEmpty(result)) {
      // select product from cart by session_id
      const sessionId = args.session_id
      productDetailInCart = await TokoCartModel.findOne({ session_id: sessionId, product_id: '' + result._id }).populate({ path: 'product_id' }).populate({ path: 'toko_id' })
    }
    return { status: 200, success: 'Successfully get Data', data_detail: result, data_detail_in_cart: productDetailInCart }
  } catch (err) {
    return { status: 400, error: err.message }
  }
}
const fetchDetailData = async (args, context) => {
  try {
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt

    // filter.$and = []
    // filter.$and.push({ _id: args.id })
    // check authorization
    // let isEligible = false
    // const $or = []
    // const myListToko = await TokoTeamModel.find({ user_id: userId })
    // if (myListToko) {
    //   console.log('myListToko=>', myListToko)
    //   myListToko.forEach(v => {
    //     $or.push({ toko_id: '' + v.toko_id })
    //   })
    //   isEligible = true
    // }
    // const myOwnListToko = await TokoTokoOnlineModel.find({ owner: userId })
    // if (myOwnListToko) {
    //   myOwnListToko.forEach(v => {
    //     $or.push({ toko_id: '' + v._id })
    //   })
    //   isEligible = true
    // }
    // if (!_.isEmpty($or)) {
    //   filter.$and.push({
    //     $or: $or
    //   })
    // }
    // if (!isEligible) return { status: 200, success: 'Successfully get Data', data_detail: {} }
    const filter = {}
    filter.$and = []
    const $or = []
    const myOwnListToko = await getAllMyEligibleToko({ userId })
    if (myOwnListToko) {
      myOwnListToko.forEach(v => {
        $or.push({ toko_id: '' + v._id })
      })
    }
    $or.push({ created_by: userId })
    if (!_.isEmpty($or)) {
      filter.$and.push({
        $or: $or
      })
    }
    filter.$and.push({ _id: args.id })

    const result = await EntityModel.findOne(filter)
    // const result = await EntityModel.findOne({ _id: args.id })
      .populate({ path: 'image_id' })
      .populate({ path: 'category_id' })
      .populate({ path: 'tag_id' })
      .populate({ path: 'toko_id' })
      .populate({ path: 'created_by' })
      .populate({ path: 'updated_by' })

    if (_.isEmpty(result)) throw new Error('Data tidak ditemukan')

    return { status: 200, success: 'Successfully get Data', data_detail: result }
  } catch (err) {
    // return { status: 400, error: err.message }
    throw new Error(err.message)
  }
}
const getAllMyEligibleToko = async ({ userId }) => {
  const filter = {}
  // let isEligible = true
  let $or = []
  const myListToko = await TokoTeamModel.find({ user_id: userId })
  if (myListToko) {
    console.log('myListToko=>', myListToko)
    $or = myListToko.map(v => ({ _id: '' + v.toko_id }))
    $or.push({ owner: userId })
  }
  // daftar toko yang created_by nya adalah user_id saya
  $or.push({ created_by: userId })
  filter.$and = []
  filter.$and.push({
    $or: $or
  })
  const myOwnListToko = await TokoTokoOnlineModel.find(filter)
  // if (_.isEmpty(myOwnListToko)) isEligible = false
  // else {
  //   const myOwnListTokoId = myOwnListToko.map(v => '' + v._id)
  //   args.toko_id || [].forEach(v => {
  //     if (!myOwnListTokoId.includes('' + v)) isEligible = false
  //     if (!isEligible) return true
  //   })
  // }
  return myOwnListToko
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
    const tagIdList = []
    if (!_.isEmpty(args.tag_id)) {
      const needToCreateTag = []
      args.tag_id.forEach(v => {
        if (!ObjectId.isValid(v)) needToCreateTag.push(v)
        else tagIdList.push(v)
      })

      // const existedTag = await TagModel.find({ _id: { $in: args.tag_id } })
      // const listNewTag = (args.tag_id).filter(n => !(existedTag.map(v => '' + v._id)).includes(n))
      if (!_.isEmpty(needToCreateTag)) {
        const dataListNewTag = needToCreateTag.map(v => ({
          name: v,
          created_by: userDetail._id,
          updated_by: userDetail._id,
          created_at: now,
          updated_at: now
        }))
        // console.log('dataListNewTag====>', dataListNewTag)
        const createNewTagResponse = await TagModel.create(dataListNewTag, opts)
        // console.log('createNewTagResponse => ', createNewTagResponse)
        createNewTagResponse.forEach(v => {
          tagIdList.push('' + v._id)
        })
      }
    }

    // check authorization
    // let isEligible = true
    // let $or = []
    // const myListToko = await TokoTeamModel.find({ user_id: userId })
    // if (myListToko) {
    //   console.log('myListToko=>', myListToko)
    //   myListToko.forEach(v => {
    //     if ((args.toko_id || []).includes('' + v.toko_id)) isEligible = true
    //     if (isEligible) return true
    //   })
    // }
    // const myOwnListToko = await TokoTokoOnlineModel.find({ owner: userId })
    // if (myOwnListToko) {
    //   myOwnListToko.forEach(v => {
    //     if ((args.toko_id || []).includes('' + v._id)) isEligible = true
    //     if (isEligible) return true
    //   })
    // }
    // if (!isEligible) throw new Error('Data toko masih salah. Periksa kembali toko yang anda pilih.')


    // const filter = {}
    let isEligible = true
    // let $or = []
    // // check authorization
    // // daftar toko yang anggota team nya termasuk user_id saya, dan toko yang owner nya adalah user_id saya
    // const myListToko = await TokoTeamModel.find({ user_id: userId })
    // if (myListToko) {
    //   console.log('myListToko=>', myListToko)
    //   $or = myListToko.map(v => ({ _id: '' + v.toko_id }))
    //   $or.push({ owner: userId })
    // }
    // // daftar toko yang created_by nya adalah user_id saya
    // $or.push({ created_by: userId })
    // filter.$and = []
    // filter.$and.push({
    //   $or: $or
    // })
    const myOwnListToko = await getAllMyEligibleToko({ userId })
    // const myOwnListToko = await TokoTokoOnlineModel.find(filter)
    if (_.isEmpty(myOwnListToko)) isEligible = false
    else {
      const myOwnListTokoId = myOwnListToko.map(v => '' + v._id)
      args.toko_id || [].forEach(v => {
        if (!myOwnListTokoId.includes('' + v)) isEligible = false
        if (!isEligible) return true
      })
    }
    // console.log('myOwnListToko=====>', myOwnListToko)
    // console.log('filter $or=====>', $or)
    if (!isEligible) throw new Error('Data toko masih salah. Periksa kembali toko yang anda pilih.')

    // if (!_.isEmpty($or)) {
    //   filter.$and.push({
    //     $or: $or
    //   })
    // }
    // if (_.isEmpty(filter.$and)) isEligible = false
    // if (!isEligible) return { status: 200, success: 'Successfully get all Data', list_data: [], count: 0, page_count: 0 }

    const data = args
    data.created_by = userDetail._id
    data.updated_by = userDetail._id
    data.created_at = now
    data.updated_at = now
    data.tag_id = tagIdList
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
  const session = await EntityModel.db.startSession()
  session.startTransaction()
  const opts = { session }
  try {
    const now = Date.now()
    const { accesstoken } = context.req.headers
    const bodyAt = await jwt.verify(accesstoken, config.get('privateKey'))
    const { user_id: userId } = bodyAt
    const userDetail = await User.findById(userId)
    // const dataDetail = await EntityModel.findById(args._id)
    if (!_.isEmpty(args.tag_id)) {
      // const listNewTag = ((args.tag_id).map(v => {
      //   if (!mongoose.Types.ObjectId.isValid(v)) return v
      //   else return null
      // }), (o) => { return o !== null })
      const listNewTag = ((args.tag_id).map(v => {
        if (!mongoose.Types.ObjectId.isValid(v)) return v
        else return null
      })).filter(v => v !== null)
      console.log('listNewTag====>', listNewTag)
      // const existedTag = await TagModel.find({ _id: { $in: args.tag_id } })
      // const listNewTag = (args.tag_id).filter(n => !(existedTag.map(v => '' + v._id)).includes(n))
      if (!_.isEmpty(listNewTag)) {
        const dataListNewTag = listNewTag.map(v => ({
          name: v,
          created_by: userDetail._id,
          updated_by: userDetail._id,
          created_at: now,
          updated_at: now
        }))
        console.log('dataListNewTag===>', dataListNewTag)
        const createNewTagResponse = await TagModel.create(dataListNewTag, opts)
        console.log('createNewTagResponse===>', createNewTagResponse)
        const indexed = {}
        createNewTagResponse.forEach((v, i) => {
          indexed[v.name] = '' + v._id
        })
        // const dTemp = createNewTagResponse.map(v => ({ [v.name]: '' + v._id }))
        args.tag_id = (args.tag_id).map(tagId => {
          if (indexed[tagId]) return indexed[tagId]
          else return tagId
        })
        console.log('args.tag_id => ', args.tag_id)
      }
    }

    // get product detail
    const filter = {}
    filter.$and = []
    const $or = []
    const myEligibleToko = await getAllMyEligibleToko({ userId })
    if (myEligibleToko) {
      myEligibleToko.forEach(v => {
        $or.push({ toko_id: '' + v._id })
      })
    }
    $or.push({ created_by: userId })
    if (!_.isEmpty($or)) {
      filter.$and.push({
        $or: $or
      })
    }
    filter.$and.push({ _id: args.id })

    const productDetail = await EntityModel.findOne(filter).populate({ path: 'toko_id' })
    if (_.isEmpty(productDetail)) throw new Error('Anda tidak berhak untuk merubah data pada produk ini.')

    if (_.isEmpty(args.toko_id)) {
      args.toko_id = productDetail.toko_id.map(v => '' + (v || {})._id)
    }
    // check authorization
    let isEligible = false
    // const myListToko = await TokoTeamModel.find({ user_id: userId })
    // if (myListToko) {
    //   console.log('myListToko=>', myListToko)
    //   myListToko.forEach(v => {
    //     if ((args.toko_id || []).includes('' + v.toko_id)) isEligible = true
    //     if (isEligible) return true
    //   })
    // }
    // const myOwnListToko = await TokoTokoOnlineModel.find({ owner: userId })
    
    console.log('myEligibleToko=>', myEligibleToko)
    myEligibleToko.forEach(v => {
      if ((args.toko_id || []).includes('' + v._id)) isEligible = true
      if (isEligible) return true
    })
    
    if (!isEligible) throw new Error('Data toko masih salah. Periksa kembali toko yang anda pilih.')

    const data = args
    // data.created_by = userDetail._id
    data.updated_by = userDetail._id
    // data.created_at = now
    data.updated_at = now
    // data.category_id = flatten([...dataDetail.category_id, ...args.category_id])
    console.log('update=> ', data)
    await session.commitTransaction()
    session.endSession()
    return { status: 200, success: 'Successfully save Data', detail_data: await EntityModel.findOneAndUpdate({ _id: args._id }, data).populate({ path: 'created_by' }).populate({ path: 'updated_by' }) }
  } catch (err) {
    console.log('errorrr====>', err)
    await session.abortTransaction()
    session.endSession()
    // return { status: 400, error: err.message }
    throw new Error(err.message)
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

    // get product detail
    const filter = {}
    filter.$and = []
    const $or = []
    const myEligibleToko = await getAllMyEligibleToko({ userId })
    if (myEligibleToko) {
      myEligibleToko.forEach(v => {
        $or.push({ toko_id: '' + v._id })
      })
    }
    $or.push({ created_by: userId })
    if (!_.isEmpty($or)) {
      filter.$and.push({
        $or: $or
      })
    }
    filter.$and.push({ _id: args.id })

    const productDetail = await EntityModel.findOne(filter).populate({ path: 'toko_id' }).session(session)
    if (_.isEmpty(productDetail)) throw new Error('Anda tidak berhak untuk hapus produk ini.')

    // const dataDetail = await EntityModel.findById(args._id).session(session)

    // check authorization
    // let isEligible = false
    // let myListToko = await TokoTeamModel.find({ user_id: userId })
    // if (myListToko) {
    //   console.log('myListToko=>', myListToko)
    //   myListToko = myListToko.map(v => '' + v.toko_id)
    //   if (myListToko.includes('' + dataDetail._id)) isEligible = true
    // }
    // let myOwnListToko = await TokoTokoOnlineModel.find({ owner: userId })
    // if (myOwnListToko) {
    //   myOwnListToko = myOwnListToko.map(v => '' + v._id)
    //   if (myOwnListToko.includes('' + dataDetail._id)) isEligible = true
    // }
    // if (!isEligible) throw new Error('Data toko masih salah. Periksa kembali toko yang anda pilih.')

    await productDetail.deleteOne()
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
  getAllDataByTokoId,
  getAllDataByCategoryId,
  getDetailDataByCode,
  getDetailDataJoinCartByCode,
  getAllDataByTokoSlug
}
