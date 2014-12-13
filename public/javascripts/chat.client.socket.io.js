function getUser() {
    return sessionStorage.getItem("chat_user_name");
}

//Create a Socket.io instance
var socket = io.connect(document.location.protocol + '//' + document.location.host);

// Ready
$(function () {
    // Fetch
    var container = $('.container');
    var messages = container.find('.chat');
    var button = container.find('.sendButton');
    var input = container.find('.messageInput').focus();

    // Receive Message
    socket.on('message', function (event) {
        handleMessage(event);
    });

    //Send the message
    function sendMessage(message) {
        socket.emit('message', message);
    }

    input.on('keypress', function (event) {
        if (event.keyCode === 13) { // enter
            prepareAndSendMessage();
        }
    });

    button.on('click', function (event) {
        prepareAndSendMessage();
    });

    function handleMessage(event) {
        var content = event.text;
        var user = event.user;
        var userImage = "http://placehold.it/50/55C1E7/fff&amp;text=" + user.charAt(0);
        var message = $('<li class="left clearfix"><span class="chat-img pull-left">' +
        '<img src="' + userImage + '"  class="img-circle">' +
        '</span>' +
        '<div class="chat-body clearfix">' +
        '<div class="header">' +
        '<strong class="primary-font">' + user + '</strong>' +
        '</div>' +
        '<p>' + content +
        '</p>' +
        '</div>' +
        '</li>');
        messages.append(message);
    }

    function prepareAndSendMessage() {
        var user = getUser();
        var retMessage;
        retMessage = input.val().trim();

        var message = {
            user: user,
            text: retMessage
        };
        sendMessage(message);
        input.val(''); // clear input
    }
});