function getUser() {
    return sessionStorage.getItem("chat_user_name");
}

// IO
var socket = io.connect(document.location.protocol + '//' + document.location.host);

// Ready
$(function () {
    // Fetch
    var container = $('.container');
    var messages = container.find('.chat');
    var button = container.find('.sendButton');
    var input = container.find('.messageInput').focus();

    // Receive Message
    socket.on('message', function (message) {
        console.log('received message:', message);
        var content = message.text;
        var user = message.user;
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
    });

    // Send Message
    input.on('keypress', function (event) {
        if (event.keyCode === 13) { // enter
            sendMessage();
        }
    });

    button.on('click', function (event) {
        sendMessage();
    });

    function sendMessage() {
        var user = getUser();
        var retMessage;
        retMessage = input.val().trim();

        var message = {
            user: user,
            text: retMessage
        };
        console.log('send message:', message);
        socket.emit('message', message);
        input.val(''); // clear input
    }
});