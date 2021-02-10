const mongoose = require('mongoose')
// const Joi = require('@hapi/joi')
// const User = require('../user/Model')

const schema = new mongoose.Schema({
  subcity_name: {
    type: String
  },
  subcity_code: {
    type: String
  },
  city_code: {
    type: String
  },
  description: {
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
// schema.statics.validation = (args) => Joi.object({
//   // user_id: Joi.string(),
//   // amount: Joi.number().required().greater(0)
// }).validate(args)

module.exports = mongoose.model('subcity', schema)
