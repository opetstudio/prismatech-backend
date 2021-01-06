const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const { UserType } = require('../user/graphql/type')
// const { RoleType } = require('../role/graphql/type')
const Type = require('./graphql/type')
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

const entity = 'Privilege'
const collection = 'privilege'

const fields = {
  _id: { type: GraphQLID },
  title: { type: GraphQLString },
  parent_id: { type: Type[entity + 'Type'] }
}

module.exports = {
  entity: entity,
  collection: collection,
  updateArgs: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    entity: { type: GraphQLString },
    role_id: { type: GraphQLList(GraphQLString) },
    name: { type: GraphQLString },
    status: { type: GraphQLString }
  },
  createArgs: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    entity: { type: GraphQLString },
    role_id: { type: GraphQLList(GraphQLString) },
    name: { type: GraphQLString },
    status: { type: GraphQLString }
  },
  fields: {
    ...fields,
    ...commonFields
  }
}
