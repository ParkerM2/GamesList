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
    platform VARCHAR(45) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);


  -- Creates a boolean column called "mastered" which will automatically fill --
  -- with true when a new row is made and the value isn't otherwise defined. --
--   mastered BOOLEAN DEFAULT true,