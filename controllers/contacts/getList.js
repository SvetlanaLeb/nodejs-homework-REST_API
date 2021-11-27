const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getList = async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({}, '_id name email phone', { skip, limit: +limit })
  sendSuccessRes(res, { result })
}
module.exports = getList;