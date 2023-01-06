const request = require("supertest");
const app = require("../app.js");
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

  await sequelize.queryInterface.bulkInsert("Provinces", [
    { name: "Aceh", createdAt: new Date(), updatedAt: new Date() },
    { name: "Sumatera Utara", createdAt: new Date(), updatedAt: new Date() },
    { name: "Sumatera Barat", createdAt: new Date(), updatedAt: new Date() },
  ]);

  await sequelize.queryInterface.bulkInsert("Cities", [
    {
      id: 1,
      name: "DKI Jakarta",
      image:
        "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
      geocoding: "5083867975799",
      ProvinceId: 11,
    },
    {
      id: 2,
      name: "Yogyakarta",
      image:
        "https://asset.kompas.com/crops/8GX0CBJ2-tDsMtpgq6TCN0WWPtI=/0x0:0x0/750x500/data/photo/2020/06/11/5ee208425be9b.jpg",
      geocoding: "5087379786581",
      ProvinceId: 14,
    },
    {
      id: 3,
      name: "Surabaya",
      image:
        "https://asset.kompas.com/crops/GAuUyrwhmqnVAt7HRQnTw1s7K6g=/0x7:740x500/750x500/data/photo/2022/01/21/61ea96a857637.jpg",
      geocoding: "5088312432845",
      ProvinceId: 15,
    },
  ]);

  await sequelize.queryInterface.bulkInsert("Destinations", [
    {
      id: 1,
      name: "Ancol",
      address: "Jl. Lodan Timur no. 7 North Jakarta, Jakarta 14430 Indonesia",
      mainImg:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/58/44/fd/ancol-dreamland.jpg?w=1200&h=-1&s=1",
      cost: "250000",
      geocoding: "-6.128028, 106.845054",
      CityId: 1,
      UserId: 5,
    },
    {
      id: "2",
      name: "Taman Mini Indonesia Indah",
      address: "East Jakarta City, Jakarta",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipNAYN17x5UF5tbZFn76TJR04JSfWfwrml9S1r_H=s680-w680-h510",
      cost: 15000,
      geocoding: "-6.302440568003487, 106.89515657055256",
      CityId: 1,
    },
    {
      id: "3",
      name: "Taman Impian Jaya Ancol",
      address:
        "Jl. Lodan Timur No.7, RW.10, Ancol, Kec. Pademangan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14430",
      image:
        "https://asset.kompas.com/crops/ClxctWi5u6XYEMHtJ13wfRPX5UQ=/69x0:1149x720/750x500/data/photo/2019/04/17/2507969107.jpeg",
      cost: 25000,
      geocoding: "-6.128732296182336, 106.83329569140305",
      CityId: 1,
    },
  ]);

  await sequelize.queryInterface.bulkInsert(
    "Reviews",
    [
      {
        DestinationId: 1,
        cost: 3,
        fun: 4,
        internet: 3,
        safety: 3,
        comment:
          "The place is extraordinary, the hotels and villas are not expensive, recommended for holidays",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DestinationId: 2,
        cost: 5,
        fun: 5,
        internet: 3,
        safety: 3,
        comment:
          "This place is very pleasant, but because lodging here is too expensive so it is not recommended for cheap travel places",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DestinationId: 2,
        cost: 5,
        fun: 3,
        internet: 3,
        safety: 3,
        comment: "This place too expensive, but so funny",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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

  await sequelize.queryInterface.bulkDelete("Reviews", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Reviews", () => {
  describe("GET /reviews", () => {
    test("200, success get reviews", async () => {
      const res = await request(app).get("/reviews/1").send({});
      console.log(res.status);
      expect(res.status).toBe(200);
      //   expect(res.body).toBeInstanceOf(Array);
      //   expect(res.body[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body[0]).toHaveProperty("cost", expect.any(Number));
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
