const inquirer = require('inquirer')
const mysql = require('mysql2')
const express = require('express')
const cTable = require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
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
    // console.log(`Connected to the employeeTracker_db.`)
)

// // connect to MySQL
// db.connect(err =>{
//     if(err) throw err;
//     // console.log('MySQL Connected');
// })

const start = () => {

    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Please choose from the following options...',
                name: 'userChoice',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'remove employee', 'remove role', 'remove department', 'exit']
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
                case "remove employee":
                    removeEmployee();
                    break;
                case "remove role":
                    removeRole();
                    break;
                case "remove department":
                    removeDepartment();
                    break;
                case "exit":
                    console.log("Thank you for using my CL Employee Tracker!");
                    db.close();
            }
        })
}

function viewAllDeparments() {

    db.query('SELECT * FROM departments', function (err, results) {
        if (err) throw err;
        console.table([results]);
    });
    start();
};

function viewAllRoles() {

    db.query('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        console.table([results]);
    });
    start();
};

function viewAllEmployees() {

    db.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        console.table([results]);
    });
    start();
};

function addADepartment() {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of the department you want to add?',
            name: 'name'
        }
    ).then((data)=> {
        db.query('INSERT INTO departments (name) VALUE (?)', data, (err, res) => {
                if (err) throw err;
                console.log('Department Created...');
            })
    })
}

function updateEmployeeRole(){

}

function removeEmployee(data){
    db.query(`DELETE FROM employee WHERE id = ?`, data , (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

function removeRole(data){
    db.query(`DELETE FROM role WHERE id = ?`, data , (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

function removeDepartment(data){
    db.query(`DELETE FROM departments WHERE id = ?`, data , (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}


start();

app.listen(PORT, () => {
    // console.log(`Server started on http://localhost:${PORT}`);
});