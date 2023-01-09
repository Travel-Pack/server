const midtransClient = require("midtrans-client");
const { User } = require("../models");

class midtransController {
    static async generateSnapToken(req, res, next) {
		try {
            const snap = new midtransClient.Snap({
              // Set to true if you want Production Environment (accept real transaction).
              isProduction: false,
              serverKey: "SB-Mid-server-n3hd9vhiqeeev3J7FAyRIdf1",
              clientKey: "SB-Mid-client-T5eH1T_FUBGIvyNT",
            });

            const parameter = {
              transaction_details: {
                order_id:
                  "order-id-" +
                  Math.round(new Date().getTime() / 1000) +
                  "-" +
                  Math.round(Math.random() * 100),
                gross_amount: 25000,
              },
              credit_card: {
                secure: true,
              },
              customer_details: {
                first_name: req.user.fullName,
                last_name: "",
                email: req.user.email,
              },
            };

            const transaction = await snap.createTransaction(parameter);
            const transactionToken = transaction.token;

            res.status(200).json({ transactionToken });
		} catch (error) {
			next(error);
		}
    }
}

module.exports = midtransController;
