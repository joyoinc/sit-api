CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS tbl_logs (
    ts      TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    info    VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS tbl_tokens (
    token         UUID PRIMARY KEY,
    update_at     TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    live_seconds  INTEGER
);

CREATE OR REPLACE FUNCTION sp_create_token() RETURNS INTEGER AS $$
DECLARE
    _now    TIMESTAMP := NOW();
    _msg    VARCHAR;
    _token  UUID;
BEGIN

    SELECT uuid_generate_v4() INTO _token;

    INSERT INTO tbl_tokens
    VALUES (_token, _now, 3600); -- default live for 1h

    _msg := 'created token ' || _token;
    INSERT INTO tbl_logs
    VALUES (_now, _msg);

    RETURN 0;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_check_token(token_ UUID) RETURNS INTEGER AS $$
DECLARE
    _cnt    INTEGER;
BEGIN

    SELECT  COUNT(*) FROM tbl_tokens t INTO _cnt
    WHERE   t.token = token_    AND
            (t.live_seconds > EXTRACT(EPOCH FROM NOW() - t.update_at) OR t.live_seconds <= 0);

    IF  _cnt = 0    THEN
        RETURN 0;
    ELSE
        RETURN 1;
    END IF;
END;
$$ LANGUAGE plpgsql;
