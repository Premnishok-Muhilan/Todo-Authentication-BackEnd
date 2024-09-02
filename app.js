// import the express module
const express = require("express");
const todoRouter = require("./routes/todoRoutes");
const requestLogger = require("./utils/logger");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

// create an express application
const app = express();

// use the express middleware for enabling CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

// use the cookie parser middleware
app.use(cookieParser());

// use the express middleware for parsing json data
app.use(express.json());

// use the express middleware for logging
app.use(requestLogger);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

module.exports = app;
