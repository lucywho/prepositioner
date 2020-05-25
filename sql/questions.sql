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
('Das Bild hängt','an', 'der Wand', 'The picture is hanging on the wall'),
('Das Rathaus liegt', 'am', 'Marktplatz', 'The townhall is in the marketplace'),
('Wir fahren', 'ans', 'Meer', 'We are driving to the sea'),
('Ich habe mich', 'beim', 'Skifahren verletzt', 'I injured myself while skiing'),
( 'Ich gehe jetzt',  'ins',  'Kino',  'I am going to the cinema now'),
(' ',  'Im', 'letzten Sommer war es hier sehr heiß',  'Last summer, it was very hot here'),
( 'Ich habe das',  'vom',  'Chef gehört',  'I heard that from the boss'),
('Ich gehe jetzt',  'zur',  'Schule',  'I am going to school now'),
( 'Ich gehe jetzt',  'zum',  'Supermarkt',  'I am going to the supermarket now'),
( 'Ich wohne',  'in',  'Berlin',  'I live in Berlin'),
( 'Ich bin gerade',  'im',  'Büro',  'I am in the office right now'),
( 'Ich gehe jetzt',  'ins',  'Büro',  'I am going to the office now'),
( 'Ich wohne',  'in',  'der Schweiz',  'I live in Switzerland'),
( 'Ich wohne',  'im',  'Schwarzwald',  'I live in the Black Forest'),
( 'Ich fahre',  'in',  'die Schweiz',  'I am travelling to Switzerland'),
( 'Ich bin gerade',  'am',  'Marktplatz',  'I am in the market place right now'),
( 'Ich bin gerade',  'in',  'der Apotheke',  'I am in the pharmacy right now'),
( 'Ich bin gerade',  'zu',  'Hause',  'I am at home right now'),
( 'Ich gehe jetzt',  'nach',  'Hause',  'I am going home now'),
('Ich nehme das Buch',  'aus',  'dem Regal',  'I take the book off the shelf'),
('Ich stelle das Glas',  'auf',  'den Tisch',  'I put the glass on the table'),
('Ich hänge die Lampe',  'über',  'den Esstisch',  'I hang the lamp over the dining table'),
('Die Lampe hängt',  'über',  'dem Esstisch',  'The lamp hangs over the dining table'),
('Ich setze mich',  'auf',  'das Sofa',  'I sit down on the sofa'),
('Ich fliege',  'ab',  'Frankfurt mit Lufthansa',  'I am flying from Frankfurt with Lufthansa'),
( 'Sie kommt',  'aus',  'Deutschland',  'She comes from Germany'),
( 'Die Katze springt',  'durch',  'das Fenster',  'The cat jumps through the window'),
( 'Die Familie sitzt',  'um',  'den Tisch',  'The family is sitting round the table'),
( 'Das Auto fuhr',  'gegen',  'den Baum',  'The car hit the tree'),
( 'Gehen Sie diese Straße',  'entlang',  'und biegen Sie am Ende links ab',  'Go along this street and turn left at the end'),
( 'Köln liegt',  'am',  'Rhein',  'Cologne is on the Rhine'),
( 'Das Kind versteckt sich',  'hinter',  'seiner Mutter',  'The child hides behind his mother'),
( 'Ich gehe jetzt',  'auf',  'die Bank',  'I am going to the bank now'),
( 'Der Schrank steht',  'neben',  'der Tür',  'The cupboard stands next to the door'),
( 'Meine Schwester woht im Haus',  'neben',  'der Kneipe',  'My sister lives in the house next to the pub'),
( 'Ich wohne lieber',  'außerhalb',  'der Stadt',  'I prefer to live outside the city'),
( 'Diese Fahrkarte ist nur',  'innerhalb',  'der Stadt gültig',  'This travel card is only valid within the city'),
( 'Wir fahren',  'über',  'Frankfurt nach Berlin',  'We are travelling via Frankfurt to Berlin'),
( 'Ein alter Baum steht',  'vor',  'dem Haus',  'An old tree stands in front of the house'),
( 'Das Rathaus liegt',  'zwischen',  'dem Park und dem Fluss',  'The town hall is between the park and the river')
;