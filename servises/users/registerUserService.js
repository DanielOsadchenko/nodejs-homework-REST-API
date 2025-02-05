const { User } = require("../../db/userModel");
const gravatar = require("gravatar");
const sgMail = require('@sendgrid/mail');
const { uuid } = require('uuidv4');


const sendMail = (email, verifyToken) => {
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: email,
  from: 'dm.osadchenko@gmail.com',
  subject: 'Please verify your account',
  text: `http://localhost:3000/api/users/verify/${verifyToken}`,
  html: `<strong>This is the last step before we start! http://localhost:3000/api/users/verify/${verifyToken}</strong>`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

const registerUserService = async (email, password) => {
  const verifyToken = uuid()
  const user = new User({
    email,
    password,
    avatarURL: gravatar.url(email, { protocol: "https" }),
    verificationToken: verifyToken,
  });
  await user.save();
  await sendMail(email, verifyToken);

  return user;
};
module.exports = { registerUserService };
