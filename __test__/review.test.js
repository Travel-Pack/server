const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { createToken } = require("../helpers/jsonwebtoken.js");
const { User, Review, sequelize } = require("../models");

let admin_access_token;
let customer_access_token;

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

  await sequelize.queryInterface.bulkInsert(
    "Destinations",
    require("../data/destination.json").map((el) => {
      delete el.id;
      return {
        ...el,
        slug: el.name.toLocaleLowerCase().split(" ").join("-"),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    })
  );

  await sequelize.queryInterface.bulkInsert(
    "Reviews",
    require("../data/review.json").map((el) => {
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

  await sequelize.queryInterface.bulkDelete("Destinations", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Reviews", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Reviews", () => {
  describe("GET /reviews", () => {
    test("200, success get reviews", async () => {
      const res = await request(app)
        .get("/reviews/1")
        .set({ access_token: customer_access_token })
        .send({ name: "Get Reviews Id" });
      console.log(res.status);
      expect(res.status).toBe(200);
      //   expect(res.body).toBeInstanceOf(Array);
      //   expect(res.body[0]).toHaveProperty("id", expect.any(Number));
      // expect(res.body[0]).toHaveProperty("cost", expect.any(Number));
      console.log(res.body);
    });
  });
});

// describe("Provinces Public", () => {
//   describe("DEL /reviews", () => {
//     test("200, success get provinces", async () => {
//       const res = await request(app).del("/reviews/1").send({});
//       console.log(res.status);
//       expect(res.status).toBe(200);
//   expect(res.body).toBeInstanceOf(Array);
//   expect(res.body[0]).toHaveProperty("id", expect.any(Number));
//   expect(res.body[0]).toHaveProperty("DestinationId", expect.any(String));
//     });
//   });
// });

// describe("Provinces Public", () => {
//   describe("GET /reviews", () => {
//     test("200, success get provinces", async () => {
//       const res = await request(app).get("/reviews/1").send({});
//       console.log(res.status);
//       expect(res.status).toBe(200);
//   expect(res.body).toBeInstanceOf(Array);
//   expect(res.body[0]).toHaveProperty("id", expect.any(Number));
//   expect(res.body[0]).toHaveProperty("DestinationId", expect.any(String));
//     });
//   });
// });

// describe("POST /provinces", () => {
//   test("403, FAILED create provinces caused authorization", async () => {
//     const res = await request(app)
//       .post("/provinces")
//       .set({ access_token: customer_access_token })
//       .send({ name: "Customer Test Province" });

//     expect(res.status).toBe(403);
//     expect(res.body).toBeInstanceOf(Object);
//     expect(res.body).toHaveProperty("msg", expect.any(String));
//   });
// });
