const router = require("express").Router();
const items = require("./itemController");

router.use("/items", items);

module.exports = router;
