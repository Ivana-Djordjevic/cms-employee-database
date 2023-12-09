// packages needed for app
require('dotenv').config();
const mysql = require('mysql2');

//connecting to MySQL db
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//function to view all the department data
function renderDepartmentData() {
    db.query('SELECT * FROM department;', (err, result) => {
        err ? console.log(err) : console.log(result)}
    );
};

//function to view all the role data
function renderRoleData() {
    db.query('SELECT * FROM role;', (err, result) => {
        err ? console.log(err) : console.log(result)}
    );
};

//function to view all of the employee data
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

//function to add a department
function addAdepartment(department) {
    db.query('INSERT INTO department (name) VALUES (?);', department ,(err, result) => {
        err ? console.log(err) : console.log('successfully added a department')
    });  
};

//function to add a role
function addArole(title, salary, departmentName) {
    db.query(`INSERT INTO department (name) VALUES (?);`, [departmentName], (err, result) => {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [title, salary, result.insertId], (err, result) => {
             err ? console.log(err) : console.log('successfully added a role');
        });
    });
};

//functino to add an employee
function AddEmployee(firstName, lastName, role, manager) {
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [firstName, lastName, role, manager], (err, results) => {
        err ? console.log(err) : console.log('successfully added an employee');
    });
};

//function to determine a role ID based on the person's title
function determineRoleId(role) {
    if (role === 'financial_analyst') return 1;
    if (role === 'accountant') return 2;
    if (role === 'legal_scretary') return 3;
    if (role === 'attorney') return 4;
    if (role === 'recruiter') return 5;
    if (role === 'HR_coordinator') return 6;
    if (role === 'HR_manager') return 7;
    if (role === 'computer_engineer') return 8;
    if (role === 'mechanical_engineer') return 9;
    if (role === 'chemical_engineer') return 10;
    if (role === 'engineering_director') return 11;
    if (role === 'director') return 12;
    if (role === 'project_manager') return 13;
    if (role === 'quality_director') return 14;
    if (role === 'quality_analysit') return 15;
};

//functino to update an employee's role
function updateEmployee(roleID, employeeID) {    
    db.query('UPDATE employee SET role_id = ? WHERE id = ?;', [roleID, employeeID] ,(err, result) => {
        err ? console.log(err) : console.log('successfully updated employee role')}
    );
};

//functino to determine an employee's ID based on their name
function determineEmployeedID(employeeName) {
    if (employeeName === 'Stella Bella') return 1;
    if (employeeName === 'Emma Mella') return 2;
    if (employeeName === 'Donna Tella') return 3;
    if (employeeName === 'Maya Zara') return 4;
    if (employeeName === 'Clara Luna') return 5;
    if (employeeName === 'Ava Gemma') return 6;
    if (employeeName === 'Layla Nova') return 7;
    if (employeeName === 'Mira Tala') return 8;
    if (employeeName === 'Anya Lara') return 9;
    if (employeeName === 'Neva Gina') return 10;
    if (employeeName === 'Flora Myra') return 11;
    if (employeeName === 'Sasha Yara') return 12;
    if (employeeName === 'Nalla Lyra') return 13;
    if (employeeName === 'Ella Rhea') return 14;
    if (employeeName === 'Kara Zora') return 15;
};

// function to update the employee's manager
function updateEmployeesManager(newManager, employeeID) {    
    db.query('UPDATE employee SET manager_id = ? WHERE id = ?;', [newManager, employeeID] ,(err, result) => {
        err ? console.log(err) : console.log('successfully updated employee\'s manager')}
    );
};

//function to view employees by managers
function renderEmployeesByManagers() {
    db.query(`  SELECT manager_id, 
                GROUP_CONCAT(' ', first_name, ' ', last_name) AS employee_names 
                FROM employee 
                GROUP BY manager_id;`, (err, result) => {
        err ? console.log(err) : console.log(result)
    });
};

//function to view employees by departments
function renderEmployeesByDepartment() {
    db.query(`  SELECT department.name AS department_name, 
                GROUP_CONCAT(CONCAT(employee.first_name, ' ', employee.last_name)) AS employee_names
                FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id
                GROUP BY department_name;`, (err, result) => {
        err ? console.log(err) : console.log(result)
    });
};

module.exports = { renderDepartmentData, renderRoleData, renderEmployeeData, addAdepartment, addArole, AddEmployee, determineRoleId, updateEmployee, determineEmployeedID, updateEmployeesManager, renderEmployeesByManagers, renderEmployeesByDepartment};