// const request = require("supertest");
// const app = require("../app.js");
// const { hashPassword } = require("../helpers/bcryptjs.js");
// const { sequelize } = require("../models");
// const { queryInterface } = sequelize;

// beforeAll(async () => {
//   await queryInterface.bulkInsert("Users", [
//     {
//       fullName: "bobby2",
//       phoneNumber: "08111",
//       email: "bobby2@gmail.com",
//       password: hashPassword("12345"),
//       isPremium: false,
//       role: "Customer",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       fullName: "bobby22",
//       phoneNumber: "08111",
//       email: "bobby22@gmail.com",
//       password: hashPassword("12345"),
//       isPremium: false,
//       role: "Customer",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       fullName: "bobby222",
//       phoneNumber: "08111",
//       email: "bobby222@gmail.com",
//       password: hashPassword("12345"),
//       isPremium: false,
//       role: "Customer",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       fullName: "bobby2222",
//       phoneNumber: "08111",
//       email: "bobby2222@gmail.com",
//       password: hashPassword("12345"),
//       isPremium: false,
//       role: "Customer",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       fullName: "bobby25",
//       phoneNumber: "08111",
//       email: "bobby25@gmail.com",
//       password: hashPassword("12345"),
//       isPremium: false,
//       role: "Admin",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ]);

//   await sequelize.queryInterface.bulkInsert(
//     "Destinations",
//     [
//       {
//         name: "Ancol",
//         address: "Jl. Lodan Timur no. 7 North Jakarta, Jakarta 14430 Indonesia",
//         mainImg:
//           "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/58/44/fd/ancol-dreamland.jpg?w=1200&h=-1&s=1",
//         cost: "250000",
//         geocoding: "123213123",
//         CityId: 1,
//         UserId: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ],
//     {}
//   );

//   await sequelize.queryInterface.bulkInsert(
//     "Favourites",
//     [
//       {
//         DestinationId: 1,
//         UserId: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ],
//     {}
//   );
// });

// afterAll(async () => {
//   await sequelize.queryInterface.bulkDelete("Users", null, {
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });

//   await sequelize.queryInterface.bulkDelete("Destinations", null, {
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });

//   await sequelize.queryInterface.bulkDelete("Favourites", null, {
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });
// });
