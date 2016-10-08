var models = require('../models');
var connection = require('../db/index').dbconnection;
module.exports = {
  messages: {
    get: function (req, res) {
      console.dir('made connect');
      res.sendStatus(200);
    }, // a function which handles a get request for all messages
    post: function (req, res) { 
      models.messages.post(req.body);
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

