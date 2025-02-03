const { dir } = require("console");
const StatusCode = require("./status_code_helper");
const path = require("path");
const fs = require("fs").promises;

const fileUpload = async (file) => {
  try {
    const fileName = file.originalname; // Use the original file extension
    console.log("FileName : ", fileName);
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

const fileDelete = async (fileName) => {
  try {
    console.log("Dir : ", process.cwd());
    // Set the uploads folder inside the project
    const projectDir = process.cwd();
    const filePath = path.join(projectDir, fileName);
    console.log("FilePath : ", filePath);

    // Check if the file exists before deleting
    await fs.access(filePath);
    await fs.unlink(filePath);

    console.log("File deleted:", filePath);
    console.log()
    return StatusCode.OK("File deleted successfully.");
  } catch (error) {
    if (error.code === "ENOENT") {
      return StatusCode.NOT_FOUND("File not found.");
    }
    console.log("File delete error:", error);
    return StatusCode.UNKNOWN(error.message);
  }
};

module.exports = {
  fileUpload,
  fileDelete,
};
