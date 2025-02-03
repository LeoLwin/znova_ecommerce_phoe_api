require("dotenv").config();
const StatusCode = require("../helpers/status_code_helper");
const pool = require("../helpers/database_helper");
const fileHelper = require("../helpers/file_upload_helper");

const addItems = async (product_name, price, image) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction;
    const sql = `INSERT INTO items (product_name, price, image) VALUE (?, ?, ?)`;
    const [result] = await pool.query(sql, [product_name, price, image]);
    if (result.affectedRows == 0) {
      if (connection) await connection.release();
      return StatusCode.UNKNOWN("Fail to add items.");
    }
    return StatusCode.OK(null, "Item added successfully.");
  } catch (error) {
    if (connection) await connection.release();
    console.log("Add items error : ", error);
    return StatusCode.UNKNOWN(error.message);
  } finally {
    if (connection) await connection.release();
  }
};

const getItems = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const sql = `SELECT 
                    id,
                    product_name,
                    price,
                    CONCAT('${process.env.SERVER_URL}',image) AS image
                FROM items
                `;
    const [results] = await pool.query(sql);
    await connection.commit();
    if (results.length == 0) {
      if (connection) await connection.release();
      return StatusCode.NOT_FOUND("No items found.");
    }
    return StatusCode.OK(results);
  } catch (error) {
    if (connection) await connection.release();
    console.log("Get items error");
    return StatusCode.UNKNOWN(error.message);
  } finally {
    if (connection) await connection.release;
  }
};

const editItems = async (product_name, price, image, id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const searchSql = `SELECT image FROM items WHERE id = ?`;
    const [searchResult] = await connection.query(searchSql, [id]);
    console.log("SearchResult : ", searchResult);
    console.log("SearchResult length : ", searchResult.length);
    console.log("searchResult.length == 0 : ", searchResult.length == 0);

    if (searchResult.length == 0) {
      console.log("SearchResult ");
      if (connection) await connection.release();
      return StatusCode.NOT_FOUND("No item found.");
    }

    const imageUrl = searchResult[0].image;

    // Uncomment and implement file deletion logic if necessary
    const fileDelete = await fileHelper.fileDelete(imageUrl);
    if (fileDelete.code != "200") {
      if (connection) await connection.release();
      await fileHelper.fileDelete(image);
      return  fileDelete;
    }

    console.log("Upadte : ", { product_name, price, image, id });
    const updateSql = `UPDATE items SET product_name = ?, price = ?, image = ? WHERE id = ?`;
    const [updateResult] = await connection.query(updateSql, [
      product_name,
      price,
      image,
      id,
    ]);

    console.log("updateResult : ", updateResult);

    if (updateResult.affectedRows == 0) {
      if (connection) await connection.release();
      // Uncomment if file deletion is needed
      // await fileHelper.fileDelete(image);
      return StatusCode.UNKNOWN("Fail item update");
    }
   

    await connection.commit();
    return StatusCode.OK(null, "Success edit.");
  } catch (error) {
    console.log("Error : ", error);
    if (connection) await connection.release();
    return StatusCode.UNKNOWN(error.message);
  } finally {
    if (connection) await connection.release();
  }
};




module.exports = { addItems, getItems, editItems };
