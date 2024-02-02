# notesTakingWebApp
This is an advance note taking back end heavy web app with real time data sharing and transfer


# try

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  // Handle joining a room
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`Socket ${socket.id} joined room ${roomName}`);
  });

  // Handle leaving a room
  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName);
    console.log(`Socket ${socket.id} left room ${roomName}`);
  });

  // Handle broadcasting a message to a specific room
  socket.on('messageToRoom', (data) => {
    const { roomName, message } = data;
    io.to(roomName).emit('message', message);
  });
});


# client

const socket = io();

// Join Room
socket.emit('joinRoom', 'room1');

// Send message to Room
socket.emit('messageToRoom', { roomName: 'room1', message: 'Hello, room1!' });

// Leave Room
socket.emit('leaveRoom', 'room1');


