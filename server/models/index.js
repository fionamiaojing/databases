var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      //console.log('----------------> model run')
      db.connection.query('SELECT * from messages', function (error, results) {
        if (error) {
          console.log('model error --------------------->');
        } else {
          //console.log('The solution is:---- ', results);
          callback(JSON.stringify(results));
        }
      });
    }, // a function which produces all the messages
    post: function (callback) {
      var addSql = 'insert into messages values ()';
      db.connection.query('');
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

