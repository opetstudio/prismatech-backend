const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const { FileType } = require('../file/graphql/type')
const { UserType } = require('../user/graphql/type')
const { TokoCartType } = require('../toko_cart/graphql/type')
const { TokoTokoOnlineType } = require('../toko_toko_online/graphql/type')
const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType
} = graphql

const commonFields = {
  created_by: { type: UserType },
  updated_by: { type: UserType },
  created_at: { type: GraphQLLong },
  updated_at: { type: GraphQLLong }
}

const fields = {
  _id: { type: GraphQLID },
  action: { type: GraphQLString },
  payment_page_url: { type: GraphQLString },
  full_name: { type: GraphQLString },
  phone_number: { type: GraphQLString },
  invoice_code: { type: GraphQLString },
  email: { type: GraphQLString },
  session_id: { type: GraphQLString },
  device_id: { type: GraphQLString },
  shipping_address: { type: GraphQLString },
  shipping_province: {
    type: GraphQLString
  },
  shipping_city: {
    type: GraphQLString
  },
  shipping_currier: {
    type: GraphQLString
  },
  shipping_postal_code: {
    type: GraphQLString
  },
  total_product_amount: { type: GraphQLString },
  total_amount: { type: GraphQLString },
  shipping_amount: { type: GraphQLString },
  cart_id: { type: GraphQLList(TokoCartType) },
  toko_id: { type: TokoTokoOnlineType },
  user_id: { type: UserType }
}
module.exports = {
  entity: 'TokoPo',
  collection: 'toko_po',
  updateArgs: {
    _id: { type: GraphQLID },
    device_id: { type: GraphQLString },
    session_id: { type: GraphQLString },
    full_name: { type: GraphQLString },
    invoice_code: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    email: { type: GraphQLString },
    cart_id: { type: GraphQLList(GraphQLString) },
    toko_id: { type: GraphQLString },
    toko_slug: { type: GraphQLString },
    shipping_address: { type: GraphQLString },
    shipping_province: {
      type: GraphQLString
    },
    shipping_city: {
      type: GraphQLString
    },
    shipping_currier: {
      type: GraphQLString
    },
    shipping_postal_code: {
      type: GraphQLString
    },
    shipping_amount: { type: GraphQLInt },
    unique_code: { type: GraphQLInt }
  },
  createArgs: {
    device_id: { type: GraphQLString },
    session_id: { type: GraphQLString },
    full_name: { type: GraphQLString },
    invoice_code: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    email: { type: GraphQLString },
    cart_id: { type: GraphQLList(GraphQLString) },
    toko_id: { type: GraphQLString },
    toko_slug: { type: GraphQLString },
    shipping_address: { type: GraphQLString },
    shipping_province: {
      type: GraphQLString
    },
    shipping_city: {
      type: GraphQLString
    },
    shipping_currier: {
      type: GraphQLString
    },
    shipping_postal_code: {
      type: GraphQLString
    },
    shipping_amount: { type: GraphQLInt }
  },
  fields: {
    ...fields,
    ...commonFields
  }
}
