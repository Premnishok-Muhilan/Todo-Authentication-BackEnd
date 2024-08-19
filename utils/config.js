require("dotenv").config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT;


//This module exports an object with two properties:
// MONGO_DB_URL and PORT
module.exports = {
  MONGO_DB_URL,
  PORT
};
