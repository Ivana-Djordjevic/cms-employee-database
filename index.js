const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'random9!',
    database: 'work_db',
})

db.query('SELECT * FROM department;', (err, result) => {
    err ? console.log(err) : console.log(result)}
);

db.query('SELECT * FROM role;', (err, result) => {
    err ? console.log(err) : console.log(result)}
);

db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, role.salary, department.name AS department, employee.manager_id
            FROM employee 
            JOIN role 
            ON employee.role_id = role.id 
            JOIN department 
            ON role.department_id = department.id;`, (err, result) => {
    err ? console.log(err) : console.log(result)}
);

db.query('INSERT INTO department (name) VALUES (?);', 'placeholder' ,(err, result) => {
    err ? console.log(err) : console.log(result)}
);

db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', ['placeholder','10', '10' ] ,(err, result) => {
    err ? console.log(err) : console.log(result)}
);

db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?);', ['placeholder','placeholder', '10', '10' ] ,(err, result) => {
    err ? console.log(err) : console.log(result)}
);

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

