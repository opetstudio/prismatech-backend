const mongoose = require('mongoose')
// const Joi = require('@hapi/joi')
// const User = require('../user/Model')

const schema = new mongoose.Schema({
  product_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'toko_product',
    default: null
  },
  price: {
    type: Number
  },
  sku: {
    type: String
  },
  product_availability: {
    type: String
  },
  weight: {
    type: Number,
    default: 0
  },
  inventories: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'toko_inventory' }
  ],
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

module.exports = mongoose.model('toko_product_variation', schema)
