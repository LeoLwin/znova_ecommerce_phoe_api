require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const items = require("./controllers/indexController");

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  console.log("Hello");
  res.send("Testing");
});

app.use("/", items);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
