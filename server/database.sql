-- inital commands (run in the terminal) --

CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    category_ids integer[]
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE category(
    cat_id SERIAL PRIMARY KEY,
    cat_name VARCHAR(255)
);




-- other commands, not needed ---
ALTER TABLE todo DROP COLUMN date_created
ALTER TABLE todo ADD COLUMN category_ids integer[]
ALTER TABLE todo ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

