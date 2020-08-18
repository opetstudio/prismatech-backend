const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const { FileType } = require('../file/graphql/type')
const { UserType } = require('../user/graphql/type')
const { TokoProductType } = require('../toko_product/graphql/type')
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
  product_id: { type: TokoProductType },
  device_id: { type: GraphQLString },
  session_id: { type: GraphQLString },
  toko_id: { type: TokoTokoOnlineType },
  count: { type: GraphQLInt },
  amount: { type: GraphQLInt }
}
module.exports = {
  entity: 'TokoCart',
  collection: 'toko_cart',
  updateArgs: {
    _id: { type: GraphQLID },
    device_id: { type: GraphQLString },
    session_id: { type: GraphQLString },
    product_id: { type: GraphQLString },
    toko_id: { type: GraphQLString },
    count: { type: GraphQLInt }
  },
  createArgs: {
    device_id: { type: GraphQLString },
    product_id: { type: GraphQLString },
    session_id: { type: GraphQLString },
    toko_id: { type: GraphQLString },
    count: { type: GraphQLInt }
  },
  fields: {
    ...fields,
    ...commonFields
  }
}
