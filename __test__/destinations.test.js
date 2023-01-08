const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jsonwebtoken");
const { User, Province, City, Destination, sequelize } = require("../models");

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
    fullName: "yohyakarta",
    phoneNumber: "000123456789",
    email: "userCustomer@gmail.com",
    password: "customer",
    isPremium: false,
    role: "Customer",
  });

  let Provinces = await Province.create({
    name: "Jawa Tengah",
    slug: "jawa-tengah"
  });
  let Cities = await City.create({
    name: "Yogyakarta",
    slug: "yogyakarta",
    image: "https://asset.kompas.com/crops/8GX0CBJ2-tDsMtpgq6TCN0WWPtI=/0x0:0x0/750x500/data/photo/2020/06/11/5ee208425be9b.jpg",
    geocoding: "5087379786581",
    ProvinceId: 1
  });

  admin_access_token = createToken({ id: userAdmin.id });
  customer_access_token = createToken({ id: userCustomer.id });

  await sequelize.queryInterface.bulkInsert(
    "Destinations",
    [
      {
        name: "Ancol",
        slug: "ancol",
        address: "Jl. Lodan Timur no. 7 North Jakarta, Jakarta 14430 Indonesia",
        mainImg: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/58/44/fd/ancol-dreamland.jpg?w=1200&h=-1&s=1",
        cost: 250000,
        geocoding: "123213123",
        description: "this is destination DESCRIPTIONS SECTION!",
        CityId: 1,
        UserId: 1,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: "Waterbom PIK",
        slug: "waterboom-pik",
        address: "Jl. Pantai Indah Kapuk Jl. Pantai Indah Barat No.1, RW.2, Kamal Muara, Kec. Penjaringan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14470",
        mainImg: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/5d/70/b0/waterbom-jakarta.jpg?w=1200&h=1200&s=1",
        cost: 300000,
        geocoding: "123433123",
        description: "this is destination DESCRIPTIONS SECTION!",
        CityId: 1,
        UserId: 1,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: "National Monument",
        slug: "nasional-monument",
        address: "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
        mainImg: "https://d2ile4x3f22snf.cloudfront.net/wp-content/uploads/sites/329/2018/10/29141024/monas8.jpg",
        cost: 15000,
        geocoding: "-6.175316204693681, 106.82716704183527",
        description: "this is destination DESCRIPTIONS SECTION!",
        CityId: 1,
        UserId: 1,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: "Candi Borobudur",
        slug: "candi-borobudur",
        address: "Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah",
        mainImg: "https://asset.kompas.com/crops/PREP49IjcIsLm5BEFNlETeDO8PE=/0x118:1430x1071/750x500/data/photo/2022/03/07/6225c0669e6d2.jpg",
        cost: 50000,
        geocoding: "-7.607703644149317, 110.20385858644774",
        description: "this is destination DESCRIPTIONS SECTION!",
        CityId: 1,
        UserId: 1,
        createdAt: new Date(), updatedAt: new Date()
      }
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

  await sequelize.queryInterface.bulkDelete("Destinations", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Destinations Public", () => {
  describe("GET /publics/destinations", () => {
    test("200, success get destinations", async () => {
      const res = await request(app).get("/publics/destinations").send({});
      console.log(res.body, "<<<<<-- res.body");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body[0]).toHaveProperty("name", expect.any(String));
      expect(res.body[0]).toHaveProperty("slug", expect.any(String));
      expect(res.body[0]).toHaveProperty("address", expect.any(String));
      expect(res.body[0]).toHaveProperty("mainImg", expect.any(String));
      expect(res.body[0]).toHaveProperty("cost", expect.any(Number));
      expect(res.body[0]).toHaveProperty("geocoding", expect.any(String));
      expect(res.body[0]).toHaveProperty("description", expect.any(String));
      expect(res.body[0]).toHaveProperty("CityId", expect.any(Number));
      expect(res.body[0]).toHaveProperty("UserId", expect.any(Number));
      expect(res.body[0]).toHaveProperty("Reviews", expect.any(Array));
      expect(res.body[0]).toHaveProperty("Images", expect.any(Array));
    });
  });
  describe("GET /publics/destinations/:slug", () => {
    test("200, success get a destinations", async () => {
      const res = await request(app).get("/publics/destinations/ancol").send({});
      // console.log(res.status);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("name", expect.any(String));
      expect(res.body).toHaveProperty("slug", expect.any(String));
      expect(res.body).toHaveProperty("address", expect.any(String));
      expect(res.body).toHaveProperty("mainImg", expect.any(String));
      expect(res.body).toHaveProperty("cost", expect.any(Number));
      expect(res.body).toHaveProperty("geocoding", expect.any(String));
      expect(res.body).toHaveProperty("description", expect.any(String));
      expect(res.body).toHaveProperty("CityId", expect.any(Number));
      expect(res.body).toHaveProperty("UserId", expect.any(Number));
      expect(res.body).toHaveProperty("Reviews", expect.any(Array));
      expect(res.body).toHaveProperty("Images", expect.any(Array));
    });
  });
});

// describe("Provinces for Admin", () => {
//   describe("POST /provinces", () => {
//     test("403, FAILED create provinces caused authorization", async () => {
//       const res = await request(app)
//         .post("/provinces")
//         .set({ access_token: customer_access_token })
//         .send({ name: "Customer Test Province" });

//       expect(res.status).toBe(403);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("msg", expect.any(String));
//     });
//   });
//   describe("POST /provinces", () => {
//     test("201, SUCCESS create provinces", async () => {
//       const res = await request(app)
//         .post("/provinces")
//         .set({ access_token: admin_access_token })
//         .send({ name: "Admin Test Province" });

//       expect(res.status).toBe(201);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("msg", expect.any(String));
//     });
//   });

//   describe("PUT /provinces", () => {
//     test("403, FAILED update provinces caused authorization", async () => {
//       const res = await request(app)
//         .put("/provinces/1")
//         .set({ access_token: customer_access_token })
//         .send({ name: "Update Customer Test Province" });

//       expect(res.status).toBe(403);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("msg", expect.any(String));
//     });
//   });
//   describe("PUT /provinces", () => {
//     test("200, SUCCESS update provinces", async () => {
//       const res = await request(app)
//         .put("/provinces/1")
//         .set({ access_token: admin_access_token })
//         .send({ name: "Update Admin Test Province" });

//       expect(res.status).toBe(200);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("msg", expect.any(String));
//     });
//   });

//   describe("DELETE /provinces", () => {
//     test("403, FAILED delete provinces caused authorization", async () => {
//       const res = await request(app)
//         .delete("/provinces/1")
//         .set({ access_token: customer_access_token });

//       expect(res.status).toBe(403);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("msg", expect.any(String));
//     });
//   });
//   describe("DELETE /provinces", () => {
//     test("200, SUCCESS delete provinces", async () => {
//       const res = await request(app)
//         .delete("/provinces/1")
//         .set({ access_token: admin_access_token });

//       expect(res.status).toBe(200);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("msg", expect.any(String));
//     });
//   });
// });
