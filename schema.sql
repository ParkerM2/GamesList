  
DROP DATABASE IF EXISTS collection_db;

CREATE DATABASE collection_db;


USE collection_db;

CREATE TABLE games(
    id Int NOT NULL AUTO_INCREMENT, 
   game varchar(50) NOT NULL,
   PRIMARY KEY (id) 
);

INSERT INTO games(game) VALUES ('Baulders-gate');
SELECT * FROM games