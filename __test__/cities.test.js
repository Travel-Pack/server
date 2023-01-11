const request = require("supertest");
const { server: app } = require("../app");
const { hashPassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jsonwebtoken");
const { User, City, sequelize } = require("../models");

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
    fullName: "yohyakarta",
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
    "Provinces",
    require("../data/provinces.json").map((el) => {
      delete el.id;
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: el.name.toLocaleLowerCase().split(" ").join("-"),
      };
    })
  );

  await sequelize.queryInterface.bulkInsert(
    "Cities",
    require("../data/cities.json").map((el) => {
      delete el.id;
      return {
        ...el,
        slug: el.name.toLocaleLowerCase().split(" ").join("-"),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    })
  );

  //   await sequelize.queryInterface.bulkInsert(
  //     "Destinations",
  //     require("../data/destination.json").map((el) => {
  //       delete el.id;
  //       return {
  //         ...el,
  //         slug: el.name.toLocaleLowerCase().split(" ").join("-"),
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       };
  //     })
  //   );

  //   await sequelize.queryInterface.bulkInsert(
  //     "Hotels",
  //     require("../data/hotel.json").map((el) => {
  //       return {
  //         ...el,
  //         slug: el.name.toLocaleLowerCase().split(" ").join("-"),
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       };
  //     })
  //   );

  //   await sequelize.queryInterface.bulkInsert(
  //     "Reviews",
  //     require("../data/review.json").map((el) => {
  //       return {
  //         ...el,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       };
  //     })
  //   );
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

  await sequelize.queryInterface.bulkDelete("Cities", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  //   await sequelize.queryInterface.bulkDelete("Destinations", null, {
  //     truncate: true,
  //     cascade: true,
  //     restartIdentity: true,
  //   });

  //   await sequelize.queryInterface.bulkDelete("Reviews", null, {
  //     truncate: true,
  //     cascade: true,
  //     restartIdentity: true,
  //   });
});

describe("Cities", () => {
  describe("GET /cities", () => {
    test("200, success get all cities", async () => {
      const res = await request(app)
        .get("/cities")
        .set({ access_token: customer_access_token });
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body[0]).toHaveProperty("name", expect.any(String));
      expect(res.body[0]).toHaveProperty("slug", expect.any(String));
      expect(res.body[0]).toHaveProperty("image", expect.any(String));
      expect(res.body[0]).toHaveProperty("geocoding", expect.any(String));
      expect(res.body[0]).toHaveProperty("ProvinceId", expect.any(Number));
    });
  });
  describe("GET /cities", () => {
    test("500, failed get all cities cause internal server error", async () => {
      jest.spyOn(City, "findAll").mockRejectedValue("Error");
      const res = await request(app)
        .get("/cities")
        .set({ access_token: customer_access_token });
      expect(res.status).toBe(500);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("GET /cities/:slug", () => {
    test("200, success get city by slug", async () => {
      const res = await request(app)
        .get("/cities/bandung")
        .set({ access_token: customer_access_token });
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("city", expect.any(Object));
      expect(res.body).toHaveProperty("destination", expect.any(Array));
      expect(res.body).toHaveProperty("hotel", expect.any(Array));
    });
  });
  describe("GET /cities", () => {
    test("404, failed get reviews by slug", async () => {
      const res = await request(app)
        .get("/cities/ja")
        .set({ access_token: customer_access_token });
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("POST /cities", () => {
    test("201, success add city", async () => {
      const res = await request(app)
        .post("/cities")
        .set({ access_token: customer_access_token })
        .send({
          id: 1,
          name: "DKI Jakarta",
          image:
            "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
          geocoding: "5083867975799",
          ProvinceId: 11,
        });
      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("POST /cities", () => {
    test("400, failed add city", async () => {
      const res = await request(app)
        .post("/cities")
        .set({ access_token: customer_access_token })
        .send({
          id: 1,
          name: "DKI Jakarta",
          //   image:
          //     "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
          geocoding: "5083867975799",
          ProvinceId: 11,
        });
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("POST /cities", () => {
    test("400, failed add city", async () => {
      const res = await request(app)
        .post("/cities")
        .set({ access_token: customer_access_token })
        .send({
          id: 1,
          name: "DKI Jakarta",
          image:
            "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
          //   geocoding: "5083867975799",
          ProvinceId: 11,
        });
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("POST /cities", () => {
    test("404, failed add city", async () => {
      const res = await request(app)
        .post("/cities")
        .set({ access_token: customer_access_token })
        .send({
          id: 1,
          name: "DKI Jakarta",
          image:
            "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
          geocoding: "5083867975799",
          //   ProvinceId: 11,
        });
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("PUT /cities/:slug", () => {
    test("200, success edit city", async () => {
      const res = await request(app)
        .put("/cities/dki-jakarta")
        .set({ access_token: customer_access_token })
        .send({
          id: 1,
          name: "DKI Jakarta",
          image:
            "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
          geocoding: "5083867975799",
          ProvinceId: 11,
        });
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("PUT /cities/:slug", () => {
    test("404, failed edit city not found", async () => {
      const res = await request(app)
        .put("/cities/dki-jakart")
        .set({ access_token: customer_access_token })
        .send({
          id: 1,
          name: "DKI Jakarta",
          image:
            "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
          geocoding: "5083867975799",
          ProvinceId: 11,
        });
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("PUT /cities/:slug", () => {
    test("404, failed edit city province not found", async () => {
      const res = await request(app)
        .put("/cities/dki-jakarta")
        .set({ access_token: customer_access_token })
        .send({
          id: 1,
          name: "DKI Jakarta",
          image:
            "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
          geocoding: "5083867975799",
          ProvinceId: 99,
        });
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg", expect.any(String));
    });
  });
});
