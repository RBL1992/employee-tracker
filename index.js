const inquirer = require('inquirer')
const mysql = require('mysql2')
const express = require('express')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: 'root',
        password: 'rootroot',
        database: 'employeeTracker_db',
    },
    console.log(`Connected to the employeeTracker_db.`)
)

db.query('select * from departments', function (err, depResults){
    console.log(depResults);
})

db.query('select * from role', function (err, roleResults){
    console.log(roleResults);
})

db.query('select * from employee', function (err, empResults){
    console.log(empResults);
})

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
            case "add a department":
                addADepartment();
                break;
            case "add a role":
                addARole();
                break;
            case "add an employee":
                addAnEmployee();
                break;
            case "update employee role":
                updateEmployeeRole();
                break;
        }
    })

    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
      });