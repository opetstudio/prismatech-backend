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
const TokoProductModel = require('../toko_product/Model')
const { getAllMyEligibleToko } = require('../../services/GlobalServices')

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

    console.log('args========>', args)

    if (args.quantity === undefined || args.quantity === '') throw new Error('Quantiti stok harus diisi')

    // get toko inventory detail
    const tokoInventoryDetail = await EntityModel.findOne({ _id: args._id }).populate({ path: 'product_variation', populate: { path: 'product_id' } }).session(session)
    if (_.isEmpty(tokoInventoryDetail)) throw new Error('Data produk inventory tidak ditemukan')

    const productId = tokoInventoryDetail.product_variation.product_id._id

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
    filter.$and.push({ _id: productId })

    const productDetail = await TokoProductModel.findOne(filter).populate({ path: 'toko_id' })
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

    // const data = args
    Object.assign(tokoInventoryDetail, args)
    // data.created_by = userDetail._id
    tokoInventoryDetail.updated_by = userDetail._id
    // data.created_at = now
    tokoInventoryDetail.updated_at = now
    // data.category_id = flatten([...dataDetail.category_id, ...args.category_id])
    console.log('update=> ', tokoInventoryDetail)
    // const newData = await EntityModel.findOneAndUpdate({ _id: args._id }, productDetail).session(session)
    // .populate({ path: 'created_by' }).populate({ path: 'updated_by' })
    const saveResp = await tokoInventoryDetail.save(session)
    // console.log('newData=======>', productDetail)
    // console.log('saveResp=======>', saveResp)

    // update stock di table product
    productDetail.stock_amount = args.quantity
    await productDetail.save(session)

    await session.commitTransaction()
    session.endSession()
    return { status: 200, success: 'Successfully save Data', detail_data: tokoInventoryDetail }
  } catch (err) {
    console.log('errorrr====>', err)
    await session.abortTransaction()
    session.endSession()
    // return { status: 400, error: err.message }
    throw new Error(err.message)
  }
}

module.exports = {
  ['doUpdate' + entity]: doUpdateData
}
