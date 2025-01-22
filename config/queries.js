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

const addDepartment = async (name) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    }

const addRole = async (title, salary, department_id) => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    }

const validateDepartmentId = async (id) => {
    const result = await pool.query('SELECT id FROM department WHERE id = $1', [id]);
    return result.rowCount > 0;
    };

module.exports = { getDepartments, getRoles, getEmployees, addDepartment, addRole, validateDepartmentId };