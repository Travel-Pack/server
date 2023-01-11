const request = require("supertest");
const { server: app } = require("../app");
const { createToken } = require("../helpers/jsonwebtoken");
const { User, Province, sequelize } = require("../models");

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
    "Provinces",
    [
      { name: "Aceh", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sumatera Utara", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sumatera Barat", createdAt: new Date(), updatedAt: new Date() },
    ],
    {}
  );
});

afterAll(async function () {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Provinces", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Provinces Public", () => {
  describe("GET /publics/provinces", () => {
    test("200, success get provinces", async () => {
      const res = await request(app).get("/publics/provinces").send({});
      console.log(res.status);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body[0]).toHaveProperty("name", expect.any(String));
      expect(res.body[0]).toHaveProperty("createdAt", expect.any(String));
      expect(res.body[0]).toHaveProperty("updatedAt", expect.any(String));
    });
  });
  describe("GET /publics/provinces", () => {
    test("500, failed get provinces cause internal server error", async () => {
      jest.spyOn(Province, "findAll").mockRejectedValue("Error");
      const res = await request(app).get("/publics/provinces").send({});
      console.log(res.status);
      expect(res.status).toBe(500);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
});

describe("Provinces for Admin", () => {
  describe("POST /provinces", () => {
    test("403, FAILED create provinces caused authorization", async () => {
      const res = await request(app)
        .post("/provinces")
        .set({ access_token: customer_access_token })
        .send({ name: "Customer Test Province" });

      expect(res.status).toBe(403);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("POST /provinces", () => {
    test("201, SUCCESS create provinces", async () => {
      const res = await request(app)
        .post("/provinces")
        .set({ access_token: admin_access_token })
        .send({ name: "Admin Test Province" });

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("POST /provinces", () => {
    test("500, FAILED create provinces cause validation failed", async () => {
      const res = await request(app)
        .post("/provinces")
        .set({ access_token: admin_access_token });
      // .send({ name: "Admin Test Province" });

      expect(res.status).toBe(500);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("PUT /provinces", () => {
    test("403, FAILED update provinces caused authorization", async () => {
      const res = await request(app)
        .put("/provinces/1")
        .set({ access_token: customer_access_token })
        .send({ name: "Update Customer Test Province" });

      expect(res.status).toBe(403);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("PUT /provinces", () => {
    test("200, SUCCESS update provinces", async () => {
      const res = await request(app)
        .put("/provinces/1")
        .set({ access_token: admin_access_token })
        .send({ name: "Update Admin Test Province" });

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("PUT /provinces", () => {
    test("404, FAILED update provinces cause not found", async () => {
      const res = await request(app)
        .put("/provinces/99")
        .set({ access_token: admin_access_token })
        .send({ name: "Update Admin Test Province" });

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("DELETE /provinces", () => {
    test("403, FAILED delete provinces caused authorization", async () => {
      const res = await request(app)
        .delete("/provinces/1")
        .set({ access_token: customer_access_token });

      expect(res.status).toBe(403);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("DELETE /provinces", () => {
    test("200, SUCCESS delete provinces", async () => {
      const res = await request(app)
        .delete("/provinces/1")
        .set({ access_token: admin_access_token });

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("DELETE /provinces", () => {
    test("404, FAILED delete provinces cause not found", async () => {
      const res = await request(app)
        .delete("/provinces/99")
        .set({ access_token: admin_access_token });

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
});
