import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contactsPath = path.join(__dirname, '..', 'contacts.json')

const removeContactDB = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const parsedData = JSON.parse(data)
    const foundItem = parsedData.find(({ id }) => id === Number(contactId))
    const newData = parsedData.filter(({ id }) => id !== Number(contactId))
    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), 'utf8')
    return foundItem
  } catch (err) {
    console.log(err)
  }
}
export default removeContactDB
