const { User } = require("../models");
const { hashPassword } = require('../helpers/bcryptjs');

class UserController {
    static async userById(req, res, next) {
        try {
            const { id } = req.params;
            const userById = await User.findByPk(+id);

            if (!userById) {
                throw({ name: 'User not found' });
            } else {
                res.status(200).json({ userById });
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
		try {
			const { id } = req.params;

			const findUser = await User.findByPk(+id);

			if (!findUser) {
                throw({ name: 'User not found' });
            }

			const updateUser = {
				fullName: req.body.fullName,
				phoneNumber: req.body.phoneNumber,
				email: req.body.email,
				password: hashPassword(req.body.password)
			};

			const data = await User.update(updateUser, {
				where: {
					id
				},
			});

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

    static async updatePremiumStatus(req, res, next) {
		try {
			const { id } = req.params;
			const findUser = await User.findByPk(+id);

			if (!findUser) {
                throw({ name: 'User not found' });
            }

			await User.update({ isPremium: true }, { where: { id } });
			res.status(200).json({ id: +id, message: "User has been updated to premium" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
