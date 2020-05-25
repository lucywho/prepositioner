DROP TABLE IF EXISTS users, reset_codes, questions;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions(
  id SERIAL PRIMARY KEY,
  first VARCHAR,
  second VARCHAR,
  answer VARCHAR,
  trans VARCHAR
);

INSERT INTO questions (first, answer, second, trans) VALUES 
('Ich hänge das Bild','an', 'die Wand', 'I hang the picture on the wall'), 
('Das Bild hängt','an', 'der Wand', 'The picture is hanging on the wall')
;
