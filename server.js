// require statements
const express = require("express");
const path = require("path");
const { app_routing } = require("./routes/auth_routes");
const mongoose = require("mongoose");
const { mongodb } = require("./services/mongo");
const cookieParser = require("cookie-parser");
const { authorization } = require("./services/security");

// making an express app
const app = express();
const port = 6969;

// setting up a view engine
app.set("view engine", "ejs");

// necessary middleware
app.use(express.static("public")); // to view static files
app.use(express.json()); // to get the data in json format
app.use(express.urlencoded({ extended: true })); // to get the form data
app.use(cookieParser());
app.use(authorization);

// setting the routes of our app
app_routing(app);

// connecting to the database
mongodb();

// starting the app
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
