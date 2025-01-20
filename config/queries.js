const pool = require('../db/connections');

const getDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

const getRoles = async () => {
  const result = await pool.query('SELECT * FROM role');
  return result.rows;
};

const getEmployees = async () => {
    const result = await pool.query('SELECT * FROM employee');
    return result.rows;
    }

module.exports = { getDepartments, getRoles, getEmployees };