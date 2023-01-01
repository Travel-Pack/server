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

			if (!req.body.password) {
				throw({ name: 'Password is required'})
			} else if (req.body.password.length < 5) {
				throw({ name: 'Minimum password length must be 5 letter'})
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

			res.status(200).json({message: "User successfully updated"});
		} catch (error) {
			next(error);
		}
	}

    static async activatePremiumStatus(req, res, next) {
		try {
			const { id } = req.params;
			const findUser = await User.findByPk(+id);

			if (!findUser) {
                throw({ name: 'User not found' });
            }

			if (findUser.isPremium === false) {
                await User.update({ isPremium: true }, { where: { id } });
            } else {
				throw({ name: `User status already premium` });
			}

			res.status(200).json({ message: `User status has been updated to premium` });
		} catch (error) {
			next(error);
		}
	}

	static async deactivatePremiumStatus(req, res, next) {
		try {
			const { id } = req.params;
			const findUser = await User.findByPk(+id);

			if (!findUser) {
                throw({ name: 'User not found' });
            }

			if (findUser.isPremium === true) {
                await User.update({ isPremium: false }, { where: { id } });
            } else {
				throw({ name: `User status already not premium` });
			}

			res.status(200).json({ message: `User status no longer premium` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
