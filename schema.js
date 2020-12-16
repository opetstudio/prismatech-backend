const graphql = require('graphql')
// Otp
const {
  sendOtp,
  submitOtp,
  changePasswordViaForgetPassword,
  forgetPasswordSendOtp,
  merchantForgetPassword,
  merchantSubmitForgetPassword,
  institutionForgetPassword,
  institutionSubmitForgetPassword
} = require('./src/collections/rp_otp/graphql/mutation')

// User
const { signUpV2, signUp, changeUserPassword, changeUserName, changeUserProfile, logout } = require('./src/collections/user/graphql/mutation')
const { getDetailUser, login, getProfile, allUser, getAllUsers } = require('./src/collections/user/graphql/query')
// role
const { getAllRoles, getDetailRole } = require('./src/collections/role/graphql/query')
const { createRole, deleteRole, updateRole } = require('./src/collections/role/graphql/mutation')

// role privilege
const { getAllRoleprivilegesByRoleId, getDetailRoleprivilege } = require('./src/collections/role_privilege/graphql/query')
const { createRoleprivilege, deleteRoleprivilege, updateRoleprivilege } = require('./src/collections/role_privilege/graphql/mutation')

// privilege
const { getAllPrivileges, getDetailPrivilege } = require('./src/collections/privilege/graphql/query')
const { createPrivilege, deletePrivilege, privilegeCheckboxSubmit, updatePrivilege } = require('./src/collections/privilege/graphql/mutation')

// user role
const { getAllUserRoles, getDetailUserRole, getDetailUserRoleByMyUserId } = require('./src/collections/user_role/graphql/query')
const { createUserRole, deleteUserRole, updateUserRole } = require('./src/collections/user_role/graphql/mutation')

// tag
const { getAllTags, getDetailTag } = require('./src/collections/tag/graphql/query')
const { createTag, deleteTag, updateTag } = require('./src/collections/tag/graphql/mutation')

const {
  GraphQLObjectType,
  GraphQLSchema
} = graphql

const RootQuery = ({ externalQuery }) => {
  return new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      // user
      login,
      getProfile,
      allUser,
      getAllUsers,
      getDetailUser,

      // role
      getAllRoles,
      getDetailRole,

      // role privilege
      getAllRoleprivilegesByRoleId,
      getDetailRoleprivilege,

      // privilege
      getAllPrivileges,
      getDetailPrivilege,

      // user role
      getAllUserRoles,
      getDetailUserRole,
      getDetailUserRoleByMyUserId,
      // tag
      getAllTags,
      getDetailTag,

      ...externalQuery
    }
  })
}

const Mutation = ({ externalMutation }) => new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // otp
    sendOtp,
    submitOtp,
    changePasswordViaForgetPassword,
    forgetPasswordSendOtp,
    merchantForgetPassword,
    merchantSubmitForgetPassword,
    institutionForgetPassword,
    institutionSubmitForgetPassword,

    // user
    signUp,
    signUpV2,
    changeUserPassword,
    changeUserName,
    changeUserProfile,
    logout,

    // role
    createRole,
    updateRole,
    deleteRole,

    // role privilege
    createRoleprivilege,
    updateRoleprivilege,
    deleteRoleprivilege,

    // privilege
    createPrivilege,
    updatePrivilege,
    deletePrivilege,
    privilegeCheckboxSubmit,

    // user role
    createUserRole,
    updateUserRole,
    deleteUserRole,

    // tag
    createTag,
    deleteTag,
    updateTag,

    ...externalMutation
  }
})

module.exports = ({ externalQuery, externalMutation }) => new GraphQLSchema({
  query: RootQuery({ externalQuery }),
  mutation: Mutation({ externalMutation })
})
