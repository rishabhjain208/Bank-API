const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/bankDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const BranchSchema = new mongoose.Schema({
  ifsc: { type: String, required: true },
  bank_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    required: true,
  },
  branchName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  bankName: { type: String, required: true },
});

const BankSchema = new mongoose.Schema({
  name: String,
  branches: [BranchSchema],
});

const Bank = mongoose.model("Bank", BankSchema);
module.exports = { Bank };
