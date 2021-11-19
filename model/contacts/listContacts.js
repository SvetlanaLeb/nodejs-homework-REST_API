import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contactsPath = path.join(__dirname, '..', 'contacts.json')

const listContactsDB = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    return contacts
  } catch (err) {
    console.log(err)
  }
}
export default listContactsDB
