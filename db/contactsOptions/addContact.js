import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contactsPath = path.join(__dirname, '..', 'contacts.json')

const addContactDB = async ({ name, email, phone }) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const parsedData = JSON.parse(data)
    const foundItem = parsedData.find((el) => {
      return el.name.toLowerCase() === name.toLowerCase()
    })

    if (foundItem) {
      return
    }

    const newContact = {
      id: parsedData.length + 1,
      name,
      email,
      phone,
    }
    parsedData.push(newContact)

    await fs.writeFile(
      contactsPath,
      JSON.stringify(parsedData, null, 2),
      'utf8'
    )
    return newContact
  } catch (err) {
    if (err) {
      return console.log(err)
    }
  }
}
export default addContactDB
