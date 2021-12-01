INSERT INTO `role` (`id`, `name`, `slug`, `permission`, `createdAt`, `updatedAt`) VALUES
  (1, 'Administrateur', 'administrateur', 0, NOW(), NOW()),
  (2, 'Enseignant',     'Enseignant',     1, NOW(), NOW()),
  (3, 'Étudiant',       'etudiant',       2, NOW(), NOW());

INSERT INTO `group` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
  (1, 'NSI Terminale', 'nsi-terminale', NOW(), NOW()),
  (2, 'NSI Première',  'nsi-premiere',  NOW(), NOW());

INSERT INTO `user` (`id`, `firstName`, `lastName`, `username`, `password`, `gender`, `roleId`, `groupId`, `createdAt`, `updatedAt`) VALUES
  (1, 'Lukas',    'Laudrain', 'llaudrain', '$2b$11$xTk9NH9cT4AmtZu7X3SKeO.6PT0SedaGBRXA4/J6eMZUEcd11H0/q', 'male',   3, 1,    NOW(), NOW()), 
  (2, 'Robinson', 'Rambeau',  'rrambeau',  '$2b$11$6FeZ8RzOrOR8Ul0k7K3XTu8eVGXhne1K7nLIYtti/bPeWX05Uiosq', 'male',   3, 2,    NOW(), NOW()), 
  (3, 'Rose',     'Yazid',    'ryazid',    '$2b$11$DNewgnA448JgqYHeONEtE./gEH/eTYqEkoUEPIK8n0LTfVF6Ihxaq', 'female', 3, 2,    NOW(), NOW()), 
  (4, 'Emma',     'Cadro',    'ecadro',    '$2b$11$dNU.teopZG8U0dbnVT2bFO4aCPVm16Q9G7drtED03zJA5C780sql.', 'female', 3, 1,    NOW(), NOW()), 
  (5, 'Eric',     'Laurent',  'elaurent',  '$2b$11$4OSdscz15Q322jLgkrBen.zXOVsSEdxay.WDwgk1WBwaF0VEds4Y.', 'male',   2, NULL, NOW(), NOW()), 
  (6, 'admin',    'admin',    'admin',     '$2b$11$TYYRjJ5RARYNfzZObPTG1OYMRqEJl2uCgo7WQOxs4UjhI2wGXfOWG', 'male',   1, NULL, NOW(), NOW()),
  (7, 'prof',     'prof',     'prof',      '$2b$11$prJ5EXW1ZzsX3i15hXFCT.lnWgY/bLqgAqpsbwmFnyeegYu28ufnW', 'male',   2, NULL, NOW(), NOW()),
  (8, 'eleve',    'eleve',    'eleve',     '$2b$11$0uUYsInrdWfoDhSmPA0SAOb.uH/A5iYHQXxC9yBP3VTklWmNbYjAO', 'male',   3, 1,    NOW(), NOW());









