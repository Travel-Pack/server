const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize, TravelStep } = require("../models");
const { queryInterface } = sequelize;
let access_token;

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", [
    {
      fullName: "bobby2",
      phoneNumber: "08111",
      email: "bobby2@gmail.com",
      password: hashPassword("12345"),
      isPremium: false,
      role: "Customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "bobby22",
      phoneNumber: "08111",
      email: "bobby22@gmail.com",
      password: hashPassword("12345"),
      isPremium: false,
      role: "Customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "bobby222",
      phoneNumber: "08111",
      email: "bobby222@gmail.com",
      password: hashPassword("12345"),
      isPremium: false,
      role: "Customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "bobby2222",
      phoneNumber: "08111",
      email: "bobby2222@gmail.com",
      password: hashPassword("12345"),
      isPremium: false,
      role: "Customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "bobby25",
      phoneNumber: "08111",
      email: "bobby25@gmail.com",
      password: hashPassword("12345"),
      isPremium: false,
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await queryInterface.bulkInsert("Provinces", [
    {
      name: "Aceh",
      slug: "Aceh",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Sumatera Utara",
      slug: "Sumatera Utara",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Sumatera Barat",
      slug: "Sumatera Barat",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Riau",
      slug: "Riau",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Jambi",
      slug: "Jambi",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Sumatera Selatan",
      slug: "Sumatera Selatan",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Bengkulu",
      slug: "Bengkulu",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Lampung",
      slug: "Lampung",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Kepulauan Bangka Belitung",
      slug: "Kepulauan Bangka Belitung",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Kepulauan Riau",
      slug: "Kepulauan Riau",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "DKI Jakarta",
      slug: "DKI Jakarta",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Jawa Barat",
      slug: "Jawa Barat",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Jawa Tengah",
      slug: "Jawa Tengah",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "DI Yogyakarta",
      slug: "DI Yogyakarta",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Jawa Timur",
      slug: "Jawa Timur",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Banten",
      slug: "Banten",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  await queryInterface.bulkInsert("Cities", [
    {
      name: "DKI Jakarta",
      slug: "DKI Jakarta",
      image: "https://img.okezone.com/content/2022/10/17/1/2688935/pemprov-dki-apresiasi-sumbangsih-kolaborator-untuk-kemajuan-kota-jakarta-sZAYqfuogX.jpg",
      geocoding: "5083867975799",
      ProvinceId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Yogyakarta",
      slug: "Yogyakarta",
      image: "https://asset.kompas.com/crops/8GX0CBJ2-tDsMtpgq6TCN0WWPtI=/0x0:0x0/750x500/data/photo/2020/06/11/5ee208425be9b.jpg",
      geocoding: "5087379786581",
      ProvinceId: 14,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Surabaya",
      slug: "Surabaya",
      image: "https://asset.kompas.com/crops/GAuUyrwhmqnVAt7HRQnTw1s7K6g=/0x7:740x500/750x500/data/photo/2022/01/21/61ea96a857637.jpg",
      geocoding: "5088312432845",
      ProvinceId: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  await sequelize.queryInterface.bulkInsert(
    "Destinations",
    [
      {
        name: "Wisata Air Taman Prestasi",
        slug: "Wisata Air Taman Prestasi",
        address: "Jl. Ketabang Kali No.2-B, Ketabang, Kec. Genteng, Kota Surabaya, Jawa Timur 60272",
        mainImg: "https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2022/02/25/1658474457.jpg",
        cost: 15000,
        geocoding: "-7.261706410257518, 112.74315998274346",
        description: "Wisata Air Taman Prestasi",
        CityId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hutan Bambu",
        slug: "Hutan Bambu",
        address: "Jl. Raya Marina Asri, Keputih, Kec. Sukolilo, Kota Surabaya, Jawa Timur 60111",
        mainImg: "https://www.pegipegi.com/travel/wp-content/uploads/2017/10/alamat-taman-sakura-keputih-surabaya.jpg",
        cost: 13000,
        geocoding: "-7.29398869645369, 112.8016808827438",
        description: "Hutan Bambu",
        CityId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sanggar Agung Temple",
        slug: "Sanggar Agung Temple",
        address: "Jl. Sukolilo No.100, Sukolilo Baru, Kec. Bulak, Kota Surabaya, Jawa Timur 60122",
        mainImg: "https://www.surabayarollcake.com/wp-content/uploads/2019/01/Klenteng-Sanggar-Agung-Surabaya.jpg",
        cost: 10000,
        geocoding: "-7.247488948002271, 112.80180008459418",
        description: "Sanggar Agung Temple",
        CityId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Food Junction Grand Pakuwon",
        slug: "Food Junction Grand Pakuwon",
        address: "Jalan Grand Banjar Mutiara Asri No.1, Banjar Sugihan, Kec. Tandes, Kota Surabaya, Jawa Timur 60184",
        mainImg: "https://www.pakuwonjati.com/upload/2020/05/5eb035d16732c-pkw-mall-com-08fj-gallery0.jpg",
        cost: 1000,
        geocoding: "-7.250777204884361, 112.66208039993745",
        description: "Food Junction Grand Pakuwon",
        CityId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Surabaya Submarine Monument",
        slug: "Surabaya Submarine Monument",
        address: "Jl. Pemuda No.39, Embong Kaliasin, Kec. Genteng, Kota Surabaya, Jawa Timur 60271",
        mainImg: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/9f/62/87/most-visit-in-town.jpg?w=1200&h=-1&s=1",
        cost: 15000,
        geocoding: "-7.26550489357184, 112.75026228274366",
        description: "Surabaya Submarine Monument",
        CityId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  );

  await sequelize.queryInterface.bulkInsert(
    "Hotels",
    [
      {
        name: "Swiss-Belinn Tunjungan, Surabaya",
        slug: "Swiss-Belinn Tunjungan, Surabaya",
        address: "Swiss-Belinn Tunjungan, Surabaya",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0c/98/b0/be/swiss-belinn-tunjungan.jpg",
        geocoding: "-7.262066,112.740918 (type: ROOFTOP)",
        isRecommended: false,
        price: 450000,
        CityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Livinn Hostel Surabaya",
        slug: "Livinn Hostel Surabaya",
        address: "Livinn Hostel Surabaya",
        image: "https://jenishotel.info/wp-content/uploads/2019/09/livinn-hostel.jpg",
        geocoding: " -7.263283,112.751178 (type: ROOFTOP)",
        isRecommended: true,
        price: 88000,
        CityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  );
  const response = await request(app)
    .post('/login')
    .send(
      {
        email: "bobby2@gmail.com",
        password: "12345"
      }
    )
  access_token = response.body.access_token;
});

afterAll(async () => {
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

  await sequelize.queryInterface.bulkDelete("Favourites", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Generate Travel Steps", () => {
  describe("POST /travel-steps/generates", () => {
    test("200, success generate Travel Steps", async () => {
      const res = await request(app).post("/travel-steps/generates").set({
        access_token
      })
        .send({
          "budgetDestination": 2000000,
          "budgetHotel": 100000,
          "CityId": 3,
          "DestinationIds": [1],
          "numberOfDestination": 2
        });
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("travelStep");
      expect(res.body.travelStep).toBeInstanceOf(Array);
      let totalPriceDestination = 0;
      let totalPriceTravelSteps = 0;
      for (let i = 0; i < res.body.travelStep.length; i++) {
        expect(res.body.travelStep[i]).toHaveProperty("hotel");
        expect(res.body.travelStep[i].hotel).toBeInstanceOf(Object);
        expect(res.body.travelStep[i].hotel).toHaveProperty("id", expect.any(Number));
        expect(res.body.travelStep[i].hotel).toHaveProperty("name", expect.any(String));
        expect(res.body.travelStep[i].hotel).toHaveProperty("image", expect.any(String));
        expect(res.body.travelStep[i].hotel).toHaveProperty("geocoding", expect.any(String));
        expect(res.body.travelStep[i].hotel).toHaveProperty("price", expect.any(Number));
        expect(res.body.travelStep[i].hotel).toHaveProperty("CityId", expect.any(Number));
        expect(res.body.travelStep[i].hotel.CityId).toBe(3);
        expect(res.body.travelStep[i].hotel).toHaveProperty("price", expect.any(Number));
        expect(res.body.travelStep[i].hotel.price).toBeLessThan(100000);
        expect(res.body.travelStep[i]).toHaveProperty("destination");
        for (let j = 0; j < res.body.travelStep[i].destination.length; j++) {
          expect(res.body.travelStep[i].destination[j]).toBeInstanceOf(Object);
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("id", expect.any(Number));
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("name", expect.any(String));
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("slug", expect.any(String));
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("address", expect.any(String));
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("mainImg", expect.any(String));
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("cost", expect.any(Number));
          totalPriceDestination += res.body.travelStep[i].destination[j].cost;
          expect(res.body.travelStep[i].destination[j].cost).toBeLessThan(2000000 / 2);
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("geocoding", expect.any(String));
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("CityId", expect.any(Number));
          expect(res.body.travelStep[i].destination[j].CityId).toBe(3);
          expect(res.body.travelStep[i].destination[j]).toHaveProperty("UserId", expect.any(Number));
        }
        totalPriceTravelSteps = res.body.travelStep[i].hotel.price + totalPriceDestination;
        expect(totalPriceTravelSteps).toBeLessThan(100000 + 2000000);
        expect(totalPriceDestination).toBeLessThan(2000000 / 2);
      }
    });
    test("404, No matched hotel", async () => {
      const res = await request(app).post("/travel-steps/generates").set({
        access_token
      })
        .send({
          "budgetDestination": 2000000,
          "budgetHotel": 0,
          "CityId": 3,
          "DestinationIds": [1],
          "numberOfDestination": 2
        });
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("Sorry, you don't get any matched hotel. Maybe try to increase your hotel budget?");
    });
    test("404, No matched destination (due to number of destination)", async () => {
      const res = await request(app).post("/travel-steps/generates").set({
        access_token
      })
        .send({
          "budgetDestination": 200000,
          "budgetHotel": 100000,
          "CityId": 3,
          "DestinationIds": [1],
          "numberOfDestination": 10
        });
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("Sorry, you don't get any matched destination. Maybe try to increase your destination budget or lower your number of destination?");
    });
    test("404, No matched destination (due to lack of budget)", async () => {
      const res = await request(app).post("/travel-steps/generates").set({
        access_token
      })
        .send({
          "budgetDestination": 0,
          "budgetHotel": 100000,
          "CityId": 3,
          "DestinationIds": [1],
          "numberOfDestination": 1
        });
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("Sorry, you don't get any matched destination. Maybe try to increase your destination budget or lower your number of destination?");
    });
    test("400, Selected destination quantity higher than number of destination", async () => {
      const res = await request(app).post("/travel-steps/generates").set({
        access_token
      })
        .send({
          "budgetDestination": 2000000,
          "budgetHotel": 100000,
          "CityId": 3,
          "DestinationIds": [1, 3, 5],
          "numberOfDestination": 1
        });
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("Number of destination must be equal or higher than selected destinations");
    });
    test("404, No combination have selected destination", async () => {
      const res = await request(app).post("/travel-steps/generates").set({
        access_token
      })
        .send({
          "budgetDestination": 2000000,
          "budgetHotel": 100000,
          "CityId": 3,
          "DestinationIds": [10],
          "numberOfDestination": 1
        });
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("Sorry, you don't get any matched destination. Maybe try to increase your destination budget or lower your number of destination?");
    });
  });
});

describe("Save Travel Steps", () => {
  describe("POST /travel-steps", () => {
    test("201, success save Travel Steps", async () => {
      const res = await request(app).post("/travel-steps").set({
        access_token
      })
        .send({
          HotelId: 2,
          name: "example",
          DestinationIds: [
            {
              id: 3
            },
            {
              id: 4
            }
          ]
        });
      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("Successfully add travel step");
    });
    test("400, Travel step data empty", async () => {
      const res = await request(app).post("/travel-steps").set({
        access_token
      })
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("Travel step data cannot be empty");
    });
    test("401, User not login", async () => {
      const res = await request(app).post("/travel-steps").send({
        HotelId: 2,
        name: "example",
        DestinationIds: [
          {
            id: 3
          },
          {
            id: 4
          }
        ]
      });
      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("Invalid Token/Authentication Failed");
    });
  });
});

describe("Get Travel Steps by user", () => {
  describe("GET /travel-steps", () => {
    test("200, success save Travel Steps", async () => {
      await request(app).post("/travel-steps").set({
        access_token
      })
        .send({
          HotelId: 4,
          name: "test",
          DestinationIds: [
            {
              id: 2
            },
            {
              id: 4
            }
          ]
        });
      const res = await request(app).get("/travel-steps").set({
        access_token
      })
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty("UserId", expect.any(Number));
      expect(res.body[0]).toHaveProperty("HotelId", expect.any(Number));
      expect(res.body[0]).toHaveProperty("name", expect.any(String));
      expect(res.body[0]).toHaveProperty("Hotel");
      expect(res.body[0].Hotel).toBeInstanceOf(Object);
      expect(res.body[0].Hotel).toHaveProperty("id", expect.any(Number));
      expect(res.body[0].Hotel).toHaveProperty("name", expect.any(String));
      expect(res.body[0].Hotel).toHaveProperty("slug", expect.any(String));
      expect(res.body[0].Hotel).toHaveProperty("image", expect.any(String));
      expect(res.body[0].Hotel).toHaveProperty("address", expect.any(String));
      expect(res.body[0].Hotel).toHaveProperty("geocoding", expect.any(String));
      expect(res.body[0].Hotel).toHaveProperty("price", expect.any(Number));
      expect(res.body[0].Hotel).toHaveProperty("CityId", expect.any(Number));
      expect(res.body[0]).toHaveProperty("Favourites");
      expect(res.body[0].Favourites).toBeInstanceOf(Array);
      expect(res.body[0].Favourites[0]).toHaveProperty("DestinationId", expect.any(Number));
      expect(res.body[0].Favourites[0]).toHaveProperty("UseTravelStepId", expect.any(Number));
      expect(res.body[0].Favourites[0]).toHaveProperty("Destination");
      expect(res.body[0].Favourites[0].Destination).toBeInstanceOf(Object);
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("id", expect.any(Number));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("name", expect.any(String));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("slug", expect.any(String));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("address", expect.any(String));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("mainImg", expect.any(String));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("cost", expect.any(Number));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("geocoding", expect.any(String));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("description", expect.any(String));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("CityId", expect.any(Number));
      expect(res.body[0].Favourites[0].Destination).toHaveProperty("UserId", expect.any(Number));
    });
    test('500, Internal Server Error', async () => {
      await request(app).post("/travel-steps").set({
        access_token
      })
        .send({
          HotelId: 4,
          name: "test",
          DestinationIds: [
            {
              id: 2
            },
            {
              id: 4
            }
          ]
        });
      jest.spyOn(TravelStep, 'findAll').mockRejectedValue('Error')
      return request(app)
        .get('/travel-steps').set({access_token})
        .then((res) => {
          expect(res.status).toBe(500)
          expect(res.body).toHaveProperty("msg");
          expect(res.body.msg).toBe("Internal Server Error");
        })
        .catch((err) => {
          console.log(err)
        })
    })
  });
});