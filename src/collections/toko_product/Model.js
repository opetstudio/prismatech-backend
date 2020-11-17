const mongoose = require('mongoose')
// const Joi = require('@hapi/joi')
// const User = require('../user/Model')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  isneed_shipping: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  weight: {
    type: Number,
    default: 0
  },
  content1: {
    type: String
  },
  code: {
    type: String,
    unique: true
  },
  price: {
    type: Number
  },
  image_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'file',
    default: null
  },
  tag_id: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'tag' }],
  toko_id: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'toko_toko_online', required: true }],
  category_id: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'category' }],
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  use_stock: {
    type: Boolean,
    default: true
  },
  instock_label: {
    type: String,
    default: 'Stock Tersedia'
  },
  preorder_policy: {
    type: String,
    enum: ['preorder', 'unavailable'],
    default: 'unavailable'
  },
  product_availability: {
    type: String,
    enum: ['always_ready', 'use_stock'],
    default: 'always_ready'
  },
  stock_amount: {
    type: Number,
    default: 0
  },
  estimated_delivery_time_instock: {
    type: Number,
    default: 0
  },
  estimated_delivery_time_preorder: {
    type: Number,
    default: 0
  },
  estimated_delivery_unit_time_instock: {
    type: String,
    enum: ['hour', 'day', 'week', 'month'],
    default: 'hour'
  },
  estimated_delivery_unit_time_preorder: {
    type: String,
    enum: ['hour', 'day', 'week', 'month'],
    default: 'hour'
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
schema.index({ code: 1, toko_id: 1 }, { unique: true })
// schema.statics.validation = (args) => Joi.object({
//   // user_id: Joi.string(),
//   // amount: Joi.number().required().greater(0)
// }).validate(args)

module.exports = mongoose.model('toko_product', schema)
