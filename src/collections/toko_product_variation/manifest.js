const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const { FileType } = require('../file/graphql/type')
const { CategoryType } = require('../category/graphql/type')
const { TokoTokoOnlineType } = require('../toko_toko_online/graphql/type')
const { TagType } = require('../tag/graphql/type')
const { TokoProductType } = require('../toko_product/graphql/type')
const { TokoInventoryType } = require('../toko_inventory/graphql/type')
const { UserType } = require('../user/graphql/type')
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
  price: { type: GraphQLInt },
  sku: { type: GraphQLString },
  weight: { type: GraphQLString },
  product_availability: { type: GraphQLString },
  inventories: { type: GraphQLList(TokoInventoryType) }
}
module.exports = {
  entity: 'TokoProductVariation',
  collection: 'toko_product_variation',
  updateArgs: {
    _id: { type: GraphQLID },
    product_id: { type: TokoProductType },
    price: { type: GraphQLInt },
    sku: { type: GraphQLString },
    weight: { type: GraphQLString },
    product_availability: { type: GraphQLString },
    inventories: { type: GraphQLList(TokoInventoryType) }
  },
  createArgs: {
    _id: { type: GraphQLID },
    product_id: { type: TokoProductType },
    price: { type: GraphQLInt },
    sku: { type: GraphQLString },
    weight: { type: GraphQLString },
    product_availability: { type: GraphQLString },
    inventories: { type: GraphQLList(TokoInventoryType) }
  },
  fields: {
    ...fields,
    ...commonFields
  }
}
