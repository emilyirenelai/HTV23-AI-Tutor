const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// routes
app.use("/text-recognition", require("./routes/text-recognition"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
