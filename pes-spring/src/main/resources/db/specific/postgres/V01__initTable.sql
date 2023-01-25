-- Initializing all table for DB
CREATE TABLE IF NOT EXISTS campaigne (
	id	bigserial	PRIMARY KEY
,	name	text		NOT NULL UNIQUE
,	description	text
,	active BOOLEAN NOT NULL

);
COMMENT ON TABLE campaigne	IS 'Collection of campaigne';

CREATE TABLE IF NOT EXISTS event (
	id	bigserial	PRIMARY KEY
,	name	text		NOT NULL UNIQUE
,	description	text
,	active BOOLEAN NOT NULL

);
COMMENT ON TABLE event	IS 'Collection of event';

CREATE TABLE IF NOT EXISTS coworker (
	id	bigserial	PRIMARY KEY
,	name	text		NOT NULL UNIQUE
,	description	text
,	position text
,	active BOOLEAN NOT NULL

);
COMMENT ON TABLE coworker	IS 'Collection of coworker';

CREATE TABLE IF NOT EXISTS institution (
	id	bigserial	PRIMARY KEY
,	name	text		NOT NULL UNIQUE
,	description	text
,	active BOOLEAN NOT NULL

);
COMMENT ON TABLE institution	IS 'Collection of institution';

CREATE TABLE IF NOT EXISTS method (
	id	bigserial	PRIMARY KEY
,	name	text		NOT NULL UNIQUE
,	description	text
,	active BOOLEAN NOT NULL

);
COMMENT ON TABLE method	IS 'Collection of method';

CREATE TABLE IF NOT EXISTS program (
	id	bigserial	PRIMARY KEY
,	name	text		NOT NULL UNIQUE
,	description	text
,	active BOOLEAN NOT NULL

);
COMMENT ON TABLE program	IS 'Collection of program';

CREATE TABLE IF NOT EXISTS entry (
	id	bigserial	PRIMARY KEY
,	client_id	bigserial	NOT NULL UNIQUE
,	entry_date_from	timestamptz
,	entry_date_to timestamptz
,	place	text
,	contact_type	text
,	campaign_id	bigserial
,	program_type_id	bigserial
,	event_description	 text
,	fast_message	text

);
COMMENT ON TABLE program	IS 'Collection of entry';

CREATE TABLE IF NOT EXISTS card (
	id	bigserial	PRIMARY KEY
,	client_nick	text		NOT NULL
,	client_gender	text
,	client_anamnesis	text
,	client_dev_plan	text
,	client_age	text
,	client_birth_year	text
,	client_name	text
,	client_surname	text
,	client_birth_date	text
,	client_family_status	text
,	client_citizenship	text
,	client_address	text
,	client_phone	text
,	client_email	text
,	client_socnet	text
,	client_health	text
,	client_income	text
,	client_belongings	text
,	created_by	text
,	status	BOOLEAN
,	create_date	timestamptz

);
COMMENT ON TABLE program	IS 'Collection of card';

CREATE TABLE IF NOT EXISTS pes_users (
	id	bigserial	PRIMARY KEY
,	username	text
,	email	text
,	password	text
,	active BOOLEAN
);
COMMENT ON TABLE pes_users	IS 'Collection of users';

CREATE TABLE IF NOT EXISTS roles (
	id	bigserial	PRIMARY KEY
,	name	text
);
COMMENT ON TABLE roles	IS 'Collection of roles';

CREATE TABLE IF NOT EXISTS user_roles (
	user_id	bigserial	PRIMARY KEY
,	role_id	bigserial
);
COMMENT ON TABLE user_roles	IS 'Collection of card';

CREATE TABLE IF NOT EXISTS pes_entry_card (
	id	bigserial	PRIMARY KEY
,	ENTRY_ID	bigserial
,	card_id	bigserial
);
COMMENT ON TABLE pes_entry_card	IS 'Table for entry card connection';

CREATE TABLE IF NOT EXISTS pes_entry_clients (
	id	bigserial	PRIMARY KEY
,	ENTRY_ID bigserial
,	card_id	bigserial
);
COMMENT ON TABLE pes_entry_clients	IS 'Table for entry clients card connection';

CREATE TABLE IF NOT EXISTS pes_entry_coworker (
	id	bigserial	PRIMARY KEY
,	ENTRY_ID bigserial
,	coworker_id	bigserial
);
COMMENT ON TABLE pes_entry_coworker	IS 'Table for entry card connection';

CREATE TABLE IF NOT EXISTS pes_entry_method (
	id	bigserial	PRIMARY KEY
,	ENTRY_ID bigserial
,	method_id bigserial
);
COMMENT ON TABLE pes_entry_method	IS 'Table for entry method connection';