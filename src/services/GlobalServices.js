const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const config = require('config')
const _ = require('lodash')
const { flatten } = require('../utils/services')
const User = require('../collections/user/Model')
const TokoTeamModel = require('../collections/toko_team/Model')
const TokoTokoOnlineModel = require('../collections/toko_toko_online/Model')

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

module.exports = {
  getAllMyEligibleToko
}
