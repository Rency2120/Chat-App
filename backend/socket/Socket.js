// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';

// const app = express();
// const server = http.createServer(app);

// let io;
// try {
//   io = new Server(server, {
//     cors: {
//       origin: 'http://localhost:3000',
//       methods: ['GET', 'POST'],
//       credentials:'true'
//     },
//   });
// const userSocketMap ={}; //{userId: socketId}


//   io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);
    
//     const getReceiverSocketId = (receiverId)=>{
//       return userSocketMap[receiverId];
//     }
    
//     const userId = socket.handshake.query.userId;
    
//     if(userId !== undefined) userSocketMap[userId]= socket.id;
    
//     // io.emit() is used to send events to all the connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));  

//     socket.on('disconnect', () => {
//       console.log('user disconnected', socket.id);
//       delete userSocketMap[userId];
      
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));  
//     });

//     socket.on('error', (error) => {
//       console.error('Socket.IO error:', error);
//     });
//   });

// } catch (error) {
//   console.error('Error initializing Socket.IO:', error);
// }

// export { app, server };
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

let io;
const userSocketMap = {}; 

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

try {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: 'true',
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== undefined) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });

    socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });
  });
} catch (error) {
  console.error('Error initializing Socket.IO:', error);
}

export { app, server, getReceiverSocketId,io };
