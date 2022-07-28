const inquirer = require('inquirer');
const connection = require('./db/connection');

init = () => {
    inquirer.prompt([
        {
            name: 'initialInquiry',
            type: 'rawlist',
            message: 'Please select:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update a role', 'Exit program']
        }
    ]).then((response) => {
        switch (response.initialInquiry) {
            case 'View all departments':
                viewAllDepartments();    
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
            break;
            case 'Add a role':
                addRole();
            break;
            case 'Add an employee':
                addEmployee();
            break;
            case 'Update a role':
                updateEmployeeRole();
            break;
            case 'Exit program':
                connection.end();
                console.log('\n Bye! \n');
                return;
            default:
                break;
        }
    });
};

viewAllDepartments = () => {
    connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

viewAllRoles = () => {
    connection.query(`SELECT role.role_id, role.title, role.salary, department.department_name, department.department_id FROM role JOIN department ON role.department_id = department.department_id ORDER BY role.role_id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

viewAllEmployees = () => {
    connection.query(`SELECT e.employee_id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id ORDER BY e.employee_id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

addDepartment = () => {
    inquirer.prompt([
        {
        name: 'addDept',
        type: 'input',
        message: 'What is the name of the department?'   
        }
    ]).then((response) => {
        connection.query(`INSERT INTO department SET ?`, 
        {
            department_name: response.addDept,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.addDept} successfully added to database! \n`);
            startApp();
        })
    });
};

addRole = () => {
    connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({name: department.department_name, value: department.department_id }));
        inquirer.prompt([
            {
            name: 'title',
            type: 'input',
            message: 'What is the role you want to add?'   
            },
            {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?'   
            },
            {
            name: 'deptName',
            type: 'rawlist',
            message: 'What is the department of the role?',
            choices: departments
            },
        ]).then((response) => {
            connection.query(`INSERT INTO role SET ?`, 
            {
                title: response.title,
                salary: response.salary,
                department_id: response.deptName,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`\n ${response.title} successfully added to database! \n`);
                startApp();
            })
        })
    });
};

addEmployee = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        connection.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}));
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the last name?'
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'What is the new title?',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'rawlist',
                    message: 'Who is the new manager?',
                    choices: employees
                }
            ]).then((response) => {
                connection.query(`INSERT INTO employee SET ?`, 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager,
                }, 
                (err, res) => {
                    if (err) throw err;
                })
                connection.query(`INSERT INTO role SET ?`, 
                {
                    department_id: response.dept,
                }, 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n ${response.firstName} ${response.lastName} successfully added to database! \n`);
                    init();
                })
            })
        })
    });
};

updateEmployeeRole = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        connection.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'rawlist',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'rawlist',
                    message: 'What should the new role be?',
                    choices: roles
                },
            ]).then((response) => {
                connection.query(`UPDATE employee SET ? WHERE ?`, 
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        employee_id: response.employee,
                    },
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n Successfully updated employee's role in the database! \n`);
                    init();
                })
            })
        })
    })
};

init();