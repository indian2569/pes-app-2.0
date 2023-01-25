/**
   initial setup of db, roles and privileges before migrations

   naming convention for roles:
   ta_* … technical account
   fm_* … group access rights role
*/

\set ON_ERROR_STOP true
\set ENV _prod

CREATE ROLE ta_pes_own WITH LOGIN;
COMMENT ON ROLE ta_pes_own 	IS 'Owner of database pes_ENV; technical account';
GRANT ta_pes_own TO postgres;	-- RDS workaround
CREATE DATABASE pes:ENV OWNER ta_pes_own;
COMMENT ON DATABASE pes:ENV	IS 'Database for PII information of the PES app project application.';

\connect pes:ENV;

REVOKE ALL PRIVILEGES ON DATABASE pes:ENV		FROM PUBLIC;
REVOKE ALL PRIVILEGES ON SCHEMA public			FROM PUBLIC;
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public	FROM PUBLIC;

CREATE ROLE fm_pes;
COMMENT ON ROLE fm_pes	IS 'Users in fm_pes role can connect to database pes_ENV and use schema pes';

CREATE ROLE fm_pes_r;
CREATE ROLE fm_pes_w;
COMMENT ON ROLE fm_pes_r	IS 'Users in fm_pes_r role can select to all tables in the pes schema';
COMMENT ON ROLE fm_pes_w	IS 'Users in fm_pes_w role have all privileges to tables in the pes schema';

GRANT CONNECT	ON DATABASE pes:ENV	TO fm_pes;
GRANT USAGE	ON SCHEMA public	TO fm_pes;

CREATE ROLE ta_pes WITH LOGIN;
COMMENT ON ROLE ta_pes	IS 'Account for PCS application';

GRANT fm_pes	TO ta_pes_own, ta_pes;
GRANT fm_pes_w	TO ta_pes;
--GRANT fm_pes_r	TO …;

SET ROLE ta_pes_own;

CREATE SCHEMA IF NOT EXISTS pes;
COMMENT ON SCHEMA pes	IS 'Schema for all PII information: portfolios, their structure, ACL';

GRANT USAGE	ON SCHEMA pes	TO fm_pes;

GRANT SELECT	ON ALL TABLES	IN SCHEMA pes	TO fm_pes_r;
GRANT ALL PRIVILEGES	ON ALL TABLES	IN SCHEMA pes	TO fm_pes_w;

GRANT USAGE	ON ALL SEQUENCES	IN SCHEMA pes	TO fm_pes_r;
GRANT ALL PRIVILEGES	ON ALL SEQUENCES	IN SCHEMA pes	TO fm_pes_w;

ALTER DEFAULT PRIVILEGES	FOR ROLE ta_pes_own	IN SCHEMA pes
GRANT SELECT	ON TABLES	TO fm_pes_r;
ALTER DEFAULT PRIVILEGES	FOR ROLE ta_pes_own	IN SCHEMA pes
GRANT ALL PRIVILEGES	ON TABLES	TO fm_pes_w;

ALTER DEFAULT PRIVILEGES	FOR ROLE ta_pes_own	IN SCHEMA pes
GRANT USAGE	ON SEQUENCES	TO fm_pes_r;
ALTER DEFAULT PRIVILEGES	FOR ROLE ta_pes_own	IN SCHEMA pes
GRANT ALL PRIVILEGES	ON SEQUENCES	TO fm_pes_w;

-- vi: set ts=8 sw=8 sts=0 nowrap:
