const inquirer = require('inquirer')

inquirer
    .prompt([
        {
            type: 'list',
            message: 'Please choose from the following options...',
            name: 'userChoice',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role'] 
        }
    ])