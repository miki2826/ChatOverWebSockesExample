function getUser() {
    return sessionStorage.getItem("chat_user_name");
}

//Create a SockJS instance
var socket = new SockJS(document.location.protocol + '//' + document.location.host + '/messages');

// Ready
$(function () {
    // Fetch
    var container = $('.container');
    var messages = container.find('.chat');
    var button = container.find('.sendButton');
    var input = container.find('.messageInput').focus();

    //Receive Message
    socket.onmessage = function(event) {
        handleMessage(event.data);
    };

    //Send the message
    function sendMessage() {
        socket.send(JSON.stringify(message));
    }

    input.on('keypress', function (event) {
        if (event.keyCode === 13) { // enter
            prepareAndSendMessage();
        }
    });

    button.on('click', function (event) {
        prepareAndSendMessage();
    });

    function handleMessage(data) {
        var messageParsed = JSON.parse(data);
        var content = messageParsed.text;
        var user = messageParsed.user;
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