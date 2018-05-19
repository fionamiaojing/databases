var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      //console.log('----------------> model run')
      db.connection.query('select u.username, m.message from messages m inner join user u on m.userID = u.userID', function (error, results) {
        if (error) {
          console.log('model error --------------------->');
        } else {
          //console.log('The solution is:---- ', results);
          callback(JSON.stringify(results));
        }
      });
    }, // a function which produces all the messages
    post: function ({message, username, roomname}) {
      //{ message: 'aaa', username: 'khjv', roomname: 'All Messages' }
      var findUserID = function(username) {
        return new Promise(function(resolve, reject) {
          db.connection.query(`select userID from user where username='${username}'`, function(error, results) {
            if (error) {
              reject(error);
            } else {
              resolve(results[0].userID);
            }
          })
        })
      };
      
      var findRoomID = function(roomname) {
        return new Promise(function(resolve, reject) {
          db.connection.query(`select roomID from room where roomname='${roomname}'`, function(error, results) {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          })
        })
        .then(function(results) {
          if (!results.length) {
            console.log('insert roomname')
            return new Promise(function(resolve, reject) {
              db.connection.query(`insert into room (roomname) values ('${roomname}')`, function(error, results) {
                if (error) {
                  reject(error);
                } else {
                  console.log('insert result s --------------->', results.insertId);
                  resolve(results.insertId);
                }
              });
            })
          } else {
            return results[0].roomID;
            console.log('roomname existed', results[0]);
          }
        })
      };
      
      
      Promise.all([findUserID(username), findRoomID(roomname)])
      .then(function(array) {
        console.log(array);
        console.log(message);
        db.connection.query(`insert into messages (userID, message, roomID) values ('${array[0]}', '${message}','${array[1]}')`)
      })  
      //db.connection.query('');
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.connection.query('SELECT * from user', function (error, results) {
        if (error) {
          //console.log('model error --------------------->');
        } else {
          console.log('The solution is:---- ', results);
          callback(JSON.stringify(results));
        }
      });
    },
    post: function ({username}) {
      //{ username: 'Valjean' }
      console.log(username);
      
      var findUserID = function(username) {
        return new Promise(function(resolve, reject) {
          db.connection.query(`select userID from user where username='${username}'`, function(error, results) {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          })
        })
        .then(function(results) {
          if (!results.length) {
            console.log('insert username')
            console.log(`insert into user (username) values ('${username}')`)
            db.connection.query(`insert into user (username) values ('${username}')`)
          } else {
            console.log('username exists')
          }
        })
      }
      
      findUserID(username);
    }
  }
};

