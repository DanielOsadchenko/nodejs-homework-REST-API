const { RequestError } = require("../../helpers/requestError");
const reverifyService = require("../../servises/users/reverifyService");

const reverifyController = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw RequestError(400, "missing required field email");
    }
    await reverifyService(email);
    res.status(200).json("Verification email sent");
};
module.exports = reverifyController;