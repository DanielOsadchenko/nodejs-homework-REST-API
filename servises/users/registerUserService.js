const { User } = require("../../db/userModel");
const gravatar = require("gravatar");

const registerUserService = async (email, password) => {
  const user = new User({
    email,
    password,
    avatarURL: gravatar.url(email, { protocol: "https" }),
  });
  await user.save();

  return user;
};
module.exports = { registerUserService };
