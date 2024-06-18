const Bank = require("../models/bankSchema");

// Get all banks
const getAllBanks = async (req, res) => {
  try {
    const bank = await Bank.find();
    res.status(200).json({
      message: "Successfully get bank details",
      bank,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get branch details for a specific bank
const getBranchDetails = async (req, res) => {
  const { bankName, branchName } = req.params;

  try {
    const bank = await Bank.findOne({ name: bankName });
    if (!bank) {
      // Find the bank by name
      return res.status(404).json({
        message: "Bank not found",
      });
    }

    // Find the branch within the bank's branches
    const branch = bank.branches.find(
      (branch) => branch.branchName === branchName
    );
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Respond with the branch details
    res.status(200).json({ message: "Branch found", branch });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBanks,
  getBranchDetails,
};
