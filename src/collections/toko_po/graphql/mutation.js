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

const createData = {
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
    return Services['doCreate' + Manifest.entity](args, context)
  }
}
const checkoutProcess = {
  type: new GraphQLObjectType({
    name: 'checkoutProcessResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      detail_data: { type: Type[Manifest.entity + 'Type'] }
    })
  }),
  args: Manifest.createArgs,
  async resolve (parent, args, context) {
    return Services.checkoutProcess(args, context)
  }
}
const paymentProcess = {
  type: new GraphQLObjectType({
    name: 'paymentProcessResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      payment_page_url: { type: GraphQLString },
      debitin_paymentpage_backend_baseurl: { type: GraphQLString }
    })
  }),
  args: {
    _id: { type: GraphQLID },
    session_id: { type: GraphQLString },
    otp: { type: GraphQLString },
    otpRefNum: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return Services.paymentProcess(args, context)
  }
}
const paymentProcessSendOtp = {
  type: new GraphQLObjectType({
    name: 'paymentProcessSendOtpResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      otpRefNum: { type: GraphQLString }
    })
  }),
  args: {
    email: { type: GraphQLString },
    session_id: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return Services.paymentProcessSendOtp(args, context)
  }
}
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
const deleteData = {
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
    return Services['doDelete' + Manifest.entity](args, context)
  }
}
const purchaseorderCheckStatusRequestOtp = {
  type: new GraphQLObjectType({
    name: 'purchaseorderCheckStatusRequestOtpResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      otpRefNum: { type: GraphQLString }
    })
  }),
  args: {
    email: { type: GraphQLString },
    trxid: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return Services.purchaseorderCheckStatusRequestOtp(args, context)
  }
}

module.exports = {
  ['create' + Manifest.entity]: createData,
  ['update' + Manifest.entity]: updateData,
  ['delete' + Manifest.entity]: deleteData,
  checkoutProcess,
  paymentProcess,
  paymentProcessSendOtp,
  purchaseorderCheckStatusRequestOtp
}
