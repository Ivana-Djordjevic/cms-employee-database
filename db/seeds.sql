USE work_db;

INSERT INTO department (name) VALUES 
                        ('finance'), --1 
                        ('legal'), --2 
                        ('human resources'), --3
                        ('engineering'), --4
                        ('project management'), --5
                        ('quality assurance'); --6

INSERT INTO role (title, salary, department_id) VALUES
                ('financial analyst', 70000.00, 1), --1
                ('accountant', 70000.00, 1), --2
                ('legal scretary', 40000.00, 2), --3
                ('attorney', 80000.00, 2), --4
                ('recruiter', 30000.00, 3), --5
                ('HR coordinator', 40000.00, 3), --6
                ('HR manager', 60000.00, 3), --7
                ('computer engineer', 80000.00, 4), --8
                ('mechanical engineer', 72000.00, 4), --9
                ('chemical engineer', 60000.00, 4), --10
                ('director', 100000.00, 4), --11
                ('director', 100000.00, 5), --12
                ('project manager', 66000.00, 5), --13
                ('quality director', 120000.00, 6), --14
                ('quality analysit', 40000.00, 6); --15

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
                        ('Stella', 'Bella', 1, 101), --1
                        ('Emma', 'Mella', 2, 101), --2
                        ('Donna', 'Tella', 3, 101), --3
                        ('Maya', 'Zara', 4, 101), --4
                        ('Clara', 'Luna', 5, 101), --5
                        ('Ava', 'Gemma', 6, 101), --6
                        ('Layla', 'Nova', 7, null), --7
                        ('Mira', 'Tala', 8, 201), --8
                        ('Anya', 'Lara', 9, 201), --9
                        ('Neva', 'Gina', 10, 201), --10
                        ('Flora', 'Myra', 11, null), --11
                        ('Sasha', 'Yara', 12, null), --12
                        ('Nalla', 'Lyra', 13, 301), --13
                        ('Ella', 'Rhea', 14, 301), --14
                        ('Kara', 'Zora', 15, 301); --15

