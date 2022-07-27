INSERT INTO department (department_name)
VALUES ('Finance'),
('HR'),
('Sales'),
('IT'),
('Executive Board');

INSERT INTO role (title, salary, department_id)
VALUES('Finance Analyst', 100000, 1),
('Sr. Finance Analyst', 150000, 1),
('Finance Director', 200000, 1),
('HR Specialist', 68000, 2),
('HR Generalist', 75000, 2),
('HR Director', 120000, 2),
('Sales manager', 850000, 3),
('Sales director', 100000, 3),
('System Administrator', 90000, 4),
('System Architect', 130000, 4),
('IT Director', 225000, 4),
('Chief Executive Officer', 350000, 5),
('Chief Operating Officer', 300000, 5),
('Chief Financial Officer', 300000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Vadad', 'Rzali', 12, NULL),
('Nargiz', 'Rzayeva', 13, 1),
('Zaman', 'Zamanli', 14, 1),
('Shabnam', 'Zamanli', 3, 2),
('Rufat', 'Dashdamirov', 9, 2),
('Ibrahim', 'Sultanli', 11, 2),
('Arzu', 'Fahradova', 6, 2),
('Fazilat', 'Samadova', 1, 4),
('Ayyub', 'Hajiyev', 1, 4),
('Aynure', 'Piriyeva', 2, 4),
('Tofiq', 'Aliyev', 4, 7),
('Shabaz', 'Khanna', 5, 7),
('Yuliya', 'Kalinina', 5, 7),
('Aygun', 'Abdulrahmanova', 7, 5),
('Vidadi', 'Abdulrahmanov', 8, 5),
('Beyonce', 'Knowles', 10, 6),