const express = require('express');
const socketIO = require('socket.io');
const http = require('http')
const port = 3000
var app = express();
let server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (newMessage) => {
        console.log(`newMessage ${newMessage}`);
	
	// ---
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	// ---

        io.emit('newMessage', {
	    from: newMessage.to,
	    text: newMessage.text,
            createdAt: `${hours}:${minutes}`
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from user');
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client-side.html");
});

server.listen(port);
