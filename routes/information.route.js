const express = require("express");
const router = express.Router();
const informationController = require("../controllers/information.controller");
const { auth } = require("../middleware/auth");

router.get("/banner", auth, informationController.getAllBanners);
router.get("/services", auth, informationController.getAllServices);

module.exports = router;
