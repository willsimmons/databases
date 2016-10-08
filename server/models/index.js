var db = require('../db');

// var connection = require('../db/index').database;

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.connection.query('SELECT * FROM messages;', function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }, // a function which produces all the messages
    post: function (obj) {
      // return new Promise(function(resolve, reject) {
      //   db.connection.query('INSERT INTO messages VALUES ('+ obj.
      //     , function(err, data) {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       resolve(data);
      //     }
      //   });
      // });
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {
      if (arguments.length > 0) {
        var name = arguments[0]; 
        return new Promise(function(resolve, reject) {
          db.connection.query('SELECT id FROM users WHERE username= ?', name, function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      } else {
        return new Promise(function(resolve, reject) {
          db.connection.query('SELECT * FROM users;', function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });  
      }
    },
    post: function (obj) {
      return new Promise(function(resolve, reject) {
        console.log(obj);
        db.connection.query('INSERT INTO users SET ?', obj, 
          function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(obj.username + 'successfully added.');
            }
          });
      });
    }
  }
};

// curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","text":"xyz","roomname":"abc"}' http://localhost:3000/classes/messages