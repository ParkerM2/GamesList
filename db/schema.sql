DROP DATABASE if exists game_db;
CREATE DATABASE game_db;
USE game_db;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    user_pokemon varchar(255),
    pokemon_name varchar(255),
    pokemon_img varchar(255)
);
select user_pokemon from users where id = 1;
CREATE TABLE games (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    game_title VARCHAR(250) NOT NULL,
    game_img VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE collections(
    id Int NOT NULL AUTO_INCREMENT, 
   collection varchar(50) NOT NULL,
   PRIMARY KEY (id) 
);
SELECT * FROM users;
SELECT * FROM games;
SELECT * FROM collections;

