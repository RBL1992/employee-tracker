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
    .then((answers) => {
        switch (answers.userChoice) {
            case "view all departments":
                viewAllDepartments();
                break;
            case "view all roles":
                viewAllRoles();
                break;
            case "view all employees":
                viewAllEmployees();
                break;
            case "add a department" :
                addADepartment();
                break;
            case "add a role" :
                addARole();
                break; 
            case "add an employee" :
                addAnEmployee();
                break;
            case "update employee role" :
                updateEmployeeRole();
                break;              
        }
    })