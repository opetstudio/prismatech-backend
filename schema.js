const graphql = require('graphql')

// RAYAPAY
// Emoney
const { allTransaction } = require('./src/collections/rp_emoney/graphql/query')

// Merchant
const { signUpMerchant, logoutMerchant, relationMerchantInstitution, changePasswordMerchant } = require('./src/collections/rp_merchant/graphql/mutation')
const { AllMerchant, MerchantInfo, loginMerchant, MerchantTransactionHistory, merchantDashboard, showRelatedInstitution } = require('./src/collections/rp_merchant/graphql/query')

// Institution
const { logoutInstitution, signUpInstitution } = require('./src/collections/rp_institution/graphql/mutation')
const { AllInstitution, loginInstitution, InstitutionInfo } = require('./src/collections/rp_institution/graphql/query')

// Qr
const { createQrStatic, testing, createQrDynamic } = require('./src/collections/rp_qr/graphql/mutation')
const { showQR } = require('./src/collections/rp_qr/graphql/query')

// Fee
const { addFee, setMerchantFee, setInstitutionFee } = require('./src/collections/rp_fee/graphql/mutation')

// Settlement
const { setSettlement } = require('./src/collections/rp_settlement/graphql/mutation')
const { getAllSettlement, getSettlements } = require('./src/collections/rp_settlement/graphql/query')

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
// Services
const { topupVa, staticQrPayment, scanQrStatic, detailPayment, cancelStaticPayment, transactionReceipt, topupInstitution, dynamicQrPayment, scanQrDynamic, createQrTopUpMerchant, scanQrTopUpMerchant, paymentTopUpMerchant } = require('./src/services/graphql/mutation')
const { transactionHistory } = require('./src/services/graphql/query')

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

// LMS

// lms course enrollment
const { getAllEnrollmentUserByCourseId, getAllEnrollmentUserByFilter } = require('./src/collections/lms_course_enrollment/graphql/query')
const { submitCourseEnrollmentRequest } = require('./src/collections/lms_course_enrollment/graphql/mutation')

// Teacher
const { createTeacher } = require('./src/collections/lms_teacher/graphql/mutation')
const { getTeacherById, getAllTeachers } = require('./src/collections/lms_teacher/graphql/query')

// Course
const { createCourse, updateCourse, deleteCourse } = require('./src/collections/lms_course/graphql/mutation')
const { getCourseById, getAllCourses, getDetailCourse, getAllPublishedCourses, getDetailPublishedCourse } = require('./src/collections/lms_course/graphql/query')

// lms grading
const { getAllLmsGradings, getDetailLmsGrading, getAllGradingsByCourseId } = require('./src/collections/lms_grading/graphql/query')
const { createLmsGrading, deleteLmsGrading, updateLmsGrading } = require('./src/collections/lms_grading/graphql/mutation')

// Subject
const { createSubject, updateSubject, deleteSubject } = require('./src/collections/lms_subject/graphql/mutation')
const { getAllSubjects, getDetailSubject } = require('./src/collections/lms_subject/graphql/query')

// Subject Unit
const { createLmsSubjectUnit, updateLmsSubjectUnit, deleteLmsSubjectUnit } = require('./src/collections/lms_subject_unit/graphql/mutation')
const { getAllLmsSubjectUnits, getDetailLmsSubjectUnit } = require('./src/collections/lms_subject_unit/graphql/query')
// const { getAllSettlement, getSettlements } = require('./src/collections/settlement/graphql/query')

// const { tablepaginationFetchData } = require('./src/services/graphql/query')

// ECOMMERCE

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
      // LMS
      // enrollment
      getAllEnrollmentUserByCourseId,
      getAllEnrollmentUserByFilter,
      // teacher
      getTeacherById,
      getAllTeachers,

      // course
      getCourseById,
      getAllCourses,
      getDetailCourse,
      getAllPublishedCourses,
      getDetailPublishedCourse,

      // subject
      getAllSubjects,
      getDetailSubject,

      // subject unit
      getAllLmsSubjectUnits,
      getDetailLmsSubjectUnit,

      // lms grading
      getAllLmsGradings,
      getDetailLmsGrading,
      getAllGradingsByCourseId,

      // RAYAPAY
      // emoney
      allTransaction,

      // merchant
      AllMerchant,
      MerchantInfo,
      loginMerchant,
      MerchantTransactionHistory,
      merchantDashboard,
      showRelatedInstitution,

      // institution
      AllInstitution,
      loginInstitution,
      InstitutionInfo,

      // qr
      showQR,

      // settlement
      getAllSettlement,
      getSettlements,

      // services
      transactionHistory,

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

    // LMS
    // enrollment
    submitCourseEnrollmentRequest,
    // teacher
    createTeacher,

    // course
    createCourse,
    updateCourse,
    deleteCourse,

    // lms grading
    createLmsGrading,
    updateLmsGrading,
    deleteLmsGrading,

    // subject
    createSubject,
    updateSubject,
    deleteSubject,

    // subject unit
    createLmsSubjectUnit,
    updateLmsSubjectUnit,
    deleteLmsSubjectUnit,

    // RAYAPAY

    // merchant
    signUpMerchant,
    logoutMerchant,
    relationMerchantInstitution,
    changePasswordMerchant,

    // institution
    logoutInstitution,
    signUpInstitution,

    // qr
    createQrStatic,
    testing,
    createQrDynamic,

    // fee
    addFee,
    setMerchantFee,
    setInstitutionFee,

    // settlement
    setSettlement,

    // otp
    sendOtp,
    submitOtp,
    changePasswordViaForgetPassword,
    forgetPasswordSendOtp,
    merchantForgetPassword,
    merchantSubmitForgetPassword,
    institutionForgetPassword,
    institutionSubmitForgetPassword,

    // services
    topupVa,
    staticQrPayment,
    scanQrStatic,
    detailPayment,
    cancelStaticPayment,
    transactionReceipt,
    topupInstitution,
    dynamicQrPayment,
    scanQrDynamic,
    createQrTopUpMerchant,
    scanQrTopUpMerchant,
    paymentTopUpMerchant,

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
