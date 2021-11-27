const getList = require('./getList')
const getContactById = require('./getContactsById')
const addContact = require('./addContact')
const removeContact = require('./removeContacts')
const updateContact = require('./updateContact')
const updateStatusContact = require('./updateFavorite')

module.exports = {
  getList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
}