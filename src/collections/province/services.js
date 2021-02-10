const EntityModel = require('./Model')
const fetchAll = async ({ filter }) => {
  console.log('province service fetchAll invoked. filter:', filter)
  const result = await EntityModel.find(filter)
  console.log('result===>', result)
  return result
}
module.exports = {
  fetchAll
}
