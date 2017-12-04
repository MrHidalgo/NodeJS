/**
 * @name divEscapedContentElement
 * @function
 *
 * @param message
 *
 * @returns {JQLite | jQuery | HTMLElement}
 */
function divEscapedContentElement(message) {
	return $('<div></div>').text(message);
}


/**
 * @name divSystemContentElement
 * @function
 *
 * @param message
 *
 * @returns {JQLite | jQuery | HTMLElement}
 */
function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>');
}

/**
 * @name processUserInput
 * @function
 *
 * @param chatApp
 * @param socket
 */
function processUserInput(chatApp, socket) {
	let message = $('#send-message').val();
	let systemMessage;
	
	/**
	 * Begin with a slash of data entered by the user, treated as commands
	 */
	if (message.charAt(0) === '/') {
		systemMessage = chatApp.processCommand(message);
		
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		/**
		 * Translating user input to other users
 		 */
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}
	
	$('#send-message').val('');
}


const socket = io.connect();

$(document).on("ready", function() {
	let chatApp = new Chat(socket);
	
	/**
	 * Displaying the results of an attempt to change the name
	 */
	socket.on('nameResult', function(result) {
		let message;
		
		if (result.success) {
			message = 'You are now known as ' + result.name + '.';
		} else {
			message = result.message;
		}
		$('#messages').append(divSystemContentElement(message));
	});
	
	/**
	 * Displaying the results of a room change
	 */
	socket.on('joinResult', function(result) {
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'));
	});
	
	/**
	 * Output of received messages
	 */
	socket.on('message', function (message) {
		let newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});
	
	/**
	 * List the available rooms
	 */
	socket.on('rooms', function(rooms) {
		$('#room-list').empty();
		
		for(let room in rooms) {
			room = room.substring(1, room.length);
			if (room != '') {
				$('#room-list').append(divEscapedContentElement(room));
			}
		}
		
		/**
		 * You can click on the room name to change it
		 */
		$('#room-list div').on("click", function() {
			chatApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});
	
	/**
	 * Request a list of alternately available chat rooms
	 */
	setInterval(function() {
		socket.emit('rooms');
	}, 1000);
	
	
	$('#send-message').focus();
	
	/**
	 * Send chat messages using a form
	 */
	$('#send-form').on("submit", function() {
		processUserInput(chatApp, socket);
		return false;
	});
});

