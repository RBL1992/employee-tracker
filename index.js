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

    db.query('SELECT * FROM departments;', function (err, results) {
        if (err) throw err;
        console.table(results);
    });
    start();
};

function viewAllRoles() {

    db.query('SELECT * FROM role;', function (err, results) {
        if (err) throw err;
        console.table(results);
    });
    start();
};

function viewAllEmployees() {

    db.query('SELECT * FROM employee;', function (err, results) {
        if (err) throw err;
        console.table(results);
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
    ).then(({ name }) => {
        // console.log(name);
        db.query('INSERT INTO departments (name) VALUE (?);', name, (err, res) => {
            if (err) throw err;
            console.log('Department Created...');
            start();
        })
    })
}

function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role you want to add?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary of the role you want to add?',
            name: 'salary',
            // validate: function (input) {
            //     console.log(typeof input);
            //      console.log(parseInt(input.replace(/,/g, '')));
            //      console.log(isNaN(parseInt(input.replace(/,/g, ''))));

            //     if (isNaN(parseFloat(input.replace(/,/g, '')))){
            //         return false

            //     } else {
            //         return true;
            //     }

            //     }  worked on function with professor to get around mysql not excepting comma is salary input

        },
        {
            type: 'number',
            message: 'What is the department id of the role you want to add?',
            name: 'department_id'
        }]
    ).then((results) => {
        // console.log(results);
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?);', [results.title, results.salary, results.department_id], (err, res) => {
            if (err) throw err;
            console.log('Role Created...');
            start();
        })
    })
}

function addAnEmployee() {
    let roles = [];
    let managers = [];

    db.query('SELECT title FROM role', (err, res) => {
        for (let i = 0; i < res.length; i++) {
            roles.push(res[i].title)
        }
    })

    db.query('SELECT CONCAT(employee.first_name, " ",employee.last_name) as manager FROM employee', (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            managers.push(result[i].manager);
        }
    })

    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: 'first_name'
            },
            {
                type: 'input',
                message: 'What is the employees last name?',
                name: 'last_name'
            },
            {
                type: 'list',
                message: 'What is the employees role?',
                name: 'title',
                choices: roles
            },
            {
                type: 'list',
                message: 'Who is the employees manager?',
                name: 'manager',
                choices: managers
            }
    ]).then((data) => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);', [data.first_name, data.last_name, data.title, data.manager], (err, res) => {
            if (err) throw err;
            console.log('Employee Created...');
            start();
        })
    })
}

function updateEmployeeRole() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;

        let employees = [];
        let roles = [];

        for (let i = 0; i < res.length; i++) {
            employees.push(res[i].employee_id)
        }

        db.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
        for (let i = 0; i < res.length; i++)
            roles.push(res[i].role_id)
        })

        inquirer.prompt([
            {
                type: 'list',
                message: 'Whose role do you want to update?',
                name: 'employee_id',
                choices: employees,
            },
            {
                type: 'list',
                message: 'What do you want the updated role to be?',
                name: 'role_id',
                choices: roles,

            }

        ]).then(({employee_id, role_id}) => {
            // console.log(employee_id, role_id);
            db.query(`UPDATE employee SET role_id = ? WHERE employee_id = (?)`, [role_id, employee_id], (err, res) => {
                if (err) throw err;
                console.log('Employee Role Updated!');
                start();
            })
        })
    })
}

function removeEmployee() {
    db.query('SELECT * FROM employee', (err,res) => {
        if (err) throw err;

        let employees = [];

        for (let i = 0; i < res.length; i++) {
            employees.push(res[i].first_name)
        }

        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee do you want to delete?',
                name: 'first_name',
                choices: employees,
            },
        ]).then(({first_name}) => {
            db.query(`DELETE FROM employee WHERE first_name = (?);`, first_name, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result + 'was deleted...');
                start();
            });
        }) 
    }) 
    
}

function removeRole() {
    db.query('SELECT * FROM role', (err,res) => {
        if (err) throw err;

        let roles = [];

        for (let i = 0; i < res.length; i++) {
            roles.push(res[i].title)
        }

        inquirer.prompt([
            {
                type: 'list',
                message: 'Which role do you want to delete?',
                name: 'title',
                choices: roles,
            },
        ]).then(({title}) => {
            db.query(`DELETE FROM role WHERE title = (?);`, title, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result + 'was deleted...');
                start();
            });
        }) 
    }) 
}

// function removeDepartment(data) {
//     db.query(`DELETE FROM departments WHERE id = (?);`, data, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(result);
//     });
// }


start();

app.listen(PORT, () => {
    // console.log(`Server started on http://localhost:${PORT}`);
});