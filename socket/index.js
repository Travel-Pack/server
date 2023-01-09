let io

const socketListener = () => {
    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
        
        socket.on("join_room", (slug) => {
            socket.join(slug);
        });
      
        socket.on("disconnect", () => {
          console.log("User Disconnected", socket.id);
        });
      });
}

const socketIoInit = (app) => {
    const { Server } = require('socket.io')
    const client = `http://localhost:5173`

    io = new Server(app, {
        cors: {
            origin: client,
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    socketListener()
}

const socketBroadcast = (room, message) => {
    io.in(room).emit("receive_message", message)
}

module.exports = { socketIoInit, socketBroadcast }