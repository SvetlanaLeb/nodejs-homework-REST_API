import addContactDB from './addContact.js'
import getContactByIdDB from './getContactById.js'
import removeContactDB from './removeContact.js'
import listContactsDB from './listContacts.js'
import updateContactDB from './updateContact.js'
const db = {
  addContactDB,
  getContactByIdDB,
  removeContactDB,
  listContactsDB,
  updateContactDB
}
export default db
