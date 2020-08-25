const graphql = require('graphql')
// Otp
const {
  sendOtp,
  submitOtp,
  changePasswordViaForgetPassword,
  forgetPasswordSendOtp
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

// toko product
const { getAllTokoProducts, getDetailTokoProduct, getDetailTokoProductByCode, getAllTokoProductsByTokoId, getAllTokoProductsByCategoryId } = require('./src/collections/toko_product/graphql/query')
const { createTokoProduct, deleteTokoProduct, updateTokoProduct } = require('./src/collections/toko_product/graphql/mutation')

// tag
const { getAllTags, getDetailTag } = require('./src/collections/tag/graphql/query')
const { createTag, deleteTag, updateTag } = require('./src/collections/tag/graphql/mutation')

// category
const { getAllCategorys, getDetailCategory, getAllCategorysByTokoId } = require('./src/collections/category/graphql/query')
const { createCategory, deleteCategory, updateCategory } = require('./src/collections/category/graphql/mutation')

// toko toko online
const { getAllTokoTokoOnlines, getDetailTokoTokoOnline } = require('./src/collections/toko_toko_online/graphql/query')
const { createTokoTokoOnline, deleteTokoTokoOnline, updateTokoTokoOnline } = require('./src/collections/toko_toko_online/graphql/mutation')

// toko team
const { getAllTokoTeams, getDetailTokoTeam, getAllTokoTeamsByTokoId } = require('./src/collections/toko_team/graphql/query')
const { createTokoTeam, deleteTokoTeam, updateTokoTeam } = require('./src/collections/toko_team/graphql/mutation')

// toko cart
const { getAllTokoCarts, getAllTokoCartsBySessionId, getDetailTokoCart } = require('./src/collections/toko_cart/graphql/query')
const { createTokoCart, deleteTokoCart, updateTokoCart, addToCart, removeFromCart } = require('./src/collections/toko_cart/graphql/mutation')

// toko po
// const { getAllTokoCarts, getAllTokoCartsBySessionId, getDetailTokoCart } = require('./src/collections/toko_cart/graphql/query')
const { checkoutProcess, paymentProcess } = require('./src/collections/toko_po/graphql/mutation')

const {
  GraphQLObjectType,
  GraphQLSchema
} = graphql

const RootQuery = new GraphQLObjectType({
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

    // toko product
    getAllTokoProducts,
    getDetailTokoProduct,
    getDetailTokoProductByCode,

    // tag
    getAllTags,
    getDetailTag,
    // category
    getAllCategorys,
    getDetailCategory,
    getAllCategorysByTokoId,
    // toko toko online
    getAllTokoTokoOnlines,
    getDetailTokoTokoOnline,
    getAllTokoProductsByTokoId,
    getAllTokoProductsByCategoryId,
    // toko toko online
    getAllTokoTeams,
    getDetailTokoTeam,
    getAllTokoTeamsByTokoId,
    // toko cart
    getAllTokoCarts,
    getDetailTokoCart,
    getAllTokoCartsBySessionId
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // otp
    sendOtp,
    submitOtp,
    changePasswordViaForgetPassword,
    forgetPasswordSendOtp,
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

    createTokoProduct,
    deleteTokoProduct,
    updateTokoProduct,

    // tag
    createTag,
    deleteTag,
    updateTag,
    // category
    createCategory,
    deleteCategory,
    updateCategory,
    // toko toko online
    createTokoTokoOnline,
    deleteTokoTokoOnline,
    updateTokoTokoOnline,
    // toko team
    createTokoTeam,
    deleteTokoTeam,
    updateTokoTeam,
    // toko cart
    createTokoCart,
    deleteTokoCart,
    updateTokoCart,
    addToCart,
    removeFromCart,
    // toko po
    checkoutProcess,
    paymentProcess
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
