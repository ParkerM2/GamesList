DROP DATABASE if exists game_db;
CREATE DATABASE game_db;

USE game_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    user_pokemon varchar(255),
    user_game_list varchar(255),
    primary key (id)
);

CREATE TABLE games (
    id INT NOT NULL AUTO_INCREMENT,
    game_title VARCHAR(250)) NOT NULL,
);
