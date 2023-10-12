require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
//const fileUpload = require('express-fileupload');
//const { exec } = require("./api/services/database/Tables");


//create tables
//let tables = exec();

const app = express();

const userRoutes = require("./api/routes/user");
const managerRoutes = require("./api/routes/manager");
const { supplierRouter } = require("./api/routes/supplier");
const { supplyRecordRouter } = require("./api/routes/supplyRecord");
const { storageRouter } = require("./api/routes/storage");
const { goodRouter } = require("./api/routes/good");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(fileUpload());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/manager", managerRoutes);
app.use("/supplier", supplierRouter);
app.use("/supplyRecord", supplyRecordRouter);
app.use("/storage", storageRouter);
app.use("/good", goodRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = {
  app
};
