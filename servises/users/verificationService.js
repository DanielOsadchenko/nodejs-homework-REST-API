const { User } = require("../../db/userModel");
const { RequestError } = require("../../helpers/requestError");

const verificationService = async (verificationToken) => {
    const user = await User.findOneAndUpdate({ verificationToken }, { $set: { verificationToken: null, verify: true }});
    
    if (!user) {
        throw RequestError(404, 'User not found');
    }
    
};
module.exports = verificationService;