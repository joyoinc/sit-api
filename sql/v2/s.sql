CREATE TABLE IF NOT EXISTS tbl_blobs (
  id		UUID PRIMARY KEY,
  url		VARCHAR(256),
  create_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC') 
);

CREATE TABLE IF NOT EXISTS tbl_omniedu_courses (
  id		INTEGER PRIMARY KEY,
  title		VARCHAR(128),
  url		VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS tbl_omniedu_lessons (
  id		INTEGER PRIMARY KEY,
  title		VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS tbl_omniedu_lessons2courses (
  lesson_id		INTEGER,
  course_id		INTEGER
);


CREATE OR REPLACE FUNCTION sp_create_blob(url VARCHAR) RETURNS INTEGER AS $$
DECLARE
    _now TIMESTAMP := NOW();
    _msg VARCHAR;
    _id  UUID;
BEGIN

    SELECT uuid_generate_v4() INTO _id;

    INSERT INTO tbl_blobs
    VALUES (_id, url, _now);

    _msg := 'created blod ' || _id;
    INSERT INTO tbl_logs
    VALUES (_now, _msg);

    RETURN 0;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION sp_get_lesson(lesson_id_ INTEGER)
    RETURNS TABLE(course_id INTEGER, title VARCHAR, url VARCHAR) AS $$
DECLARE
BEGIN
    RETURN QUERY SELECT c.id AS course_id, c.title, c.url 
	FROM 	tbl_omniedu_courses AS c
    	JOIN 		tbl_omniedu_lessons2courses AS m ON m.course_id = c.id
	JOIN		tbl_omniedu_lessons AS l ON  l.id = m.lesson_id
    WHERE l.id = lesson_id_ 
    UNION  SELECT 0 AS course_id, l.title, NULL AS url FROM tbl_omniedu_lessons AS l WHERE id = lesson_id_ ;
    RETURN;
END;
$$ LANGUAGE plpgsql;

