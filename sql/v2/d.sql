INSERT INTO tbl_omniedu_lessons
VALUES  ('1', 'CRO Training');

INSERT INTO tbl_omniedu_courses
VALUES  ('11233', 'CRO traing 1 : Introduction', 'https://s3.amazonaws.com/omniedu-dev/SampleVideo_1080x720_1mb.mp4'),
        ('11528', 'CRO traing 2 : Basic Concepts', 'https://s3.amazonaws.com/omniedu-dev/SampleVideo_1080x720_2mb.mp4'),
	('11973', 'CRO traing 3 : Useful Technology', 'https://s3.amazonaws.com/omniedu-dev/SampleVideo_1080x720_5mb.mp4'),
	('32532', 'Blue shit training 1 : Who is the strongest to learn WaJueJi ?', '');

INSERT INTO tbl_omniedu_lessons2courses
VALUES  ('1', '11233'),
	('1', '11528'),
	('1', '11973'),
	('1', '32532');

INSERT INTO tbl_endpoints
VALUES  ('GET', '/_apis/oe/lesson/:id', 'input: {}, output:{[course1, course2, ...]}', 'DONE'),
        ('GET', '/_apis/oe/course/:id', 'input: {}, output:{id, title, url}', 'DONE');