const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { createToken } = require("../helpers/jsonwebtoken.js");
const { User, Topic, sequelize } = require("../models");

let admin_access_token;
let customer_access_token;

beforeEach(() => {
  jest.restoreAllMocks();
});

beforeAll(async function () {
  let userAdmin = await User.create({
    fullName: "User Admin",
    phoneNumber: "000123456789",
    email: "userAdmin@gmail.com",
    password: "admin",
    isPremium: false,
    role: "Admin",
  });

  let userCustomer = await User.create({
    fullName: "User Customer",
    phoneNumber: "000123456789",
    email: "userCustomer@gmail.com",
    password: "customer",
    isPremium: false,
    role: "Customer",
  });

  admin_access_token = createToken({ id: userAdmin.id });
  customer_access_token = createToken({ id: userCustomer.id });

  await sequelize.queryInterface.bulkInsert(
    "Users",
    require("../data/users.json").map((el) => {
      el.password = hashPassword(el.password);
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    })
  );

  await sequelize.queryInterface.bulkInsert(
    "Topics",
    require("../data/topic.json").map((el) => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    })
  );
});

afterAll(async function () {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Topics", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Topics", () => {
  describe("GET /publics/topic", () => {
    test("200, success get all topic", async () => {
      const res = await request(app).get("/publics/topic");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body[0]).toHaveProperty("title", expect.any(String));
      expect(res.body[0]).toHaveProperty("UserId", expect.any(Number));
      expect(res.body[0]).toHaveProperty("createdAt", expect.any(String));
      expect(res.body[0]).toHaveProperty("updatedAt", expect.any(String));
    });
  });
  describe("GET /topic", () => {
    test("500, failed get all topic cause internal server error", async () => {
      jest.spyOn(Topic, "findAll").mockRejectedValue("Error");
      const res = await request(app).get("/publics/topic");
      expect(res.status).toBe(500);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("GET /publics/topic/:id", () => {
    test("200, success get topic", async () => {
      const res = await request(app).get("/publics/topic/1");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("title", expect.any(String));
      expect(res.body).toHaveProperty("UserId", expect.any(Number));
      expect(res.body).toHaveProperty("createdAt", expect.any(String));
      expect(res.body).toHaveProperty("updatedAt", expect.any(String));
    });
  });
  describe("GET /publics/topic/:id", () => {
    test("404, failed get topic not found", async () => {
      const res = await request(app).get("/publics/topic/99");
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("POST /publics/topic/:id", () => {
    test("201, success get topic", async () => {
      const res = await request(app)
        .post("/topic")
        .set({ access_token: customer_access_token })
        .send({ title: "Title test", type: "Type test" });
      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("title", expect.any(String));
      expect(res.body).toHaveProperty("type", expect.any(String));
      expect(res.body).toHaveProperty("UserId", expect.any(Number));
      expect(res.body).toHaveProperty("createdAt", expect.any(String));
      expect(res.body).toHaveProperty("updatedAt", expect.any(String));
    });
  });
  describe("POST /publics/topic/:id", () => {
    test("400, failed get topic", async () => {
      const res = await request(app)
        .post("/topic")
        .set({ access_token: customer_access_token });
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
});
