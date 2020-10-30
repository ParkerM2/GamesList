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

CREATE TABLE user_games (
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (game_id) REFERENCES games(id)
)

CREATE TABLE games (
    id INT NOT NULL AUTO_INCREMENT,
    game_title VARCHAR(250) NOT NULL,
    description VARCHAR(250),
    genre_id INT NOT NULL,
    FOREIGN KEY(genre_id) REFERENCES genres(id)
);

CREATE TABLE genres (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
)

  -- Creates a boolean column called "mastered" which will automatically fill --
  -- with true when a new row is made and the value isn't otherwise defined. --
--   mastered BOOLEAN DEFAULT true,