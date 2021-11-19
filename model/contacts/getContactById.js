import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contactsPath = path.join(__dirname, '..', 'contacts.json')

const getContactByIdDB = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const parsedData = JSON.parse(data)
    const contact = parsedData.find(({ id }) => id === Number(contactId))
    return contact
  } catch (err) {
    console.log(err)
  }
}
export default getContactByIdDB
