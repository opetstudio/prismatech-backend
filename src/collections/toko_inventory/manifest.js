const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const { FileType } = require('../file/graphql/type')
const { CategoryType } = require('../category/graphql/type')
const { TokoTokoOnlineType } = require('../toko_toko_online/graphql/type')
const { TokoProductVariationType } = require('../toko_product_variation/graphql/type')
const { TokoProductType } = require('../toko_product/graphql/type')
const { TagType } = require('../tag/graphql/type')
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
  location_id: { type: GraphQLString },
  quantity: { type: GraphQLInt },
  product_variation: {
    type: new GraphQLObjectType({
      name: 'product_variation',
      fields: () => ({
        _id: { type: GraphQLID },
        product_id: { type: TokoProductType },
        price: { type: GraphQLInt },
        sku: { type: GraphQLString },
        weight: { type: GraphQLString }
      })
    })
  },
  product_id: { type: TokoProductType }
  // product_variation: {
  //   _id: { type: GraphQLID },
  //   product_id: { type: TokoProductType },
  //   price: { type: GraphQLInt },
  //   sku: { type: GraphQLString },
  //   weight: { type: GraphQLString }
  // }
}
module.exports = {
  entity: 'TokoInventory',
  collection: 'toko_inventory',
  updateArgs: {
    _id: { type: GraphQLID },
    location_id: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    product_variation: { type: GraphQLString }
  },
  createArgs: {
    location_id: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    product_variation: { type: GraphQLString }
  },
  fields: {
    ...fields,
    ...commonFields
  }
}
