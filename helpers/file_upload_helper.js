const StatusCode = require("./status_code_helper");
const path = require("path");
const fs = require("fs").promises;

const fileUpload = async (file, name) => {
  try {
    const fileName = `${path.extname(file.originalname)}`; // Use the original file extension
    const uploadDir = path.join(__dirname, "../uploads");
    const filePath = path.join(uploadDir, fileName);

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Write the file to the specified directory
    await fs.writeFile(filePath, file.buffer); // file.buffer for the file content

    const fileUrl = `/uploads/${fileName}`;
    console.log(fileUrl);

    return StatusCode.OK(fileUrl);
  } catch (error) {
    console.log("File upload Error : ", error);
    return StatusCode.UNKNOWN(error.message);
  }
};

module.exports = {
  fileUpload,
};
