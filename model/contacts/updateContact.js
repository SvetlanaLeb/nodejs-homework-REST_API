import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contactsPath = path.join(__dirname, '..', 'contacts.json')

const updateContactDB = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const parsedData = JSON.parse(data)
    const contact = parsedData.find(({ id }) => id === Number(contactId))
    if (!contact) { return }
    const newContact = {
      ...contact,
      ...body
    }
    const newContacts = parsedData.map((contact) => {
      if (contact.id === Number(contactId)) {
        return newContact
      }
      return contact
    })

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      'utf8'
    )
    return newContact
  } catch (err) {
    if (err) {
      return console.log(err)
    }
  }
}
export default updateContactDB
