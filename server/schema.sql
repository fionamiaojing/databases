CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  msgID int NOT NULL,
  userID int NOT NULL,
  text varchar(200) NOT NULL,
  roomID int NOT NULL,
  PRIMARY KEY (msgID)
);

/* Create other tables and define schemas for them here! */





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

