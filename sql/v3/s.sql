CREATE TABLE IF NOT EXISTS tbl_qq_questions (
  id		UUID PRIMARY KEY,
  title		VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS tbl_qq_discussions (
  question_id	UUID,
  name			VARCHAR(32),
  email			VARCHAR(64),
  detail		TEXT,
  create_at		TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC') 
);

CREATE OR REPLACE FUNCTION sp_qq_get_question(id_ UUID)
	RETURNS TABLE(title VARCHAR, detail TEXT, name VARCHAR, email VARCHAR, create_at TIMESTAMP) AS $$
DECLARE
    _now TIMESTAMP := NOW();
BEGIN
	RETURN QUERY
			SELECT t.title AS title, NULL AS detail, NULL AS name, NULL AS email, _now AS create_at
			FROM tbl_qq_questions AS t WHERE id = id_
			UNION
			SELECT NULL AS title, t.detail AS detail, t.name AS name, t.email AS email, t.create_at AS create_at
			FROM tbl_qq_discussions AS t WHERE question_id = id_
			ORDER BY create_at DESC;
	RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_qq_create_question(name VARCHAR, email VARCHAR, title1 VARCHAR, detail1 TEXT, title2 VARCHAR, detail2 TEXT, title3 VARCHAR, detail3 TEXT)
	RETURNS TABLE(id UUID) AS $$
DECLARE
    _now TIMESTAMP := NOW();
    _id  UUID;
BEGIN

	IF title1 <> '' THEN
		SELECT uuid_generate_v4() INTO _id;

		INSERT INTO tbl_qq_questions
		VALUES (_id, title1);

		INSERT INTO tbl_qq_discussions
		VALUES (_id, name, email, detail1, _now);

		id := _id;
		RETURN NEXT;
	END IF;

	IF title2 <> '' THEN
		SELECT uuid_generate_v4() INTO _id;

		INSERT INTO tbl_qq_questions
		VALUES (_id, title2);

		INSERT INTO tbl_qq_discussions
		VALUES (_id, name, email, detail2, _now);

		id := _id;
		RETURN NEXT;
	END IF;
	
	IF title3 <> '' THEN
		SELECT uuid_generate_v4() INTO _id;

		INSERT INTO tbl_qq_questions
		VALUES (_id, title3);

		INSERT INTO tbl_qq_discussions
		VALUES (_id, name, email, detail3, _now);

		id := _id;
		RETURN NEXT;
	END IF;

END;
$$ LANGUAGE plpgsql;

