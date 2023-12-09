// packages needed for this application
const inquirer = require('inquirer');

const { questions, departmentInfo, roleInfo, employeeInfo, employeeUpdate, employeeManagerUpdate } = require('./lib/inquire');
const { renderDepartmentData, renderRoleData, renderEmployeeData, addAdepartment, addArole, AddEmployee, determineRoleId, updateEmployee, determineEmployeedID, updateEmployeesManager, renderEmployeeByManagers} = require('./lib/render')

//returns user's answers
async function init() {
    
    try {
        let answers = await inquirer.prompt(questions);

        if (answers.start === 'view all departments') {
            renderDepartmentData();
            init();
        } 
        else if (answers.start === 'view all roles') {
            renderRoleData();
            init();
        } 
        else if (answers.start === 'view all employees') {
            renderEmployeeData();
            init();
        } 
        else if (answers.start === 'add a department') {
            let department = await inquirer.prompt(departmentInfo);
            department = department.department;
            addAdepartment(department);
            init();
        }   
        else if (answers.start === 'add a role') {
            let role = await inquirer.prompt(roleInfo);
            const title = role.title;
            const salary = parseFloat(role.salary);
            const departmentName = role.department;
            addArole(title, salary, departmentName);
            init();
        }
        else if (answers.start === 'add an employee') {
            let employee = await inquirer.prompt(employeeInfo);
            const firstName = employee.firstName;
            const lastName = employee.lastName;
            const role = employee.role;
            const manager = employee.manager;
            const roleId = determineRoleId(role);
            AddEmployee(firstName, lastName, roleId, manager);
            init();
        }
        else if (answers.start === 'update an employee role') {
            const name = await inquirer.prompt(employeeUpdate);
            const employeeName = name.employee;
            const role = name.role;
            const employeeId = determineEmployeedID(employeeName);
            const roleID = determineRoleId(role);
            updateEmployee(roleID, employeeId);
            init();
        } else if (answers.start === 'update an employee\'s manager') {
            const managerUpdate = await inquirer.prompt(employeeManagerUpdate)
            const employeeName = managerUpdate.employee; 
            const newManager = managerUpdate.manager;  
            const employeeId = determineEmployeedID(employeeName);
            await updateEmployeesManager(newManager, employeeId);
            init();         
        } else if (answers.start === 'view employees by managers') {
            renderEmployeeByManagers();
            init();
        } else if (answers.start === 'quit') {
            //code to exit out of application... somehow 
        }
    } catch (err) {
        console.log(`this is your error: ${err}`)
    }
};

init();

