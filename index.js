// packages needed for this application
const inquirer = require('inquirer');

const { questions, departmentInfo, roleInfo, employeeInfo, employeeUpdate, employeeManagerUpdate, employeeDeletion, roleDeletion, deparmentDeletion } = require('./lib/inquire');
const { renderDepartmentData, renderRoleData, renderEmployeeData, addAdepartment, addArole, addEmployee, determineRoleId, updateEmployee, determineEmployeedID, updateEmployeesManager, renderEmployeesByManagers, renderEmployeesByDepartment, renderBudgetOfEachDepartment, deleteEmployee, deleteRoleAndItsEmployees, determineDepartmentId, deleteEntireDepartment } = require('./lib/render');

//returns user's inquiries
async function init() {
    
    try {
        const answers = await inquirer.prompt(questions);

        if (answers.start === 'view all departments') {
            await renderDepartmentData();
            init();
        } else if (answers.start === 'view all roles') {
            await renderRoleData();
            init();
        } else if (answers.start === 'view all employees') {
            await renderEmployeeData();
            init();
        } else if (answers.start === 'add a department') {
            const addDepartment = await inquirer.prompt(departmentInfo);

            const department = addDepartment.department;

            await addAdepartment(department);
            init();
        } else if (answers.start === 'add a role') {
            const role = await inquirer.prompt(roleInfo);

            const title = role.title;
            const salary = parseFloat(role.salary);
            const departmentName = role.department;

            await addArole(title, salary, departmentName);
            init();
        } else if (answers.start === 'add an employee') {
            const employee = await inquirer.prompt(await employeeInfo());

            const firstName = employee.firstName;
            const lastName = employee.lastName;
            const role = employee.role;
            const manager = employee.manager;

            const roleId = await determineRoleId(role);
            await addEmployee(firstName, lastName, roleId, manager);
            init();
        } else if (answers.start === 'update an employee role') {
            const name = await inquirer.prompt(await employeeUpdate());

            const employeeName = name.employee;
            const role = name.role;

            const employeeId = await determineEmployeedID(employeeName);
            const roleId = await determineRoleId(role);
            await updateEmployee(roleId, employeeId);
            init();
        } else if (answers.start === 'update an employee\'s manager') {
            const managerUpdate = await inquirer.prompt( await employeeManagerUpdate());

            const employeeName = managerUpdate.employee; 
            const newManager = managerUpdate.manager;  

            const employeeId = await determineEmployeedID(employeeName);
            await updateEmployeesManager(newManager, employeeId);     
            init();
        } else if (answers.start === 'view employees by managers') {
            await renderEmployeesByManagers();
            init();
        } else if (answers.start === 'view employees by department') {
            await renderEmployeesByDepartment();
            init();
        } else if (answers.start === 'view total budget of each department') {
            await renderBudgetOfEachDepartment();
            init();
        } else if (answers.start === 'delete an employee') {

            const employeeToDelete = await inquirer.prompt(await employeeDeletion());

            const employeeName = employeeToDelete.employee;

            const employeeId = await determineEmployeedID(employeeName);
            await deleteEmployee(employeeId);
            init();
        } else if (answers.start === 'delete a role and its employee(s)') {
            const roleToDelete = await inquirer.prompt(await roleDeletion());

            const role = roleToDelete.role;
            const roleId = await determineRoleId(role);
            await deleteRoleAndItsEmployees(roleId);
            init();
        } else if (answers.start === 'delete an entire department') {
            const departmentToDelete = await inquirer.prompt(await deparmentDeletion());
            
            const department = departmentToDelete.department;
            const departmentId = await determineDepartmentId(department);
            await deleteEntireDepartment(departmentId);
            init();
        } else if (answers.start === 'quit') {
            process.exit(0);
        }
    } catch (err) {
        console.log(`this is your error: ${err}`);
    }
};

//initialize upon start 
init();