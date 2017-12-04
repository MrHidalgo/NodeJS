let Chat = function(socket) {
	this.socket = socket;
};

/**
 * @name sendMessage
 * @method
 *
 * @param room
 * @param text
 *
 * @description Send message
 */
Chat.prototype.sendMessage = function(room, text) {
	let message = {
		room: room,
		text: text
	};
	
	this.socket.emit("message", message);
};


/**
 * @name changeRoom
 * @method
 *
 * @param room
 *
 * @description Change room
 */
Chat.prototype.changeRoom = function(room) {
	this.socket.emit("join", {
		newRoom: room
	})
};


/**
 * @name processCommand
 * @method
 *
 * @param command
 *
 * @returns {boolean}
 *
 * @description Processing of chat commands
 */
Chat.prototype.processCommand = function(command) {
	let message = false,
		words = command.split("");
	
	let command = words[0].substring(1, words[0].length).toLowerCase();
	
	switch (command) {
		case 'join' :
			words.shift();
			
			let room = words.join('');
			
			this.changeRoom(room);
			
			break;
		case 'nick' :
			words.shift();
			
			let name = words.join('');
			
			this.socket.emit("nameAttempt", name);
			
			break;
		default:
			message = "Unrecognized command";
			break;
	}
	
	return message;
};
