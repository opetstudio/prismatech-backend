const mongoose = require('mongoose')
// const Joi = require('@hapi/joi')
// const User = require('../user/Model')

const schema = new mongoose.Schema({
  session_id: {
    type: String
  },
  device_id: {
    type: String
  },
  count: {
    type: Number
  },
  amount: {
    type: Number
  },
  product_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'toko_product',
    default: null
  },
  toko_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'toko_toko_online',
    default: null
  },
  status: {
    type: String,
    enum: ['open', 'close'],
    default: 'open'
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
// schema.statics.validation = (args) => Joi.object({
//   // user_id: Joi.string(),
//   // amount: Joi.number().required().greater(0)
// }).validate(args)

module.exports = mongoose.model('toko_cart', schema)
