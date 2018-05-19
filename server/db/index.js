var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".




exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'chat'
});
 
exports.connection.connect(function(err) {
  if (err) {
    console.log('connet error');
  } else {
    console.log('connected with mysql');
  }
});
 
exports.Query = function(query) {
  return new Promise(function(resolve, reject) {
    exports.connection.query(query, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


