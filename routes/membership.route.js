const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membership.controller");
const { auth } = require("../middleware/auth");
const uploadHandler = require("../middleware/upload");

router.post("/registration", membershipController.registration);
router.post("/login", membershipController.login);
router.get("/profile", auth, membershipController.getProfile);
router.put("/profile", auth, membershipController.updateProfile);
router.put(
  "/profile/image",
  auth,
  uploadHandler,
  membershipController.updateProfileImage
);

module.exports = router;
