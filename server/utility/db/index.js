"use strict";
const { pool } = require("../../dbconfig");

const response = (res, data, success = true, statusCode = 200) => {
  res.status(statusCode);
  res.json({
    success,
    data,
    message: success ? "Operation successful" : "Operation failed",
  });
};

const select = async (table, fields = "*") => {
  try {
    const query = `SELECT ${fields} FROM ${table}`;
    const result = await pool.query(query);
    return result;
  } catch (error) {
    console.error(`Error selecting records from ${table}: ${error}`);
    return null;
  }
};

const insertRecord = async (data, table) => {
  try {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO ${table} (${columns.join(
      ", "
    )}) VALUES (${columns
      .map((column, index) => `:${column}_${index}`)
      .join(", ")})`;
    const result = await pool.execute(query, data);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error inserting record into ${table}: ${error}`);
    return false;
  }
};

const selectWhere = async (conditions, table, fields) => {
  try {
    const query = `SELECT ${fields.join(", ")} FROM ${table} WHERE `;
    const whereClauses = conditions.map((condition) => {
      return `${condition.field} = ?`;
    });
    query += whereClauses.join(" AND ");
    const params = conditions.map((condition) => condition.value);
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error(`Error selecting records from ${table}: ${error}`);
    return [];
  }
};

const updateRecord = async (data, table, field, value) => {
  try {
    const query = `UPDATE ${table} SET ? WHERE ${field} = ?`;
    const result = await pool.query(query, [data, value]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error updating record in ${table}: ${error}`);
    return false;
  }
};

module.exports = { response, select, selectWhere, insertRecord, updateRecord };
