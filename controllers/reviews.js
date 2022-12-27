const { Review } = require("../models")

class ReviewController {
    static async postReview(req, res, next){
        try {
            let { DestinationId, cost, fun, internet, safety, comment } = req.body
            let UserId = req.user.id

            let newReview = await Review.create({ DestinationId, cost, fun, internet, safety, comment, UserId })
            res.status(201).json({msg: `New Review with id ${newReview.id} has been created`})
        } catch (error) {
            next (error)
        }
    }

    static async putReview(req, res, next){
        try {
            let { DestinationId, cost, fun, internet, safety, comment } = req.body
            let { id } = req.params

            let calledReview = await Review.findByPk(id)
            if (!calledReview) throw({name: "UnknownId"})

            await calledReview.update({ DestinationId, cost, fun, internet, safety, comment })
            res.status(201).json({msg: `Review with id ${calledReview.id} has been updated`})
        } catch (error) {
            next (error)
        }
    }

    static async delReview(req, res, next){
        try {
            let { id } = req.params

            let calledReview = await Review.findByPk(id)
            if (!calledReview) throw({name: "UnknownId"})

            await calledReview.destroy()
            res.status(201).json({msg: `Review with id ${calledReview.id} has been deleted`})
        } catch (error) {
            next (error)
        }
    }
}

module.exports = ReviewController