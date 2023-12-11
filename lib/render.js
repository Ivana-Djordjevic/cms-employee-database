// packages needed for app
require('dotenv').config();
const mysql = require('mysql2');

const cyanBlueText = require('../utils/cyanblue')

//create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//function to view all the department data
function renderDepartmentData(init) {
   db.query('SELECT * FROM department;', (err, result) => {
        err ? console.log(err) : console.table(result)
        init();
    });
};

//function to view all the role data
function renderRoleData(init) {
    db.query('SELECT * FROM role;', (err, result) => {
        err ? console.log(err) : console.table(result)
        init();
    });
};

//function to view all of the employee data
function renderEmployeeData(init) {
    db.query(`SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, employee.manager_id
                FROM employee 
                JOIN role 
                ON employee.role_id = role.id 
                JOIN department 
                ON role.department_id = department.id;`, (err, result) => {
        err ? console.log(err) : console.table(result)
        init();
    });
};

//function to add a department
function addAdepartment(department, init) {
    db.query('INSERT INTO department (name) VALUES (?);', department ,(err, result) => {
        err ? console.log(err) : cyanBlueText('successfully added a department')
        init();
    });  
};

//function to add a role
function addArole(title, salary, departmentName, init) {
    db.query(`INSERT INTO department (name) VALUES (?);`, [departmentName], (err, result) => {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [title, salary, result.insertId], (err, result) => {
             err ? console.log(err) : cyanBlueText('successfully added a role');
             init();
        });
    });
};

//functino to add an employee
function AddEmployee(firstName, lastName, role, manager, init) {
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [firstName, lastName, role, manager], (err, results) => {
        err ? console.log(err) : cyanBlueText('successfully added an employee');
        init();
    });
};

//function to determine a role ID based on the person's title
function determineRoleId(role, cb) {
    db.query('SELECT id FROM role WHERE title = ?', [role], (err, result) => {
        err ? console.log(err) : console.log(result)
        cb(result.id);
    });
};

//function to update an employee's role
function updateEmployee(roleID, employeeID, init) {    
    db.query('UPDATE employee SET role_id = ? WHERE id = ?;', [roleID, employeeID] ,(err, result) => {
        err ? console.log(err) : cyanBlueText('successfully updated employee role')
        init();
    });
};

//functino to determine an employee's ID based on their name
function determineEmployeedID(employeeName, cb) {
    const firstName = employeeName.split(' ')[0]
    const lastName = employeeName.split(' ')[1]

    db.query('SELECT id FROM employee WHERE first_name = ? AND last_name = ?', [firstName, lastName], (err, result) => {
       if (err) console.log(err);
        cb(result.id);
    })
};

// function to update the employee's manager
function updateEmployeesManager(newManager, employeeID, init) {    
    db.query('UPDATE employee SET manager_id = ? WHERE id = ?;', [newManager, employeeID] ,(err, result) => {
        err ? console.log(err) : cyanBlueText('successfully updated employee\'s manager')
        init();
    });
};

//function to view employees by managers
function renderEmployeesByManagers(init) {
    db.query(`  SELECT manager_id, 
                GROUP_CONCAT(' ', first_name, ' ', last_name) AS employee_names 
                FROM employee 
                GROUP BY manager_id;`, (err, result) => {
        err ? console.log(err) : console.table(result)
        init();
    });
};

//function to view employees by departments
function renderEmployeesByDepartment(init) {
    db.query(`  SELECT department.name AS department_name, 
                GROUP_CONCAT(CONCAT(employee.first_name, ' ', employee.last_name)) AS employee_names
                FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id
                GROUP BY department_name;`, (err, result) => {
        err ? console.log(err) : console.table(result)
        init();
    });
};

//function to view the budget of each department
function renderBudgetOfEachDepartment(init) {
    db.query(`  SELECT department.name AS department_name, 
                SUM(role.salary) AS total_budget
                FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id
                GROUP BY department_name;`, (err, result) => {
        err ? console.log(err) : console.table(result)
        init()
    });
};

//function to detele an employee based on employee ID
function deleteEmployee(employeeID, init) {
    db.query('DELETE FROM employee WHERE id = ?;', [employeeID], (err, result) => {
        err ? console.log(err) : cyanBlueText('successfully deleted employee');
        init();
    });
};

function deleteRoleAndItsEmployees(roleId, init) {
    db.query('DELETE FROM role WHERE id = ?', [roleId], (err, result) => {
        err ? console.log(err) : cyanBlueText('successfully deleted a role');
    });
    db.query('DELETE FROM employee WHERE role_id = ?', [roleId], (err, result) => {
        err ? console.log(err) : cyanBlueText('successfully deleted the employee(s) that shared that role');
        init();
    });
};

module.exports = { renderDepartmentData, renderRoleData, renderEmployeeData, addAdepartment, addArole, AddEmployee, determineRoleId, updateEmployee, determineEmployeedID, updateEmployeesManager, renderEmployeesByManagers, renderEmployeesByDepartment, renderBudgetOfEachDepartment, deleteEmployee, deleteRoleAndItsEmployees };