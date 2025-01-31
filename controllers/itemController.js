const router = require("express").Router();
const fileUpload = require("../helpers/file_upload_helper");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addItems", upload.single("image"), async (req, res) => {
  try {
    console.log("File : ", req.file);
    const file = req.file;
    console.log("req.body : ", req.body);
    const { product_name, price } = req.body;
    const uploadResult = await fileUpload.fileUpload(file,product_name);
    console.log("AddItems", { product_name, price });
    res.json(uploadResult);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
