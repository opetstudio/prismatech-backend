const graphql = require('graphql')
const Type = require('./type')
const { doUpsertPrivilege, doPrivilegeCheckboxSubmit, doCreatePrivilege, doUpdatePrivilege, doDeletePrivilege } = require('../services')
const Manifest = require('../manifest')
const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType
} = graphql

const createPrivilege = {
  type: new GraphQLObjectType({
    name: 'create' + Manifest.entity + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      detail_data: { type: Type[Manifest.entity + 'Type'] }
    })
  }),
  args: Manifest.createArgs,
  async resolve (parent, args, context) {
    return doCreatePrivilege(args, context)
  }
}
const updatePrivilege = {
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
    return doUpdatePrivilege(args, context)
  }
}
const upsertData = {
  type: new GraphQLObjectType({
    name: 'upsert' + Manifest.entity + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      detail_data: { type: Type[Manifest.entity + 'Type'] }
    })
  }),
  args: Manifest.updateArgs,
  async resolve (parent, args, context) {
    return doUpsertPrivilege(args, context)
  }
}
const deletePrivilege = {
  type: new GraphQLObjectType({
    name: 'delete' + Manifest.entity + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString }
    })
  }),
  args: {
    _id: { type: GraphQLID }
  },
  async resolve (parent, args, context) {
    return doDeletePrivilege(args, context)
  }
}
const privilegeCheckboxSubmit = {
  type: new GraphQLObjectType({
    name: 'privilegeCheckboxSubmit' + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString }
    })
  }),
  args: {
    role_id: { type: GraphQLString },
    // privilege_ids_flag: { type: GraphQLList(GraphQLString) }
    privilege_ids_flag: {
      type: GraphQLList(new GraphQLInputObjectType({
        name: 'privilegeIdFlag',
        fields: () => ({
          privilege_id: { type: GraphQLString },
          flag: { type: GraphQLBoolean }
        })
      }))
    }
  },
  async resolve (parent, args, context) {
    return doPrivilegeCheckboxSubmit(args, context)
  }
}

module.exports = {
  privilegeCheckboxSubmit,
  createPrivilege,
  updatePrivilege,
  deletePrivilege,
  ['upsert' + Manifest.entity]: upsertData
}
