INSERT INTO department (name) VALUES ('Engineering'), ('HR');

INSERT INTO role (title, salary, department_id) VALUES ('Engineer', 100000, 1), ('HR Manager', 80000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alice', 'Johnson', '1', NULL), ('Bob', 'Smith', '2', NULL);