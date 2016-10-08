var models = require('../models');
var connection = require('../db/index').dbconnection;
module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
      .then((data) => {
        console.log(data);
        res.sendStatus(200);
      }).catch((e) => res.sendStatus(400));
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.users.get(req.body.username)
      .then((data) => {
        console.log(data);
        res.sendStatus(301);
      }).catch((e) => {console.log(e); res.sendStatus(400);});

      // models.messages.post(req.body).then((msg) => {
      //   // console.log(data);
      //   res.sendStatus(201);
      // }).catch((e) => { 
      //   res.sendStatus(400);
      // });
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      models.users.get()
      .then((data) => {
        console.log(data);
        res.sendStatus(200);
      }).catch((e) => res.sendStatus(400));
    },
    post: function (req, res) {
      models.users.post(req.body).then((msg) => {
        // console.log(data);
        res.sendStatus(201);
      }).catch((e) => { 
        res.sendStatus(400);
      });
    }
  }
};

