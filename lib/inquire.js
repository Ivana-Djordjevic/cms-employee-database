// packages needed for this application
const { validateMessage } = require('../utils/validate');

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
const employeeInfo = [
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
        choices: [ 
                    'financial_analyst', 
                    'accountant', 
                    'legal_secretary', 
                    'attorney', 
                    'recruiter', 
                    'HR_coordinator', 
                    'HR_manager',
                    'computer_engineer',
                    'mechanical_engineer',
                    'chemical_engineer',
                    'engineering_director',
                    'director',
                    'project_manager',
                    'quality_director',
                    'quality_analysit',
                ],
        default: 'financial_analyst'
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is the employee\'s manager?',
        choices: [ 
                    '101', 
                    '201', 
                    '301'
                ],
        default: '101'
    }
];

//questions for updating employee's role
const employeeUpdate = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee\'s role would you like to update?',
        choices: [ 
                    'Stella Bella', 
                    'Emma Mella', 
                    'Donna Tella', 
                    'Maya Zara',
                    'Clara Luna',
                    'Ava Gemma',
                    'Layla Nova', 
                    'Mira Tala',
                    'Anya Lara',
                    'Neva Gina', 
                    'Flora Myra',
                    'Sasha Yara', 
                    'Nalla Lyra', 
                    'Ella Rhea',
                    'Kara Zora',
                ],
        default: 'Stella Bella' 
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s new role?',
        choices: [ 
                    'financial_analyst', 
                    'accountant', 
                    'legal_secretary', 
                    'attorney', 
                    'recruiter', 
                    'HR_coordinator', 
                    'HR_manager',
                    'computer_engineer',
                    'mechanical_engineer',
                    'chemical_engineer',
                    'engineering_director',
                    'director',
                    'project_manager',
                    'quality_director',
                    'quality_analysit',
                ],
        default: 'financial_analyst'
    },
];

module.exports = {questions, departmentInfo, roleInfo, employeeInfo, employeeUpdate };