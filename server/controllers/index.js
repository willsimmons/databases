var models = require('../models');
var connection = require('../db/index').dbconnection;
module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
      .then((data) => {
        // console.log(data); //when empty, empty array is returned
        res.sendStatus(200);
      }).catch((e) => res.sendStatus(400));
    },
    post: function (req, res) {
      models.users.get(req.body.username).catch((e) => { res.sendStatus(400); } )
      .then((data) => {
        if (data.length === 0) {
          return models.users.post({'username': req.body.username});
        } else {
          return models.messages.post({'usernameID': data[0].id, 'message': req.body.text, 'roomname': req.body.roomname});
        }
      }).then((log) => { 
        if (!!Number(log)) {
          return models.messages.post({'usernameID': log, 'message': req.body.text, 'roomname': req.body.roomname});        
        } else {
          res.sendStatus(201);
        }
      }).catch((err) => err).then((log) => res.sendStatus(201));
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      models.users.get()
      .then((data) => {
        // console.log(data); //when empty, empty array is returned
        res.sendStatus(200);
      }).catch((e) => res.sendStatus(400));
    },
    post: function (req, res) {
      models.users.post(req.body).then((msg) => {
        res.sendStatus(201);
      }).catch((e) => { 
        res.sendStatus(400);
      });
    }
  }
};

