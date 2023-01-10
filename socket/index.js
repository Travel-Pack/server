const { User, Message, Topic } = require('../models')

let io

const socketListener = () => {
    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on("join_room", (slug) => {
            socket.join(slug);
        });

        socket.on("send_message", async (data) => {
            try {
                let { slug, email, text } = data
                if (!slug || !email || !text) throw({name: "Bad Request"})

                let calledForum = await Topic.findOne({where: { slug }})
                if (!calledForum) throw ({name: "Invalid Topic"})

                let calledUser = await User.findOne({where: {email}})
                if (!calledUser) throw ({name: "Invalid User"})
                await calledUser.increment("point")

                let newMessage = await Message.create({TopicId: calledForum.id, UserId: calledUser.id, text})
                let sendedMessage = await Message.findOne({where: {id: newMessage.id}, include: [User, Topic]})

                io.in(slug).emit("receive_message", sendedMessage);
            } catch (error) {
                console.log(error);
                socket.to(socket.id).emit("receive_message", ["error", error]);
            }

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
