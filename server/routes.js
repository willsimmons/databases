var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
//client asks for messages
router.get('/messages', controller.messages.get);
//client sends us messages
router.post('/messages', controller.messages.post);
//client just here?
router.get('/users', controller.users.get);
//client creating a new user
router.post('/users', controller.users.post);


module.exports = router;

