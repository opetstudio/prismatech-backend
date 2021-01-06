const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const Manifest = require('../manifest')
// const { UserType } = require('../../user/graphql/type')
const { UserType } = require('../../user/graphql/type')
// const { RoleType } = require('../../role/graphql/type')
const entity = Manifest.entity

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql

const RoleType = new GraphQLObjectType({
  name: 'prvilegeroleType',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    // privilege_id: { type: GraphQLList(PrivilegeType) },
    status: { type: GraphQLString },
    created_by: { type: UserType },
    updated_by: { type: UserType },
    created_at: { type: GraphQLLong },
    updated_at: { type: GraphQLLong }
  })
})

const Type = new GraphQLObjectType({
  name: Manifest.collection,
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    entity: { type: GraphQLString },
    role_id: { type: GraphQLList(RoleType) },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    created_by: { type: UserType },
    updated_by: { type: UserType },
    created_at: { type: GraphQLLong },
    updated_at: { type: GraphQLLong }
  })
})
module.exports = {
  [entity + 'Type']: Type
  // RoleType
}
