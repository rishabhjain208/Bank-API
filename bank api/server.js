const express = require("express");
const bodyParser = require("bodyParser");
const cors = require("cors");
const bankRoutes = require("./routes/bank");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/banks", bankRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
