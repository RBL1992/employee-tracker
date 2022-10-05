INSERT INTO departments (name)
VALUES ('Human Resources'),('Finance'),('Logistics');


INSERT INTO role (title, salary, department_id)
VALUES ('Principal', 300000, 1),('VP', 250000, 2),('AVP', 180000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Roy','Logan', 1, 1 ),('Michael','Brahman', 2, 2),('Toni','Marano', 3, 3),('Maxx','Logan', 1, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Lisa','Logan', 3, 1 ),('Jen','Brahman', 2, 2),('Marley','Marano', 3, 1),('Tara','Logan', 3, 1);

