import socket from "socket.io";
import {getFileNames, deleteFile, createFile, readFile} from './services/files-sevice.js'

const initSocket = (server) => {
	let io = socket(server);

	// Chatroom

	io.on('connection', (socket) => {

		// when the client emits 'get files', this listens and executes
		socket.on('get files', () => {

			// we tell the client to execute 'get files'
			socket.emit('get files', {
				type: 'get files',
				data: getFileNames()
			});
		});

		// when the client emits 'get files', this listens and executes
		socket.on('read file', (data) => {

			// we tell the client to execute 'get files'
			socket.emit('read file', {
				type: 'read file',
				fileName: data,
				value: readFile(data)
			});
		});

		// when the client emits 'add file', this listens and executes
		socket.on('add file', (data) => {
			// we tell the client to execute 'new file'
			socket.broadcast.emit('add file', {
				type: 'add file',
				data: createFile(data)
			});
		});

		// when the client emits 'add file', this listens and executes
		socket.on('delete file', (data) => {
			// we tell the client to execute 'delete file'
			socket.broadcast.emit('delete file', {
				type: 'delete file',
				data: deleteFile(data)
			});
		});

		// when the client emits 'edit file', this listens and executes
		socket.on('edit file', (data) => {

			/*
			* save file
			* */
			createFile(data.fileName, data.value);

			// we tell the client to execute 'edit file'
			socket.broadcast.emit('edit file', {
				type: 'edit file',
				fileName: data.fileName,
				data: data.value
			});
		});

		// when the user disconnects.. perform this
		socket.on('disconnect', () => {
			console.log('disconnected')
			// 	users = users.filter(user => {
			// 		return user.userName !== socket.userName;
			// 	});
		});
	});
}


export {initSocket};