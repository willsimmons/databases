var models = require('../models');
var connection = require('../db/index').dbconnection;
module.exports = {
  messages: {
    get: function (req, res) {
      console.dir('made connect');
      res.sendStatus(200);

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // connection.query('', function(error, rows, fields) {
      //   if (error) {
      //     throw error;
      //   }
      //   console.log('rows', rows, 'fields', fields);
      // });
      console.log('made connect');
      models.messages.post();
      res.sendStatus(203);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      
    },
    post: function (req, res) {
      
    }
  }
};

