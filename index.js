const { UserType } = require('./src/collections/user/graphql/type')
const { FileType } = require('./src/collections/file/graphql/type')
const { TagType } = require('./src/collections/tag/graphql/type')
const { RoleType } = require('./src/collections/role/graphql/type')

module.exports.run = require('./app')
module.exports.graphqlModule = require('graphql')
module.exports.GraphQLLong = require('graphql-type-long')
module.exports.mongoose = require('mongoose')
module.exports.model = {
  province: require('./src/collections/province/Model'),
  city: require('./src/collections/city/Model'),
  subcity: require('./src/collections/subcity/Model'),
  user: require('./src/collections/user/Model'),
  user_role: require('./src/collections/user_role/Model'),
  tag: require('./src/collections/tag/Model'),
  file: require('./src/collections/file/Model')
}
module.exports.utils = {
  services: require('./src/utils/services')
}
module.exports.services = {
  user: require('./src/collections/user/services'),
  user_role: require('./src/collections/user_role/services'),
  province: require('./src/collections/province/services'),
  tag: require('./src/collections/tag/services'),
  rp_otp: require('./src/collections/rp_otp/services'),
  supportServices: require('./src/utils/services/supportServices')
}
module.exports.graphql = {
  query: {
    user: require('./src/collections/user/graphql/query'),
  },
  mutation: {
    user: require('./src/collections/user/graphql/mutation'),
  },
  type: {
    UserType,
    FileType,
    TagType,
    RoleType
  }
}
