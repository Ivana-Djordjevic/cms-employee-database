// packages needed for this application
const { validateMessage } = require('../utils/validate');

const { renderEmployeeInfo, renderRoleInfo, renderDepartmentInfo, renderManagerInfo } = require('./render');

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
                    'view employees by managers',
                    'view employees by department',
                    'view total budget of each department',
                    'add a department', 
                    'add a role', 
                    'add an employee', 
                    'update an employee role',
                    'update an employee\'s manager',
                    'delete an employee',
                    'delete a role and its employee(s)',
                    'delete an entire department',
                    'quit'
                ],
        default: 'view all departments'
    }
];

// questions for creation of a new department
const departmentInfo = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you\'d like to add?',
        validate: validateMessage
    }
];

//questions for creation of a new role
const roleInfo = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the roles\'s title?',
        validate: validateMessage
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the roles\'s salary?',
        validate: validateMessage
    },
    {
        type: 'input',
        name: 'department',
        message: 'What is the roles\'s department?',
        validate: validateMessage
    } 
];

//questions for creation of a new Employee
const employeeInfo = async () => [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s first name?',
        validate: validateMessage
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?',
        validate: validateMessage
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: await renderRoleInfo(),
        default: 'financial_analyst'
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is the employee\'s manager?',
        choices: await renderManagerInfo(),
    }
];

//questions for updating employee's role
const employeeUpdate = async () => [
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee\'s role would you like to update?',
            choices:  await renderEmployeeInfo(),
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s new role?',
            choices: await renderRoleInfo(),
        },
    ];

//questions for updating employee's manager
const employeeManagerUpdate = async () => [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee\'s manager would you like to update?',
        choices: await renderEmployeeInfo(),
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Which manager would you like to re-assign to?',
        choices: await renderManagerInfo(),
    }
];

//questions for deleting an employee
const employeeDeletion = async () =>  [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to delete?',
        choices: await renderEmployeeInfo() ,
    }
];

// questions for deleting a role
const roleDeletion = async () => [
    {
        type: 'list',
        name: 'role',
        message: 'Which role (and its corresponding employee(s)) would you like to delete?',
        choices: await renderRoleInfo(),
    }
];

//questions for deleting a department
const deparmentDeletion = async () => [
    {
        type: 'list',
        name: 'department',
        message: 'which department would you like to delete?',
        choices: await renderDepartmentInfo(),
    }
];

module.exports = { questions, departmentInfo, roleInfo, employeeInfo, employeeUpdate, employeeManagerUpdate, employeeDeletion, roleDeletion, deparmentDeletion };