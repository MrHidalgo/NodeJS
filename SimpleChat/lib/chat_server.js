const socketio = require("socket.io");

let io,
	guestNumber = 1,
	nickNames = {},
	namesUsed = [],
	currentRoom = {};


/**
 * @name listen
 * @function
 *
 * @param server
 *
 * @description Create logic to installation connect
 */
exports.listen = function(server) {
	
	/**
	 * Start Socket IO server to tun together with HTTP-server on port 3000
	 */
	io = socketio.listen(server);
	io.set("log level", 1);
	
	/**
	 * Determining the way to process each user connection
	 */
	io.sockets.on("connection", function(socket) {
		
		/**
		 * Assigning a user to the guest name guest
		 */
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		
		/**
		 * Place the connected user in the Lobby room
		 */
		joinRoom(socket, namesUsed);
		
		/**
		 * Processing of user messages, attempts to change the name and attempts to create/change rooms
		 */
		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);
		
		/**
		 * Displaying the list of occupied rooms on user request
		 */
		socket.on("rooms", function() {
			socket.emit("rooms", io.sockets.manager.rooms)
		});
		
		/**
		 * Defining the purge logic that is executed after the user leaves the chat
		 */
		handleClientDisconnection(socket, nickNames, namesUsed);
	});
};


/**
 * @name assignGuestName
 * @function
 *
 * @param socket
 * @param guestNumber
 * @param nickNames
 * @param namesUsed
 *
 * @returns {*}
 *
 * @description Assigning a Guest Name
 */
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	/**
	 * Create new Guest name
	 * @type {string}
	 */
	const name = "Guest" + guestNumber;
	
	/**
	 * Associating a guest name with a client connection ID
	 * @type {string}
	 */
	nickNames[socket.id] = name;
	
	/**
	 * Message to the user of his guest name
	 */
	socket.emit("nameResult", {
		success: true,
		name: name
	});
	
	namesUsed.push(name);
	
	return guestNumber + 1;
}


/**
 * @name joinRoom
 * @function
 *
 * @param socket
 * @param room
 *
 * @description Joining an existing chat room
 */
function joinRoom(socket, room) {
	/**
	 * Enter user in room
	 */
	socket.join(room);
	
	/**
	 * Detecting a user in a given room
	 */
	currentRoom[socket.id] = room;
	
	/**
	 * Notification of the user that he is in a new room
	 */
	socket.emit("joinResult", {
		room: room
	});
	
	/**
	 * Notify other users when a new user appears in the chat room
	 */
	socket.broadcast.to(room).emit("message", {
		text: nickNames[socket.id] + " has joined " + room + "."
	});
	
	/**
	 * Identifying other users in the same room as the user
	 * @type {SocketIO.Namespace}
	 */
	let usersInRoom = io.sockets.clients(room);
	
	/**
	 * If other users are present in this chat room, sum them up
	 */
	if(usersInRoom.length > 1) {
		let usersInRoomSummary = "User currently in " + room + ".";
		
		for(let index in usersInRoom) {
			let userSocketId = usersInRoom[index].id;
			
			if(userSocketId !== socket.id) {
				if(index > 0) {
					usersInRoomSummary =+ ", ";
				}
				
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		
		usersInRoomSummary += ".";
		
		socket.emit("message", {
			test: usersInRoomSummary
		});
	}
}


/**
 * @name handleMessageBroadcasting
 * @function
 *
 * @param socket
 *
 * @description Sending chat messages
 */
function handleMessageBroadcasting(socket) {
	socket.on("message", function(message) {
		socket.broadcast.to(message.room).emit("message", {
			text: nickNames[socket.id] + " : " + message.text
		});
	});
}


/**
 * @name handleNameChangeAttempts
 * @function
 *
 * @param socket
 * @param nickNames
 * @param namesUsed
 *
 * @description Name change request
 */
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
	/**
	 * Add event listener nameAttempt
	 */
	socket.on("nameAttempt", function(name) {
		
		/**
		 * Do not accept names that begin with Guest
		 */
		if(name.indexOf("Guest") === 0) {
			socket.emit("nameResult", {
				success: false,
				message: "Names cannot begin with 'Guest'"
			});
		} else {
			
			/**
			 * If the name is not used, select it
			 */
			if(namesUsed.indexOf(name) === -1) {
				let prevName = nickNames[socket.id];
				let prevNameIndex = namesUsed.indexOf(prevName);
				
				namesUsed.push(name);
				
				nickNames[socket.id] = name;
				
				/**
				 * Deleting a previously selected name that is released for other clients
				 */
				delete namesUsed[prevNameIndex];
				
				socket.emit("nameResult", {
					success: true,
					name: name
				});
				
				socket.broadcast.to(currentRoom[socket.id].emit('message', {
					text: prevName + " is now know as " + name + "."
				}))
				
			} else {
				/**
				 * If the name is registered, the client sends an error message
				 */
				socket.emit("nameResult", {
					success: false,
					message: "That name is already in use"
				});
			}
		}
	});
}


/**
 * @name handleRoomJoining
 * @function
 *
 * @param socket
 *
 * @description Creating chat rooms
 */
function handleRoomJoining(socket) {
	socket.on("join", function(room) {
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}


/**
 * @name handleClientDisconnection
 * @function
 *
 * @param socket
 *
 * @description Manage user exit from chat
 */
function handleClientDisconnection(socket) {
	socket.on("disconnect", function() {
		let nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}
