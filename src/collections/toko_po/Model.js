const mongoose = require('mongoose')
// const Joi = require('@hapi/joi')
// const User = require('../user/Model')

const schema = new mongoose.Schema({
  payment_page_url: {
    type: String
  },
  debitin_paymentpage_backend_baseurl: {
    type: String
  },
  action: {
    type: String
  },
  full_name: {
    type: String
  },
  phone_number: {
    type: String
  },
  email: {
    type: String
  },
  session_id: {
    type: String
  },
  device_id: {
    type: String
  },
  shipping_address: {
    type: String
  },
  shipping_province: {
    type: String
  },
  shipping_city: {
    type: String
  },
  shipping_subcity: {
    type: String
  },
  shipping_currier: {
    type: String
  },
  shipping_postal_code: {
    type: String
  },
  isneed_shipping: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  invoice_code: {
    type: String
  },
  total_product_amount: {
    type: Number
  },
  total_amount: {
    type: Number
  },
  unique_code: {
    type: Number
  },
  shipping_amount: {
    type: Number
  },
  cart_id: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'toko_cart' }],
  toko_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'toko_toko_online',
    default: null
  },
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    default: null
  },
  created_at: {
    type: Number,
    default: new Date().now
  },
  payment_date: {
    type: Number,
    default: new Date().now
  },
  payment_status: {
    type: String
  },
  payment_refno: {
    type: String
  },
  payment_method: {
    type: String
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

module.exports = mongoose.model('toko_po', schema)
