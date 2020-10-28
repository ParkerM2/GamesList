DROP DATABASE IF EXISTS collection_db;

CREATE DATABASE collection_db;


USE collection_db;

CREATE TABLE collections(
    id Int NOT NULL AUTO_INCREMENT, 
   game varchar(50) NOT NULL,
   PRIMARY KEY (id) 
);

INSERT INTO collections(game) VALUES ('Baulders-gate');
SELECT * FROM collections