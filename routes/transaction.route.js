const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");
const { auth } = require("../middleware/auth");

router.get("/balance", auth, transactionController.getBalance);
router.post("/topup", auth, transactionController.topUpBalance);
router.post("/transaction", auth, transactionController.createTransaction);
router.get(
  "/transaction/history",
  auth,
  transactionController.getTransactionHistory
);

module.exports = router;
