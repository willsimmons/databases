CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INTEGER(4) NOT NULL,
  username VARCHAR(50),
  PRIMARY KEY (id)/* Describe your table here.*/
);

CREATE TABLE messages (
  id INTEGER(4) NOT NULL,
  usernameID INTEGER(4),
  message  VARCHAR(150),
  roomname VARCHAR(30),
  PRIMARY KEY (id),/* Describe your table here.*/
  FOREIGN KEY (usernameID) REFERENCES users(id)
);

/* Create other tables and define schemas for them here! */



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

