INSERT INTO tbl_endpoints
VALUES  ('POST', '/login/auth', 'input: {login, password}, output:{user_id, message}', 'DONE'),
        ('POST', '/login/create', 'input: {login, password}, output:{user_id, message}', 'TODO');


INSERT INTO tbl_logins
VALUES  ('dummy1', 'dummy1', timestamp '2015-1-1', 21) ,
        ('dummy2', 'dummy2', timestamp '2015-1-1', 22);
