// require statements
const express = require("express");
const path = require("path");
const { app_routing } = require("./routes/auth_routes");
const { mongodb } = require("./services/mongo");

// making an express app
const app = express();
const port = 6969;

// setting up a view engine
app.set("view engine", "ejs");

// necessary middleware
app.use(express.static("public")); // to view static files
app.use(express.json()); // to get the data in json format
app.use(express.urlencoded({ extended: true })); // to get the form data

// setting the routes of our app
app_routing(app);

// connecting to the database
mongodb()
  .then(() => {
    console.log("database connected !!");
  })
  .catch((err) => console.log(err));

// starting the app
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
