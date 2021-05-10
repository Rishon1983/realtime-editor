import socket from "socket.io";

const initSocket = (server) => {
	let users = [];
	let io = socket(server);

	// Chatroom

	io.on('connection', (socket) => {

		console.log('1111111')

		// when the client emits 'add file', this listens and executes
		socket.on('add file', (data) => {
			// we tell the client to execute 'new file'
			socket.broadcast.emit('add file', {
				type: 'add file',
				message: data
			});
		});


		let addedUser = false;

		// when the client emits 'new message', this listens and executes
		socket.on('new message', (data) => {
			// we tell the client to execute 'new message'
			socket.broadcast.emit('new message', {
				userName: socket.userName,
				type: 'new message',
				message: data
			});
		});

		// when the client emits 'add user', this listens and executes
		socket.on('add-user', (userName) => {
			if (addedUser) return;

			// we store the userName in the socket session for this client
			socket.userName = userName;
			users.push({
				userName: socket.userName,
				typing: false
			});
			users.reverse();
			addedUser = true;
			socket.emit('login', {
				userName: socket.userName,
				users: users
			});
			// echo globally (all clients) that a person has connected
			socket.broadcast.emit('user-joined', {
				userName: socket.userName,
				type: 'user-joined',
				users: users
			});
		});

		// when the client emits 'typing', we broadcast it to others
		socket.on('typing', (data) => {
			for (const userIndex of users) {
				const user = users[userIndex];
				if (user.userName === data) {
					user.typing = true;
					break;
				}
			}
			socket.broadcast.emit('typing', {
				users: users
			});
		});

		// when the client emits 'stop typing', we broadcast it to others
		socket.on('stop-typing', (data) => {
			for (const userIndex in users) {
				const user = users[userIndex];
				if (user.userName === data) {
					user.typing = false;
					break;
				}
			}
			socket.broadcast.emit('stop-typing', {
				users: users
			});
		});

		// when the user disconnects.. perform this
		socket.on('disconnect', () => {
			if (addedUser) {
				users = users.filter(user => {
					return user.userName !== socket.userName;
				});

				// echo globally that this client has left
				socket.broadcast.emit('user-left', {
					userName: socket.userName,
					type: 'user-left',
					users: users
				});
			}
		});
	});
}


export {initSocket};