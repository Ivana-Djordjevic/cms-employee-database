// packages needed for this application
const inquirer = require('inquirer');

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

//returns user's answers
function init() {
    return inquirer.prompt(questions);
}

module.exports = init;