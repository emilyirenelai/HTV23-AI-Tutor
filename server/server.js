const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routes
app.use("/encode", require("./routes/encode"));
app.use("/recognize", require("./routes/recognize"));
app.use("/summarize", require("./routes/summarize"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
