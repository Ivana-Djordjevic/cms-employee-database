// packages needed for this application

// const init = ('./inquire')
const mysql = require('mysql2');

const inquirer = require('inquirer');

const { validateMessage } = require('./utils/validate');

// questions for user input
const questions = [
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?', 
        choices: [ 
                    'view all departments', 
                    'view all roles', 
                    'view all employees', 
                    'add a department', 
                    'add a role', 
                    'add an employee', 
                    'update an employee role', 
                ],
        default: 'view all departments'
    }
]

const departmentInfo = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you\'d like to add?',
        validate: validateMessage
    }
]

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'random9!',
    database: 'work_db',
})

//returns user's answers
async function init() {
    
    try {
        let answers = await inquirer.prompt(questions);

        if (answers.start === 'view all departments') {
            renderDepartmentData();
        } 
        else if (answers.start === 'view all roles') {
            renderRoleData();
        } 
        else if (answers.start === 'view all employees') {
            renderEmployeeData();
        } 
        else if (answers.start === 'add a department') {
            let department = await inquirer.prompt(departmentInfo)
            department = department.start
            addAdepartment(department);
        }   
        else if (answers.start === 'add a role') {
            addArole();
        }
        else if (answers.start === 'add an employee') {
            AddEmployee();
        }
        else if (answers.start === 'update an employee role') {
        }
        else {
            updateEmployee();
        }
    } catch (err) {
        console.log(`this is your error: ${err}`)
    }
}

init();


function renderDepartmentData() {
    db.query('SELECT * FROM department;', (err, result) => {
        err ? console.log(err) : console.log(result)}
    );
};

function renderRoleData() {
    db.query('SELECT * FROM role;', (err, result) => {
        err ? console.log(err) : console.log(result)}
    );
};

function renderEmployeeData() {
    db.query(`SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, role.salary, department.name AS department, employee.manager_id
                FROM employee 
                JOIN role 
                ON employee.role_id = role.id 
                JOIN department 
                ON role.department_id = department.id;`, (err, result) => {
        err ? console.log(err) : console.log(result)}
    );
};

function addAdepartment(department) {
    db.query('INSERT INTO department (name) VALUES (?);', department ,(err, result) => {
        err ? console.log(err) : console.log(result)}
    );  
};

function addArole() {
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', ['placeholder','10', '10' ] ,(err, result) => {
        err ? console.log(err) : console.log(result)}
    );
};

function AddEmployee() {
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?);', ['placeholder','placeholder', '10', '10' ] ,(err, result) => {
        err ? console.log(err) : console.log(result)}
    );
};

//not functional
function updateEmployee() {
    db.query('UPDATE role SET title = ? WHERE ;', ['placeholder','placeholder', '10', '10' ] ,(err, result) => {
        err ? console.log(err) : console.log(result)}
    );
}

// combines both tables togethether 

// SELECT * FROM employee 
// JOIN role 
// ON employee.role_id = role.id;

// combines wanted columns from both tables

// SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary 
// FROM employee 
// JOIN role  
// ON employee.role_id = role.id;

//selects what we wanna see for the employee
/* 

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id
FROM employee 
JOIN role 
ON employee.role_id = role.id 
JOIN department 
ON role.department_id = department.id;


//selects what we wanna see for the employee with proper column names
/* 

SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, role.salary, department.name AS department, employee.manager_id
FROM employee 
JOIN role 
ON employee.role_id = role.id 
JOIN department 
ON role.department_id = department.id;

*/

