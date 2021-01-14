const graphql = require('graphql')

const { forgetpasswordSubmitNewPassword, forgetpasswordValidateToken, userSignupV2, userSignup, changeEmail, changePassword, changeName, changeProfile, serviceLogout, forgetpasswordSubmitEmail } = require('../services')
const { AuthType, ChangeType } = require('./type')

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt
} = graphql

const signUp = {
  type: AuthType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    device_id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (parent, args) {
    return userSignup(args.email, args.device_id)
  }
}
const signUpV2 = {
  type: AuthType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    device_id: { type: new GraphQLNonNull(GraphQLString) },
    full_name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (parent, args, context) {
    return userSignupV2(args, context)
  }
}

const changeUserEmail = {
  type: ChangeType,
  args: {
    access_token: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    new_email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (parent, args) {
    return changeEmail(args.new_email, args.user_id, args.password, args.newToken)
  }
}

const changeUserPassword = {
  type: ChangeType,
  args: {
    access_token: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    new_password: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (parent, args) {
    return changePassword(args.user_id, args.new_password, args.password, args.newToken)
  }
}

const changeUserName = {
  type: ChangeType,
  args: {
    access_token: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    new_username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (parent, args) {
    return changeName(args.user_id, args.new_username, args.password, args.newToken)
  }
}

const changeUserProfile = {
  type: ChangeType,
  args: {
    access_token: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    nickname: { type: new GraphQLNonNull(GraphQLString) },
    full_name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (parent, args) {
    return changeProfile(args)
  }
}

const logout = {
  type: AuthType,
  args: {
    access_token: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve (parent, args) {
    return serviceLogout(args.access_token)
  }
}

module.exports.signUpV2 = signUpV2
module.exports.signUp = signUp
module.exports.changeUserEmail = changeUserEmail
module.exports.changeUserPassword = changeUserPassword
module.exports.changeUserName = changeUserName
module.exports.changeUserProfile = changeUserProfile
module.exports.logout = logout
module.exports.forgetpasswordSubmitEmail = {
  type: new GraphQLObjectType({
    name: 'forgetpasswordSubmitEmailResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString }
    })
  }),
  args: {
    email: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return forgetpasswordSubmitEmail(args, context)
  }
}
module.exports.forgetpasswordValidateToken = {
  type: new GraphQLObjectType({
    name: 'forgetpasswordValidateTokenResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString }
    })
  }),
  args: {
    token: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return forgetpasswordValidateToken(args, context)
  }
}
module.exports.forgetpasswordSubmitNewPassword = {
  type: new GraphQLObjectType({
    name: 'forgetpasswordSubmitNewPasswordResponse',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString }
    })
  }),
  args: {
    token: { type: GraphQLString },
    newpassword: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return forgetpasswordSubmitNewPassword(args, context)
  }
}
