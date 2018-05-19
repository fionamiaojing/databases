var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      //console.log('----------------> model run')
      db.connection.query('select u.username, m.text from messages m inner join user u on m.userID = u.userID', function (error, results) {
        if (error) {
          console.log('model error --------------------->');
        } else {
          //console.log('The solution is:---- ', results);
          callback(JSON.stringify(results));
        }
      });
    }, // a function which produces all the messages
    post: function (data) {
      console.log(data);
      //{ text: 'aaa', username: 'khjv', roomname: 'All Messages' }
      var addSql = 'insert into messages values ()';
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
    post: function () {}
  }
};

