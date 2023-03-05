const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const usersSchema = require("../../schemas/users");
const registerUserController = require("../../controller/users/registerUserController");
const loginUserController = require("../../controller/users/loginUserController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  logoutUserController,
} = require("../../controller/users/logoutUserController");
const {
  currentUserController,
} = require("../../controller/users/currentUserController");
const {
  updateUserAvatarController,
} = require("../../controller/users/updateUserAvatarController");
const multer = require("multer");
const path = require("path");
const verificationController = require("../../controller/users/verificationController");
const reverifyController = require("../../controller/users/reverifyController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./tmp"));
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${filename}.${extension}`);
  },
});
const uploadMiddleware = multer({ storage });

const router = express.Router();

router.post(
  "/signup",
  validation(usersSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  "/login",
  validation(usersSchema),
  ctrlWrapper(loginUserController)
);

router.get('/verify/:verificationToken', ctrlWrapper(verificationController));
router.post('/verify', ctrlWrapper(reverifyController));

router.use(authMiddleware);
router.get("/logout", ctrlWrapper(logoutUserController));
router.get("/current", ctrlWrapper(currentUserController));

router.patch(
  "/avatars",
  uploadMiddleware.single("avatar"),
  ctrlWrapper(updateUserAvatarController)
);
module.exports = router;
