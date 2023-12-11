// packages needed for this application
const inquirer = require('inquirer');

const { questions, departmentInfo, roleInfo, employeeInfo, employeeUpdate, employeeManagerUpdate, employeeDeletion, roleDeletion } = require('./lib/inquire');
const { renderDepartmentData, renderRoleData, renderEmployeeData, addAdepartment, addArole, AddEmployee, determineRoleId, updateEmployee, determineEmployeedID, updateEmployeesManager, renderEmployeesByManagers, renderEmployeesByDepartment, renderBudgetOfEachDepartment, deleteEmployee, deleteRoleAndItsEmployees } = require('./lib/render')

//returns user's inquiries
async function init() {
    
    try {
        const answers = await inquirer.prompt(questions);

        if (answers.start === 'view all departments') {
            renderDepartmentData(init);
        } else if (answers.start === 'view all roles') {
            renderRoleData(init);
        } else if (answers.start === 'view all employees') {
            renderEmployeeData(init);
        } else if (answers.start === 'add a department') {
            const addDepartment = await inquirer.prompt(departmentInfo);

            const department = addDepartment.department;

            addAdepartment(department, init);
        } else if (answers.start === 'add a role') {
            const role = await inquirer.prompt(roleInfo);

            const title = role.title;
            const salary = parseFloat(role.salary);
            const departmentName = role.department;

            addArole(title, salary, departmentName, init);
        } else if (answers.start === 'add an employee') {
            const employee = await inquirer.prompt(employeeInfo);

            const firstName = employee.firstName;
            const lastName = employee.lastName;
            const role = employee.role;
            const manager = employee.manager;
            determineRoleId(role, (roleId) => {
                AddEmployee(firstName, lastName, roleId, manager, init);
            });

        } else if (answers.start === 'update an employee role') {
            const name = await inquirer.prompt(employeeUpdate);

            const employeeName = name.employee;
            const role = name.role;
            determineEmployeedID(employeeName, (employeeId) => {
                determineRoleId(role, (roleId) => {
                    updateEmployee(roleId, employeeId, init);
                });
            });
        } else if (answers.start === 'update an employee\'s manager') {
            const managerUpdate = await inquirer.prompt(employeeManagerUpdate);

            const employeeName = managerUpdate.employee; 
            const newManager = managerUpdate.manager;  
            determineEmployeedID(employeeName, (employeeId) => {
               updateEmployeesManager(newManager, employeeId, init);     
           });

        } else if (answers.start === 'view employees by managers') {
            renderEmployeesByManagers(init);
        } else if (answers.start === 'view employees by department') {
            renderEmployeesByDepartment(init);
        } else if (answers.start === 'view total budget of each department') {
            renderBudgetOfEachDepartment(init);
        } else if (answers.start === 'delete an employee') {
            const employeeToDelete = await inquirer.prompt(employeeDeletion);

            const employeeName = employeeToDelete.employee;
            determineEmployeedID(employeeName, (employeeId) => {
                deleteEmployee(employeeId, init);
            });
        } else if (answers.start === 'delete a role and its employee(s)') {
            const roleToDelete = await inquirer.prompt(roleDeletion);

            const role = roleToDelete.role;
            determineRoleId(role, (roleId) => {
                deleteRoleAndItsEmployees(roleId, init);
            });
        } else if (answers.start === 'quit') {
            process.exit(0);
        }
    } catch (err) {
        console.log(`this is your error: ${err}`);
    }
};

//initialize upon start 
init();