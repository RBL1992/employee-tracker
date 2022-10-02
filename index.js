const inquirer = require('inquirer')
const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')
const Department = require('./lib/Department.js');

let department = new Department();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create connection
const db = mysql.createConnection(
    {
        host: "localhost",
        user: 'root',
        password: 'rootroot',
        database: 'employeeTracker_db',
    },
    console.log(`Connected to the employeeTracker_db.`)
)

// connect to MySQL
db.connect(err =>{
    if(err){
        throw err
    }
    console.log('MySQL Connected')
})

const start = ()=> {

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
                    viewAllDeparments();
                    start();
                    break;
                case "view all roles":
                    viewAllRoles();
                    start();
                    break;
                case "view all employees":
                    viewAllEmployees();
                    start();
                    break;
                case "add a department":
                    addADepartment();
                    start();
                    break;
                case "add a role":
                    addARole();
                    start();
                    break;
                case "add an employee":
                    addAnEmployee();
                    start();
                    break;
                case "update employee role":
                    updateEmployeeRole();
                    start();
                    break;
            }
        })
}

function viewAllDeparments(){
    "SELECT * FROM departments"
}

start();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});