const db = require('./db/connections');
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./config/queries');
const MainMenu = require('./index');

// Added for troubleshooting purposes only
/* db.query('SELECT * FROM department', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to the database', res.rows);
    db.end();
}); */

const inquirer = require('inquirer');

const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'exit',
            ],
        },
    ]);

    return choice;
};

module.exports = mainMenu;

const init = async () => {
    let exit = false;
    while (!exit) {
        const choice = await mainMenu();
        switch (choice) {
            case 'View All Departments':
                const departments = await getDepartments();
                console.table(departments);
                break;
            case 'View All Roles':
                const roles = await getRoles();
                console.table(roles);
                break;
            case 'View All Employees':
                const employees = await getEmployees();
                console.table(employees);
                break;
            case 'Add a Department':
                const { name } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of the department?',
                    },
                ]);
                await addDepartment(name);
                break;
            case 'Add a Role':
                const { title, salary, department_id } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the title of the role?',
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary for this role?',
                        validate: (value) => !isNaN(value) || 'Please enter a valid number',
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'What is the department ID for this role?',
                        validate: async (value) => {
                            if (isNaN(value)) return 'Please enter a valid number';
                            const validateDepartmentId = require('./config/queries').validateDepartmentId;
                            const exists = await validateDepartmentId(value);
                            return exists || 'Invalid department ID. Please enter an existing department ID.';
                        },
                    },
                ]);
                await addRole(title, salary, department_id);
                console.log('Role added successfully!');
                break;
            case 'Add an Employee':
                const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'What is the employee\'s first name?',
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'What is the employee\'s last name?',
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'Enter role ID:',
                        validate: async (value) => {
                            if (isNaN(value)) return 'Please enter a valid number';
                            const roles = await getRoles();
                            const validRoleIds = roles.map(role => role.id);
                            return validRoleIds.includes(Number(value)) || 'Invalid role ID. Please enter an existing role ID.';
                        },
                    },
                    {
                        type: 'input',
                        name: 'manager_id',
                        message: 'Enter manager ID:',
                        validate: (value) => !isNaN(value) || 'Please enter a valid number',
                    },
                ]);
                await addEmployee(first_name, last_name, role_id, manager_id);
                console.log('Employee added successfully!');
                break;
                case 'Update an Employee Role':
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter employee ID to update:',
            validate: (value) => !isNaN(value) || 'Please enter a valid numeric employee ID',
          },
          {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter new role ID:',
            validate: (value) => !isNaN(value) || 'Please enter a valid numeric role ID',
          },
      ]);
      await updateEmployeeRole(employeeId, newRoleId);
      break;
            case 'Exit':
                exit = true;
                console.log('Goodbye!');
                break;
        }
    }
};

init();