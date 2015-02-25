INSERT INTO tbl_endpoints
VALUES  ('POST', '/login/auth', 'input: {login, password}, output:{error:{message} if has, user_id}', 'DONE'),
        ('POST', '/login/create', 'input: {login, password}, output:{error:{message} if has, user_id}', 'DONE');

INSERT INTO tbl_logins
VALUES  ('dummy1', 'dummy1', timestamp '2015-1-1', 11) ,
        ('dummy@fake.com', 'dummy2', timestamp '2015-1-1', 101),
        ('dummy2', 'dummy2', timestamp '2015-1-1', 101);
