  
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

DROP DATABASE if exists game_db;
CREATE DATABASE game_db;

USE game_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    user_pokemon varchar(255),
    primary key (id)
);

CREATE TABLE games (
    id INT NOT NULL AUTO_INCREMENT,
    game_title VARCHAR(250) NOT NULL,
    user_id INT,
    FOREIGN KEY (id) REFERENCES users(id)
);
