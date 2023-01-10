if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

const { socketIoInit } = require('./socket')
const http = require('http')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

const server = http.createServer(app)
socketIoInit(server)

module.exports = server