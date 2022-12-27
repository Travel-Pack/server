const { verifyToken } = require("../helpers/jsonwebtoken")
const { User } = require("../models")

class Authentication {
    static async verify(req, res, next){
        try {
            let { access_token } = req.headers
            if (!access_token) throw ({name: "NoTokenFound"})

            let payload = verifyToken(access_token)
            if (!payload) throw ({name: "InvalidToken"})

            let calledUser = await User.findByPk(payload.id)
            if (!calledUser) throw ({name: "InvalidToken"})

            let { id, fullname, isPremium, role } = calledUser
            req.user = { id, fullname, isPremium, role }

            next ()
        } catch (error) {
            next (error)
        }
    }
}

module.exports = Authentication