CREATE DATABASE chat;

USE chat;

CREATE TABLE room (
  roomID int NOT NULL AUTO_INCREMENT,
  roomname varchar(200) NOT NULL,
  PRIMARY KEY (roomID)
);

CREATE TABLE user (
  userID int NOT NULL AUTO_INCREMENT,
  username varchar(200) NOT NULL,
  PRIMARY KEY (userID)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  msgID int NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  text varchar(200) ,
  roomID int NOT NULL,
  PRIMARY KEY (msgID),
  FOREIGN KEY (userID) REFERENCES user (userID),
  FOREIGN KEY (roomID) REFERENCES room (roomID)
);

/* Create other tables and define schemas for them here! */








/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

