require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../models/user");
const { generateHash, validateUser } = require("../services/bcrypt");
const {find} = require("../services/mongo")

function app_routing(app) {
  app.get("/", (req, res) => {
    res.render("login");
  });

  app.post("/user_data", async (req, res) => {
    const username = req.body.txt;
    const email = req.body.email;
    const password = generateHash(req.body.pswd,10);
    const userObject = {
      name: username,
      email: email,
      password: password,
    };
    let re_1 = new RegExp(`^${username}`);
    let re_2 = new RegExp(`^${email}`);
    const availableUsers = await find(Users,["name"],[re_1]);
    const availableEmails = await find(Users,["email"],[re_2]);
    if(availableEmails.length != 0) {
        res.send("/") // TO DO
        return;
    }
    if(availableUsers.length != 0) {
        res.send("/") // TO DO
        return;
    }
    const user = new Users(userObject);
    res.render(`${username}_Writes`);
  });

  app.post("/user", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let re = new RegExp(`^${email}`);
    const availableUsers = await find(Users,["email"],[re]);
    if(availableUsers.length == 0) {
        res.render("/") // TO DO
        return;
    }

    // const accesstoken = jwt.sign(user, process.env.JSON_TOKEN_SECRET);
  });
}

module.exports = { app_routing };
