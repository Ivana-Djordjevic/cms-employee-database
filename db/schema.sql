DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id: INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL 
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL, 
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    -- FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- not sure if i understood instructions properly for role & employee
/* 
* `employee`

    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)
*/

