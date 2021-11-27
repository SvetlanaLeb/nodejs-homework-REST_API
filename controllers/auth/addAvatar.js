const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const addAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file
  const { _id: id } = req.user
  const uploadDir = path.join(avatarDir, `${id}, originalname`)
  try {
    const file = await Jimp.read(tempStorage)
    await file.resize(250, 250).write(tempStorage)

    await fs.rename(tempStorage, uploadDir)
    const avatar = `/avatars/${id}/${originalname}`

    await User.findByIdAndUpdate(id, { avatarUrl: avatar })
    res.status(201).json({
      status: 'success',
      code: 200,
      data: {
        result: avatar,
      },
    })
  } catch (error) {
    await fs.unlink(tempStorage)
    throw error
  }
}

module.exports = addAvatar;
