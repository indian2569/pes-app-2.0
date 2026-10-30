-- V01 declared every reference column as bigserial. That gave each of them its own sequence as a default
-- (so a missing reference was silently filled with a made-up id) and no reference was a foreign key.
-- This migration turns them into plain bigint references and adds the foreign keys.

-- 1) reference columns: drop the sequence defaults (and the sequences)

DO $$
DECLARE
    col record;
BEGIN
    FOR col IN
        SELECT c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.table_schema = 'pes'
          AND c.column_name <> 'id'
          AND c.column_default LIKE 'nextval(%'
          AND NOT (c.table_name = 'entry' AND c.column_name = 'client_id')
    LOOP
        EXECUTE format('ALTER TABLE pes.%I ALTER COLUMN %I DROP DEFAULT', col.table_name, col.column_name);
        EXECUTE format('DROP SEQUENCE IF EXISTS pes.%I', col.table_name || '_' || col.column_name || '_seq');
    END LOOP;
END $$;

-- entry.client_id is not used by the application (clients are in pes_entry_clients)
ALTER TABLE pes.entry DROP COLUMN IF EXISTS client_id;

-- registration does not fill the audit columns of a user; until now the sequences put made-up ids there
ALTER TABLE pes.pes_users ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE pes.pes_users ALTER COLUMN last_change DROP NOT NULL;

-- 2) foreign keys
-- Added NOT VALID first, so they are enforced for new and changed rows right away. Existing rows are then validated;
-- if some old row points to a missing record, the key stays NOT VALID and a warning is logged instead of
-- failing the application start. Run "ALTER TABLE ... VALIDATE CONSTRAINT ..." after cleaning such rows.

CREATE OR REPLACE FUNCTION pes.tmp_add_fk(tbl text, col text, ref text, name text, on_delete text) RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = name AND connamespace = 'pes'::regnamespace) THEN
        RETURN;
    END IF;
    EXECUTE format('ALTER TABLE pes.%I ADD CONSTRAINT %I FOREIGN KEY (%I) REFERENCES pes.%I (id) ON DELETE %s NOT VALID',
                   tbl, name, col, ref, on_delete);
    BEGIN
        EXECUTE format('ALTER TABLE pes.%I VALIDATE CONSTRAINT %I', tbl, name);
    EXCEPTION WHEN foreign_key_violation THEN
        RAISE WARNING 'Foreign key %.% left NOT VALID: some existing rows point to missing % records', tbl, name, ref;
    END;
END $$ LANGUAGE plpgsql;

-- who created / last changed a record
SELECT pes.tmp_add_fk(t, 'created_by', 'pes_users', t || '_created_by_fk', 'RESTRICT'),
       pes.tmp_add_fk(t, 'last_change', 'pes_users', t || '_last_change_fk', 'RESTRICT')
FROM unnest(ARRAY['campaigne', 'card', 'coworker', 'entry', 'event', 'institution', 'method', 'program']) AS t;

-- references of an entry and a card
SELECT pes.tmp_add_fk('entry', 'campaign_id', 'campaigne', 'entry_campaign_fk', 'RESTRICT');
SELECT pes.tmp_add_fk('entry', 'program_type_id', 'program', 'entry_program_type_fk', 'RESTRICT');
SELECT pes.tmp_add_fk('card', 'institution_id', 'institution', 'card_institution_fk', 'RESTRICT');

-- link tables: removing an entry removes its links, but a client, method or coworker that an entry uses cannot be deleted
SELECT pes.tmp_add_fk('pes_entry_clients', 'entry_id', 'entry', 'pes_entry_clients_entry_fk', 'CASCADE');
SELECT pes.tmp_add_fk('pes_entry_clients', 'card_id', 'card', 'pes_entry_clients_card_fk', 'RESTRICT');
SELECT pes.tmp_add_fk('pes_entry_card', 'entry_id', 'entry', 'pes_entry_card_entry_fk', 'CASCADE');
SELECT pes.tmp_add_fk('pes_entry_card', 'card_id', 'card', 'pes_entry_card_card_fk', 'RESTRICT');
SELECT pes.tmp_add_fk('pes_entry_method', 'entry_id', 'entry', 'pes_entry_method_entry_fk', 'CASCADE');
SELECT pes.tmp_add_fk('pes_entry_method', 'method_id', 'method', 'pes_entry_method_method_fk', 'RESTRICT');
SELECT pes.tmp_add_fk('pes_entry_coworker', 'entry_id', 'entry', 'pes_entry_coworker_entry_fk', 'CASCADE');
SELECT pes.tmp_add_fk('pes_entry_coworker', 'coworker_id', 'coworker', 'pes_entry_coworker_coworker_fk', 'RESTRICT');

-- roles of a user
SELECT pes.tmp_add_fk('user_roles', 'user_id', 'pes_users', 'user_roles_user_fk', 'CASCADE');
SELECT pes.tmp_add_fk('user_roles', 'role_id', 'roles', 'user_roles_role_fk', 'RESTRICT');

DROP FUNCTION pes.tmp_add_fk(text, text, text, text, text);
