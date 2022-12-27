const { Review } = require("../models")

class Authorization {
    static async reviewClearance(req, res, next){
        try {
            if (req.user.role == ('Admin' || 'admin')) return next()
            
            let { id } = req.params
            let calledReview = await Review.findByPk(id)

            if (req.user.id !== calledReview.UserId) throw ({name: "Unauthorized"})

            next()
        } catch (error) {
            next(error)
        }
    }

    static async adminClearance(req, res, next){
        try {
            if (req.user.role == ('Admin' || 'admin')) next()
            else throw({name: "Unauthorized"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Authorization