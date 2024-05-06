CREATE DATABASE company CREATE TABLE depatments (
    department_id INTEGER PRIMARY KEY,
    department_name
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    position VARCHAR(255),
    salary INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

INSERT INTO
    deparments (department_name)
VALUES
    ('Engineer', 'Administation', 'Marketing');

INSERT INTO
    employees (name, position, salary, department_id)
VALUES
    ('Petrus Handika', 'Manager', 10000, 1),
    ('Isah Veronica', 'Staff Admnistration', 3000, 2),
    ('John Doe', 'Office Boy', 2500, 2),
    ('Mutiara Asri', 'Sales Marketing', 6000, 3);

UPDATE
    employees
SET
    salary = 7500
WHERE
    id = 2;

DELETE FROM
    employees
WHERE
    name = 'John Doe';

SELECT
    e.name AS employee_name,
    e.position,
    e.salary,
    d.department_name
FROM
    employees e
    JOIN department d ON e.department_id = d.department_id
WHERE
    e.salary > 5000;