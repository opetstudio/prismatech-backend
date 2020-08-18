const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const { FileType } = require('../file/graphql/type')
const { CategoryType } = require('../category/graphql/type')
const { TokoTokoOnlineType } = require('../toko_toko_online/graphql/type')
const { UserType } = require('../user/graphql/type')
const { TagType } = require('../tag/graphql/type')
const { RoleType } = require('../role/graphql/type')
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
  toko_id: { type: TokoTokoOnlineType },
  user_id: { type: UserType },
  role_id: { type: RoleType }
}
module.exports = {
  entity: 'TokoTeam',
  collection: 'toko_team',
  updateArgs: {
    _id: { type: GraphQLID },
    toko_id: { type: GraphQLString },
    email: { type: GraphQLString }
  },
  createArgs: {
    toko_id: { type: GraphQLString },
    email: { type: GraphQLString }
  },
  fields: {
    ...fields,
    ...commonFields
  }
}
