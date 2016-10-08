var db = require('../db');
// var connection = require('../db/index').database;

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (data) {
      console.log(data);
      console.log(db);
      // db.connection.connect.query('INSERT INTO chat VALUES ', data, function(err, result) {
      //   if (err) {
      //     throw err;
      //   }
      //   console.dir('message entered');
      // });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

// curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","text":"xyz","roomname":"abc"}' http://localhost:3000/classes/messages