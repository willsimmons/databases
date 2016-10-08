var htmlEncode = function(value) {
  return $('<div/>').text(value).html();
};

// set universal on focus to be regular title
// on new messages, set some new messages var count
// if not on page, alert user with title
// once BACK on page after having unread messages, reset inactive page title to
  // be default

var app = {
  server: '127.0.0.1:3000/classes',
  users: {},
  appUsername: 'no one and everyone',
  friends: {},
  rooms: {'View all': true},
  activeRoom: 'View all',

  init: function() {

    var context = this;
    $('.submit').on('click submit', this.handleSubmit.bind(this));

    this.refreshFeed();
    setInterval(this.refreshFeed.bind(this), 2000);

    this.renderRoom(this.activeRoom);
    $('.roomname').addClass('active-room');


    $(document.body).on('click', '.username', function() {
      var username = $(this).data('username');
      context.handleUsernameClick(username);
    });
    $(document.body).on('click', '.roomname', function() {
      var roomname = $(this).data('roomname');
      context.handleRoomnameClick(roomname);
    });
    $(document.body).on('click', '.add-room', function() {
      var roomname = $('#new-room').val();
      context.handleAddRoom(roomname);
    });
    $(document.body).on('click', '.friendname', function() {
      $(this).remove();
      delete context.friends[$(this).text()];
      $(`[data-username='${$(this).text()}'].message`).removeClass('friend-message');
    });
  },
  send: function(message) {
    $.ajax({
      url: this.server + '/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(callback) {
    $.ajax({
      url: this.server,
      type: 'GET',
      success: callback,
      error: callback
    });
  },
  clearMessages: function() {
    $('#chats').html('');
  },
  renderMessage: function(message) {
    var cleanMessageText = htmlEncode(message.text);
    var cleanUsername = htmlEncode(message.username);
    var cleanRoomname = htmlEncode(message.roomname);
    var className = 'message';
    if (this.friends[cleanUsername]) {
      className += ' friend-message';
    }
    var $newMessage = $(`<p><span class='${className}' data-roomname='${cleanRoomname}' data-username='${cleanUsername}'>${cleanUsername}: ${cleanMessageText}</span></p>`);
    $('#chats').prepend($newMessage);
  },
  renderRoom: function(room) {

    $('#roomSelect').append(`<div class='roomname' data-roomname='${room}'>${room}</div>`);
  },
  renderUser: function(username) {
    var $newUser = $(`<li class='username' data-username='${username}'>${username}</li>`);
    $newUser.prependTo('#user-list');
  },
  handleUsernameClick: function(friend) {
    if (!this.friends[friend]) {
      $('#friends .people-list').append(`<li class='friendname'>${friend}</li>`);
      this.friends[friend] = true;
      $(`[data-username='${friend}'].message`).addClass('friend-message');
    }
  },
  handleRoomnameClick: function(room) {
    this.activeRoom = room;
    $('.active-room').removeClass('active-room');
    $(`[data-roomname='${room}'].roomname`).addClass('active-room');

    var context = this;
    $('.message').each(function() {
      var $message = $(this);
      $message.removeClass('hidden-message');
      if (context.activeRoom !== 'View all' && context.activeRoom !== $message.data('roomname')) {
        $message.addClass('hidden-message');
      }
    });
  },
  handleSubmit: function() {
    var message = {
      text: $('#message').val(),
      username: $('#my-name').val(),
      roomname: this.activeRoom
    };
    this.send(message);
    this.refreshFeed();
    $('#message').val('');
  },
  handleAddRoom: function(roomname) {
    this.rooms[roomname] = true;
    this.renderRoom(roomname);
  },
  refreshFeed: function() {
    this.fetch(function (data) {
      data = JSON.parse(data);

      this.clearMessages();

      var newMessages = [];


      // Update the UI, based on every new message
      this.updateDisplay(data.results);

    }.bind(this));
  },
  updateDisplay: function(newMessages) {
    for (var i = newMessages.length - 1; i >= 0; i--) {
      var datum = newMessages[i];
      var cleanUsername = htmlEncode(datum.username);
      var cleanRoomname = htmlEncode(datum.roomname);

      if (this.activeRoom === 'View all' || this.activeRoom === cleanRoomname) {
        this.renderMessage(datum);
      }

      if (!(this.users[cleanUsername])) {
        this.users[cleanUsername] = true;
        this.renderUser(cleanUsername);
      }
      if (!(this.rooms[cleanRoomname])) {
        this.rooms[cleanRoomname] = true;
        this.renderRoom(cleanRoomname);
      }
    }
  }
};

$(document).ready(function() {
  app.init();
});
