const io = require('socket.io-client')
const { io: server } = require("../app")
const { User, Topic, sequelize } = require('../models')

let userAdmin
let userCustomer
let newTopic
let socket;
server.attach(3010);
socket = io("http://localhost:3010");

beforeAll(async function () {
  userAdmin = await User.create({
    fullName: "User Admin",
    phoneNumber: "000123456789",
    email: "userAdmin@gmail.com",
    password: "admin",
    isPremium: false,
    role: "Admin",
  });
  userCustomer = await User.create({
    fullName: "yohyakarta",
    phoneNumber: "000123456789",
    email: "userCustomer@gmail.com",
    password: "customer",
    isPremium: false,
    role: "Customer",
  });
  newTopic = await Topic.create({
    title: "TestingOne",
    type: "Forum",
    UserId: userAdmin.id
  });
})

afterAll(async function () {
  await sequelize.queryInterface.bulkDelete("Messages", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Topics", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Socket Testing", function () {
  beforeEach(function (done) {
    socket = io("http://localhost:3010");
    socket.on("connect", function () {
      console.log("worked...");
      done();
    });
    socket.on("disconnect", function () {
      console.log("disconnected...");
    });
  });
  
  afterEach(function (done) {
    if (socket.connected) {
      console.log("disconnecting...");
      socket.disconnect();
    } else {
      console.log("no connection to break...");
    }
    done();
  });
  
  afterAll(function (done) {
    socket.disconnect();
    server.close();
    done();
  });

  describe("Work Socket Function", function () {
    test("Socket Should Work", (done) => {

      socket.emit("join_room", newTopic.slug)

      socket.emit("send_message", {
        id: newTopic.id,
        slug: newTopic.slug,
        email: userCustomer.email,
        text: "First Testing"
      })

      socket.on("receive_message", (data) => {
        try {
          expect(data).toBeInstanceOf(Object);
          expect(data).toHaveProperty("id", expect.any(Number));
          expect(data).toHaveProperty("text", expect.any(String));
          expect(data).toHaveProperty("UserId", expect.any(Number));
          expect(data).toHaveProperty("TopicId", expect.any(Number));
          done();
        } catch (err) {
          done(err);
        }
      })
    });
  });
  
  describe("Failed to Work Socket Function", function () {
    test("Socket Should Not Work Because No Id", (done) => {

      socket.emit("join_room", newTopic.slug)
      socket.emit("send_message", {
        slug: newTopic.slug,
        email: userCustomer.email,
        text: "Second Testing"
      })

      socket.on("receive_message", (data) => {
        try {
          expect(data).toBeInstanceOf(Array);
          expect(data[0]).toBe("error");
          expect(data[1]).toBeInstanceOf(Object)
          done();
        } catch (err) {
          done(err);
        }
      })

    });
    test("Socket Should Not Work Because No Topic Found with given Id", (done) => {

      socket.emit("join_room", newTopic.slug)
      socket.emit("send_message", {
        id: 5,
        slug: newTopic.slug,
        email: userCustomer.email,
        text: "Second Testing"
      })

      socket.on("receive_message", (data) => {
        try {
          expect(data).toBeInstanceOf(Array);
          expect(data[0]).toBe("error");
          expect(data[1]).toBeInstanceOf(Object)
          done();
        } catch (err) {
          done(err);
        }
      })

    });
    test("Socket Should Not Work Because No User Found with given Email", (done) => {

      socket.emit("join_room", newTopic.slug)
      socket.emit("send_message", {
        id: newTopic.id,
        slug: newTopic.slug,
        email: "failedtesting@mail.com",
        text: "Second Testing"
      })

      socket.on("receive_message", (data) => {
        try {
          expect(data).toBeInstanceOf(Array);
          expect(data[0]).toBe("error");
          expect(data[1]).toBeInstanceOf(Object)
          done();
        } catch (err) {
          done(err);
        }
      })

    });
  });
});