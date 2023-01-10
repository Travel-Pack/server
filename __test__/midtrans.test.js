const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
let access_token

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", [
        {
          fullName: "bobby",
          phoneNumber: "08111",
          email: "bobby@gmail.com",
          password: hashPassword("12345"),
          isPremium: false,
          role: "Customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
    ]);
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
});

describe('POST Snap Token Midtrans', () => {
    describe('Success POST Snap Token Midtrans - token customer', () => {
        it('should return object with its token', async () => {
            const body = { email: "bobby@gmail.com", password: "12345" };
            let res = await request(app).post("/login").send(body);
            access_token = res.body.access_token;

            const response = await request(app)
            .post('/midtrans')
            .set('access_token', access_token)

            expect(response.status).toBe(201);
        });
    });

    // describe('Fail POST Snap Token Midtrans - no token', () => {
    //     it('should return object', async () => {
    //         const response = await request(app)
    //             .post('/midtrans')

    //         expect(response.status).toBe(400);
    //         expect(response.body).toBeInstanceOf(Object);
    //         expect(response.body).toHaveProperty('message', expect.any(String));
    //     });
    // });
});
