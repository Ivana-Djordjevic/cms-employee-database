// packages needed for app
require('dotenv').config();
const mysql = require('mysql2');

const cyanBlueText = require('../utils/cyanblue');

//create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const dbPromise = db.promise();

//function to view all the department data
async function renderDepartmentData() {
    const result = await dbPromise.query('SELECT * FROM department;');
    console.table(result[0]);
}

//function to view all the role data
async function renderRoleData() {
    const result = await dbPromise.query('SELECT * FROM role;');
    console.table(result[0]);
};

//function to view all of the employee data
async function renderEmployeeData() {
    const result = await dbPromise.query(`
        SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, employee.manager_id
        FROM employee 
        JOIN role 
        ON employee.role_id = role.id 
        JOIN department 
        ON role.department_id = department.id;`);
    console.table(result[0]);
};

//function to add a department
async function addAdepartment(department) {
    await dbPromise.query('INSERT INTO department (name) VALUES (?);', department);
    cyanBlueText('successfully added a department');
};

//function to add a role
async function addArole(title, salary, departmentName) {
    const result = await dbPromise.query(`INSERT INTO department (name) VALUES (?);`, [departmentName]);
    const deparmentId = result.insertId;

    await dbPromise.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [title, salary, deparmentId]);
    cyanBlueText('successfully added a role');
};

//function to add an employee
async function addEmployee(firstName, lastName, role, manager) {
    await dbPromise.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [firstName, lastName, role, manager]);
    cyanBlueText('successfully added an employee');
};

//function to determine a role ID based on the person's title
async function determineRoleId(role) {
    const result = await dbPromise.query('SELECT id FROM role WHERE title = ?', [role]);
    const roleId = result[0][0].id;
    return roleId;
};

//function to update an employee's role
async function updateEmployee(roleID, employeeID) {    
    await dbPromise.query('UPDATE employee SET role_id = ? WHERE id = ?;', [roleID, employeeID]);
    cyanBlueText('successfully updated employee role');
};

//function to determine an employee's ID based on their name
async function determineEmployeedID(employeeName) {
    const firstName = employeeName.split(' ')[0]
    const lastName = employeeName.split(' ')[1]

    const result = await dbPromise.query('SELECT id FROM employee WHERE first_name = ? AND last_name = ?', [firstName, lastName]);
    const employeeId = result[0][0].id;
    return employeeId;
};

// function to update the employee's manager
async function updateEmployeesManager(newManager, employeeID) {    
    await dbPromise.query('UPDATE employee SET manager_id = ? WHERE id = ?;', [newManager, employeeID]);
    cyanBlueText('successfully updated employee\'s manager');
};

//function to view employees by managers
async function renderEmployeesByManagers() {
    const result = await dbPromise.query(`  
        SELECT manager_id, 
        GROUP_CONCAT(' ', first_name, ' ', last_name) AS employee_names 
        FROM employee 
        GROUP BY manager_id;`);
    console.table(result[0]);
};

//function to view employees by departments
async function renderEmployeesByDepartment() {
    const result = await dbPromise.query(`
        SELECT department.name AS department_name, 
        GROUP_CONCAT(CONCAT(employee.first_name, ' ', employee.last_name)) AS employee_names
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        GROUP BY department_name;`);
    console.table(result[0]);
};

//function to view the budget of each department
async function renderBudgetOfEachDepartment() {
    const result = await dbPromise.query(`
        SELECT department.name AS department_name, 
        SUM(role.salary) AS total_budget
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        GROUP BY department_name;`);
    console.table(result[0]);
};

//function to detele an employee based on employee ID
async function deleteEmployee(employeeID) {
    await dbPromise.query('DELETE FROM employee WHERE id = ?;', [employeeID]);
    cyanBlueText('successfully deleted employee');
};

//function to delete a role and its employees
async function deleteRoleAndItsEmployees(roleId) {
    await dbPromise.query('DELETE FROM role WHERE id = ?', [roleId]);
    cyanBlueText('successfully deleted a role');
 
    await dbPromise.query('DELETE FROM employee WHERE role_id = ?', [roleId]);
    cyanBlueText('successfully deleted the employee(s) that shared that role');
};

//funtion to determine department id
async function determineDepartmentId(department) {
    const result = await dbPromise.query('SELECT id FROM department WHERE name = ?', [department]);
    const deparmentId = result[0][0].id;
    return deparmentId;
};

//function to delete the entirety of a department
async function deleteEntireDepartment(deparmentId) {
    await dbPromise.query('DELETE FROM department WHERE id = ?', [deparmentId]);
    cyanBlueText('successfully deleted a department');
    
    await dbPromise.query('DELETE FROM role WHERE department_id = ?', [deparmentId]);
    cyanBlueText('successfully deleted its role and employee(s)');
};

module.exports = { renderDepartmentData, renderRoleData, renderEmployeeData, addAdepartment, addArole, addEmployee, determineRoleId, updateEmployee, determineEmployeedID, updateEmployeesManager, renderEmployeesByManagers, renderEmployeesByDepartment, renderBudgetOfEachDepartment, deleteEmployee, deleteRoleAndItsEmployees, determineDepartmentId, deleteEntireDepartment };