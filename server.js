const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const membershipRoutes = require("./routes/membership.route");
const informationRoutes = require("./routes/information.route");
const transactionRoutes = require("./routes/transaction.route");

dotenv.config();
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: 0, message: "Welcome to Payment System", data: null });
});

app.use("/membership", membershipRoutes);
app.use("/information", informationRoutes);
app.use("/transaction", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
