const mongoose = require('mongoose')
// const Joi = require('@hapi/joi')
// const User = require('../user/Model')

const schema = new mongoose.Schema({
  address: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  subcity: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  created_at: {
    type: Number,
    default: new Date().now
  },
  updated_at: {
    type: Number,
    default: new Date().now
  },
  created_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    default: null
  },
  updated_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    default: null
  }
}
)
// schema.index({ code: 1, toko_id: 1 }, { unique: true })
// schema.statics.validation = (args) => Joi.object({
//   // user_id: Joi.string(),
//   // amount: Joi.number().required().greater(0)
// }).validate(args)

module.exports = mongoose.model('toko_location', schema)
