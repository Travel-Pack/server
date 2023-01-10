const { User, Topic, Message } = require('../models')

class TopicController {
    static async getTopic(req, res, next){
        try {
            let { id } = req.params
            let calledForum = await Topic.findOne({
                where : { id }, 
                include: [
                    { model: User, attributes: ['fullName']}, 
                    { model: Message, include: { model: User, attributes: ['fullName'] }}
                ]
            })
            
            res.status(200).json(calledForum)
        } catch (error) {
            next(error)
        }
    }

    static async getAllTopics(req, res, next){
        try {
            let allTopics = await Topic.findAll()
            res.status(200).json(allTopics)
        } catch (error) {
            next(error)
        }
    }

    static async postTopic(req, res, next){
        try {
            let { title, type } = req.body
            let UserId = req.user.id

            let newTopic = await Topic.create({title, type, UserId})
            if (type == 'Forum') await User.increment("point", { where: { id: UserId }})
            
            res.status(201).json(newTopic)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TopicController