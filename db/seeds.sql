INSERT INTO departments (name)
VALUES ('Human Resources'),('Finance'),('Logistics');


INSERT INTO role (title, salary, department_id)
VALUES ('Principal', 300000, 1),('Principal', 350000, 2),('Principal', 300000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Roy','Logan', 1),('Michael','Brahman', 2),('Toni','Marano', 3);