const { User, Topic, Message } = require('../models')
const { socketBroadcast } = require('../socket')

class MessageController {
    static async getForum(req, res, next){
        try {
            let { title } = req.params
            let calledForum = await Topic.findOne({where : { title }, include: {model: Message, include: {model: User}} })
            
            res.status(200).json(calledForum)
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Error"})
        }
    }

    static async postTopic(req, res, next){
        try {
            let { title } = req.body
            let newForum = await Topic.create({title})

            res.status(200).json(newForum)
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Error"})
        }
    }

    static async postMessage(req, res, next){
        try {
            let { title } = req.params

            let { id } = req.user.id
            if (!id) id = 1

            let { UserId, text } = req.body
            if (!UserId) UserId = 1

            let calledForum = await Topic.findOne({where: { title }})
            if (!calledForum) throw ({name: "UnknownForum"})

            let newMessage = await Message.create({TopicId: calledForum.id, UserId, text})
            let sendedMessage = await Message.findOne({where: {id: newMessage.id}, include: [User, Topic]})

            socketBroadcast(calledForum.slug, sendedMessage)
            res.status(200).json(newMessage)
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Error"})
        }
    }
}

module.exports = MessageController