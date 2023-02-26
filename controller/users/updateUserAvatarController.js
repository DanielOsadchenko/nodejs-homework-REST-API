const { User } = require("../../db/userModel");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const RequestError = require("../../helpers/requestError");
const { v4: uuidv4 } = require("uuid");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatarController = async (req, res) => {
  if (!req.file) {
    throw RequestError(400, "avatar is required");
  }
  const { _id } = req.user;

  const { path: tempPath, originalname } = req.file;
  const newName = `${_id}_${originalname}_${uuidv4()}`;

  try {
    const resultPath = path.join(avatarsDir, newName);

    await Jimp.read(tempPath)
      .then((avatar) => {
        return avatar.resize(250, 250).write(resultPath);
      })
      .catch((err) => {
        throw err;
      });

    const avatarURL = path.join("avatars", newName);

    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { avatarURL },
      {
        new: true,
      }
    );

    res.status(200).json({ avatarURL: updatedUser.avatarURL });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await fs.unlink(tempPath);
  }
};

module.exports = { updateUserAvatarController };
