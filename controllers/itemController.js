const router = require("express").Router();
const fileUpload = require("../helpers/file_upload_helper");
const items = require("../models/itemModel");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addItems", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const { product_name, price } = req.body;
    const uploadResult = await fileUpload.fileUpload(file, product_name);
    const image = uploadResult.data;
    const result = await items.addItems(product_name, price, image);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.get("/getItems", async (req, res) => {
  try {
    const result = await items.getItems();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.put("/editItems/:id", upload.single("image"), async (req, res) => {
  console.log("Edit items :");
  try {
    const file = req.file;
    console.log("File ", file);
    if (!file) {
      return res.json("No file found");
    }
    const { id } = req.params;
    const { product_name, price } = req.body;
    const uploadResult = await fileUpload.fileUpload(file, product_name);
    const image = uploadResult.data;
    console.log("Image : ", image);
    const result = await items.editItems(product_name, price, image, id);
    console.log("Result : ", result);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
