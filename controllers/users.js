const { User } = require("../models");
const { hashPassword } = require('../helpers/bcryptjs');
const nodemailer = require("nodemailer");

class UserController {
	static async userById(req, res, next) {
		try {
			const userById = await User.findByPk(req.user.id, {
				attributes: { exclude: ['password'] }
			});

			res.status(200).json({ userById });
		} catch (error) {
			next(error);
		}
	}

	static async updateUser(req, res, next) {
		try {
			if (!req.body.password) {
				throw ({ name: 'Password is required' })
			} else if (req.body.password.length < 5) {
				throw ({ name: 'Minimum password length must be 5 letter' })
			}

			const updateUser = {
				fullName: req.body.fullName,
				phoneNumber: req.body.phoneNumber,
				email: req.body.email,
				password: hashPassword(req.body.password)
			};

			const data = await User.update(updateUser, {
				where: {
					id: req.user.id
				},
			});

			res.status(200).json({ message: "User successfully updated" });
		} catch (error) {
			next(error);
		}
	}

	static async activatePremiumStatus(req, res, next) {
		try {
			// const findUser = await User.findByPk(req.user.id);

			if (req.user.isPremium === false) {
				const transporter = nodemailer.createTransport({
					service: 'gmail',
					host: 'smtp.gmail.com',
					port: 486,
					auth: {
						user: 'bobby.notokoesoemo@gmail.com',
						pass: process.env.NODEMAILER_PASS,
					},
				});

				const mailOptions = {
					from: "bobby.notokoesoemo@gmail.com",
					to: req.user.email,
					// to: "bobby.notokoesoemo@gmail.com",
					subject: "Premium status notification",
					text: `Dear ${req.user.fullName},

We are pleased to inform you that you have been upgraded to a premium user!

As a premium user, you will have access to a range of exclusive benefits and features that are not available to standard users. These include:

Priority customer support
Advanced customization options
And more!
We hope you will enjoy your upgraded experience. If you have any questions or need assistance, please don't hesitate to reach out to our customer support team.

Sincerely,
TravelPack`,
				};

				transporter.sendMail(mailOptions, async (err) => {
					if (!err) {
						await User.update({ isPremium: true }, { where: { id: req.user.id } });

						res.status(200).json({ message: `User status has been updated to premium` });
					}
				});
			} else {
				throw ({ name: `User status already premium` });
			}
		} catch (error) {
			next(error);
		}
	}

	static async deactivatePremiumStatus(req, res, next) {
		try {
			// const findUser = await User.findByPk(req.user.id);

			if (req.user.isPremium === true) {
				const transporter = nodemailer.createTransport({
					service: 'gmail',
					host: 'smtp.gmail.com',
					port: 486,
					auth: {
						user: 'bobby.notokoesoemo@gmail.com',
						pass: process.env.NODEMAILER_PASS,
					},
				});

				const mailOptions = {
					from: "bobby.notokoesoemo@gmail.com",
					to: req.user.email,
					// to: "bobby.notokoesoemo@gmail.com",
					subject: "Downgrade notification",
					text: `Dear ${req.user.fullName},

We are sorry to inform you that you have been downgraded from premium user!

As a standard user, you will still have access to a range of benefits and features that we provided.

We hope you will still enjoy your experience. If you have any questions or need assistance, please don't hesitate to reach out to our customer support team.

Sincerely,
TravelPack`,
				};

				transporter.sendMail(mailOptions, async (err) => {
					if (!err) {
						await User.update({ isPremium: false }, { where: { id: req.user.id } });

						res.status(200).json({ message: `User status no longer premium` });
					}
				});
			} else {
				throw ({ name: `User status already not premium` });
			}
		} catch (error) {
			next(error);
		}
	}

	static async incrimentPointUser(req, res, next) {
		try {
			// const findUser = await User.findByPk(req.user.id);

			await User.update({ point: req.user.point += 1 }, { where: { id: req.user.id } });

			res.status(200).json({ message: `User point has been incrimented by 1` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
