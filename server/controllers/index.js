var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200; 
  response.writeHead(statusCode, headers);
  response.end(data);
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data) {
        //console.log(data);
        sendResponse(res, data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var body = req.body;
      models.messages.post(body);
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.messages.get(function(data) {
        //console.log(data);
        sendResponse(res, data);
      });
    },
    post: function (req, res) {}
  }
};

