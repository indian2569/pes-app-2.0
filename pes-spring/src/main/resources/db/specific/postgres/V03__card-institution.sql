DO $$
BEGIN
    -- Check if the column 'new_column' exists in the 'your_table'
    IF NOT EXISTS (SELECT 1
                   FROM information_schema.columns
                   WHERE table_name='card'
                   AND column_name='institution_id') THEN
        -- If the column does not exist, alter the table to add the new column
        ALTER TABLE pes.card ADD institution_id int8 NULL;
    END IF;
END $$;

