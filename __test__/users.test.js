const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

beforeAll(async () => {
	await queryInterface.bulkInsert("Users", [
		{
			username: "customer01",
			email: "customer01@gmail.com",
			password: hashPassword("12345"),
			role: "Customer",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			username: "customer02",
			email: "customer02@gmail.com",
			password: hashPassword("12345"),
			role: "Customer",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			username: "administrator",
			email: "administrator@gmail.com",
			password: hashPassword("12345"),
			role: "Admin",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
})
