const { RequestError } = require("../../helpers/requestError");
const { User } = require("../../db/userModel");
const sgMail = require('@sendgrid/mail');

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




const reverifyService = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(404, 'User not found');
    }
    if (user.verify) {
        throw RequestError(400, "Verification has already been passed");
    }
    await sendMail(email, user.verificationToken)

};
module.exports = reverifyService;