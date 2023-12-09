USE work_db;

INSERT INTO department (name) VALUES 
                        ('finance'), 
                        ('legal'), 
                        ('human resources'),
                        ('engineering'),
                        ('project management'),
                        ('quality assurance');

INSERT INTO role (title, salary, department_id) VALUES
                ('financial_analyst', 70000.00, 1),
                ('accountant', 70000.00, 1),
                ('legal_scretary', 40000.00, 2),
                ('attorney', 80000.00, 2),
                ('recruiter', 30000.00, 3),
                ('HR_coordinator', 40000.00, 3),
                ('HR_manager', 60000.00, 3),
                ('computer_engineer', 80000.00, 4),
                ('mechanical_engineer', 72000.00, 4),
                ('chemical_engineer', 60000.00, 4), 
                ('engineering_director', 100000.00, 4), 
                ('director', 100000.00, 5), 
                ('project_manager', 66000.00, 5),
                ('quality_director', 120000.00, 6), 
                ('quality_analysit', 40000.00, 6); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
                        ('Stella', 'Bella', 1, 101),
                        ('Emma', 'Mella', 2, 101),
                        ('Donna', 'Tella', 3, 101),
                        ('Maya', 'Zara', 4, 101),
                        ('Clara', 'Luna', 5, 101),
                        ('Ava', 'Gemma', 6, 101),
                        ('Layla', 'Nova', 7, null),
                        ('Mira', 'Tala', 8, 201),
                        ('Anya', 'Lara', 9, 201),
                        ('Neva', 'Gina', 10, 201), 
                        ('Flora', 'Myra', 11, null), 
                        ('Sasha', 'Yara', 12, null), 
                        ('Nalla', 'Lyra', 13, 301), 
                        ('Ella', 'Rhea', 14, 301), 
                        ('Kara', 'Zora', 15, 301); 

