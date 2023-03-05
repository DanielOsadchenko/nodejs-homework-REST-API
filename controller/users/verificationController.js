const verificationService = require("../../servises/users/verificationService");


const verificationController = async (req, res) => {
    const { verificationToken } = req.params;
    await verificationService(verificationToken);
    res.status(200).json('Verification successful');
};

module.exports = verificationController;