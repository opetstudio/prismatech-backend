const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const Type = require('./type')
const Manifest = require('../manifest')
const Services = require('../services')

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = graphql

// const EntityType = Type[entity + 'Type']

const getAllData = {
  type: new GraphQLObjectType({
    name: 'getAll' + Manifest.entity + 's' + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      list_data: { type: GraphQLList(Type[Manifest.entity + 'Type']) },
      count: { type: GraphQLLong },
      page_count: { type: GraphQLLong }
    })
  }),
  args: {
    page_size: { type: GraphQLInt },
    page_index: { type: GraphQLInt },
    string_to_search: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return Services['fetchAll' + Manifest.entity + 's'](args, context)
  }
}
const getAllDataBySessionId = {
  type: new GraphQLObjectType({
    name: 'getAll' + Manifest.entity + 's' + 'BySessionIdResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      list_data: { type: GraphQLList(Type[Manifest.entity + 'Type']) },
      count: { type: GraphQLLong },
      page_count: { type: GraphQLLong }
    })
  }),
  args: {
    page_size: { type: GraphQLInt },
    page_index: { type: GraphQLInt },
    string_to_search: { type: GraphQLString },
    session_id: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return Services['fetchAll' + Manifest.entity + 's' + 'BySessionId'](args, context)
  }
}
const getDetailData = {
  type: new GraphQLObjectType({
    name: 'getDetail' + Manifest.entity + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      data_detail: { type: Type[Manifest.entity + 'Type'] }
    })
  }),
  args: {
    id: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return Services['fetchDetail' + Manifest.entity](args, context)
  }
}
const getDetailDataBySessionId = {
  type: new GraphQLObjectType({
    name: 'getDetail' + Manifest.entity + 'BySessionIdResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      data_detail: { type: Type[Manifest.entity + 'Type'] }
    })
  }),
  args: {
    session_id: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return Services.getDetailDataBySessionId(args, context)
  }
}
const purchaseorderCheckStatus = {
  type: new GraphQLObjectType({
    name: 'purchaseorderCheckStatusResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      data_detail: { type: Type[Manifest.entity + 'Type'] }
    })
  }),
  args: {
    email: { type: GraphQLString },
    trxid: { type: GraphQLString },
    otpRefNum: { type: GraphQLString },
    otp: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return Services.purchaseorderCheckStatus(args, context)
  }
}

module.exports = {
  ['getAll' + Manifest.entity + 's']: getAllData,
  ['getAll' + Manifest.entity + 's' + 'BySessionId']: getAllDataBySessionId,
  ['getDetail' + Manifest.entity + 'BySessionId']: getDetailDataBySessionId,
  ['getDetail' + Manifest.entity]: getDetailData,
  purchaseorderCheckStatus
}
