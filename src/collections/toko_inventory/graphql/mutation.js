const graphql = require('graphql')
const Manifest = require('../manifest')
const Type = require('./type')
const Services = require('../services')

const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType
} = graphql

const updateData = {
  type: new GraphQLObjectType({
    name: 'update' + Manifest.entity + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      detail_data: { type: Type[Manifest.entity + 'Type'] }
    })
  }),
  args: Manifest.updateArgs,
  async resolve (parent, args, context) {
    return Services['doUpdate' + Manifest.entity](args, context)
  }
}
module.exports = {
  ['update' + Manifest.entity]: updateData
}
