const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getContactById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findById(id)
  if (!result) {
    throw new NotFound(`Contacts with id=${id} not found`)
  }
  sendSuccessRes(res, { data: result })
}

module.exports = getContactById;