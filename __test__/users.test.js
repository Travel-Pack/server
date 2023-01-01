const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
let access_token;

beforeAll(async () => {
	await queryInterface.bulkInsert("Users", [
		{
			fullName: "bobby2",
			phoneNumber: '08111',
			email: "bobby2@gmail.com",
			password: hashPassword("12345"),
			isPremium: false,
			role: "Customer",
			createdAt: new Date(),
			updatedAt: new Date(),
		}
	]);
	const res = await request(app)
    .post('/pub/login')
    .send(
      {
        email: 'bobby2@gmail.com',
        password: '12345'
      }
    )

    access_token = res.body.access_token;

	await sequelize.queryInterface.bulkInsert('Users', require('../data/users.json').map((ele) => {
		ele.createdAt = ele.updatedAt = new Date();
		return ele;
	  }));
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
})

describe('Register customer account in /register', () => {
    test('Success to register customer account', async () => {
      const res = await request(app)
        .post('/register')
        .send({
			fullName: "bobby3",
			phoneNumber: '08111',
			email: "bobby3@gmail.com",
			password: hashPassword("12345"),
			isPremium: false,
			role: "Customer"
        })

      expect(res.status).toBe(201);
	  expect(res.body).toHaveProperty('message', expect.any(String));
    })
    test('Email is undefined', async () => {
      const res = await request(app)
        .post('/register')
        .send({
			fullName: "bobby3",
			phoneNumber: '08111',
			password: hashPassword("12345"),
			isPremium: false,
			role: "Customer"
        })
      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('Email is required');
    })
    test('Password is undefined', async () => {
      const res = await request(app)
        .post('/register')
        .send({
			fullName: "bobby3",
			phoneNumber: '08111',
			email: "bobby3@gmail.com",
			isPremium: false,
			role: "Customer"
        })
      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('Password is required');
    })
    test('Email is empty', async () => {
      const res = await request(app)
        .post('/register')
        .send({
			fullName: "bobby3",
			phoneNumber: '08111',
			email: "",
			password: hashPassword("12345"),
			isPremium: false,
			role: "Customer"
        })
      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('Email format is not valid');
    })
    test('Password is empty', async () => {
      const res = await request(app)
        .post('/register')
        .send({
			fullName: "bobby3",
			phoneNumber: '08111',
			email: "bobby5@gmail.com",
			password: "",
			isPremium: false,
			role: "Customer"
        })
      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('Minimum password length must be 5 letter');
    })
    test('Register duplicate email address', async () => {
        await request(app)
        .post('/register')
        .send({
			fullName: "bobby4",
			phoneNumber: '08111',
			email: "bobby4@gmail.com",
			password: hashPassword("12345"),
			isPremium: false,
			role: "Customer"
        })
        const res = await request(app)
        .post('/register')
        .send({
			fullName: "bobby4",
			phoneNumber: '08111',
			email: "bobby4@gmail.com",
			password: hashPassword("12345"),
			isPremium: false,
			role: "Customer"
        })
      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('This Email Already Registered');
    })
    test('Email format not valid', async () => {
      const res = await request(app)
        .post('/register')
        .send({
			fullName: "bobby3",
			phoneNumber: '08111',
			email: "bobby3",
			password: hashPassword("12345"),
			isPremium: false,
			role: "Customer"
        })
      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('Email format is not valid');
    })
})

describe('Login customer /login', () => {
    test('Success login as customer', async () => {
        await request(app)
        .post('/register')
        .send({
          fullName: "bobby10",
          phoneNumber: '08111',
          email: "bobby10@gmail.com",
          password: "12345",
          isPremium: false,
          role: "Customer",
        })
        const res = await request(app)
        .post('/login')
        .send({
          email: 'bobby10@gmail.com',
          password: "12345",
        })

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('access_token', expect.any(String));
    })
    test('Password is false', async () => {
      await request(app)
        .post('/register')
        .send({
          fullName: "bobby11",
          phoneNumber: '08111',
          email: "bobby11@gmail.com",
          password: "12345",
          isPremium: false,
          role: "Customer",
        })
      const res = await request(app)
        .post('/login')
        .send({
          email: 'bobby11@gmail.com',
          password: "1234"
        })

      expect(res.status).toBe(401);
      expect(res.body.msg).toBe('Invalid Email/Password');
    })
    test('Email is false', async () => {
        await request(app)
          .post('/register')
          .send({
            fullName: "bobby12",
            phoneNumber: '08111',
            email: "bobby12@gmail.com",
            password: "12345",
            isPremium: false,
            role: "Customer",
          })
        const res = await request(app)
          .post('/login')
          .send({
            email: 'bobby123@gmail.com',
            password: "12345"
          })

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe('Invalid Email/Password');
      })
})
