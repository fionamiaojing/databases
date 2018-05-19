var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.connection.query('select u.username, m.message from messages m inner join user u on m.userID = u.userID', function (error, results) {
        if (error) {
          console.log('model error');
        } else {
          callback(JSON.stringify(results));
        }
      });
    }, 
    
    post: function ({message, username, roomname}) {
      var findUserID = function(username) {
        var query = `select userID from user where username='${username}'`;
        return db.Query(query)
      };
      
      var findRoomID = function(roomname) {
        var query = `select roomID from room where roomname='${roomname}'`;
        return db.Query(query)
          .then(function(results) {
            if (!results.length) {
              var query = `insert into room (roomname) values ('${roomname}')`;
              var result = db.Query(query)
              return result.insertId
            } else {
              return results[0].roomID;
            }
          });
      };
      
      
      Promise.all([findUserID(username), findRoomID(roomname)])
        .then(function(array) {
          db.connection.query(`insert into messages (userID, message, roomID) values ('${array[0][0].userID}', '${message}','${array[1]}')`);
        });
    } 
  },

  users: {
    get: function (callback) {
      db.connection.query('SELECT * from user', function (error, results) {
        if (error) {
          console.log('model error ');
        } else {
          callback(JSON.stringify(results));
        }
      });
    },
    post: function ({username}) {
      var findUserID = function(username) {
        var query = `select userID from user where username='${username}'`;
        db.Query(query)
          .then(function(results) {
            if (!results.length) {
              db.connection.query(`insert into user (username) values ('${username}')`);
            } else {
              console.log('username exists');
            }
          });
      };
      
      findUserID(username);
    }
  }
};

