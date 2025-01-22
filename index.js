const db = require('./db/connections');
const { getDepartments, getRoles, getEmployees, addDepartment, addRole } = require('./config/queries');
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
        case 'Exit':
            exit = true;
            break;
      }
    }
  };
  
  init();