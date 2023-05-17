require("dotenv").config();
const { Users } = require("../models/user");
const { generateHash, validateUser } = require("../services/bcrypt");
const { find } = require("../services/mongo");
const { generateAccessToken, verifyToken } = require("../services/jwt");

function app_routing(app) {
  app.get("/", (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null) {
        res.render("login");
    } else {
        if(verifyToken(token).status) {
            let username = verifyToken(token).user_info.name;
            res.render(`${username}_Writes`, {username : username});
        } else {
            res.render("login")
        }
    }
  });

  app.get("/some", (req,res) => {
    res.render("some")
  })

  app.get("*/Writes", (req,res) => {
    res.render("blog")
  })

  app.post("/user_data", async (req, res) => {
    const username = req.body.txt;
    const email = req.body.email;
    const password = generateHash(req.body.pswd, 10);
    const userObject = {
      name: username,
      email: email,
      password: password,
    };
    let re_1 = new RegExp(`^${username}`);
    let re_2 = new RegExp(`^${email}`);
    const availableUsers = await find(Users, ["name"], [re_1]);
    const availableEmails = await find(Users, ["email"], [re_2]);
    if (availableEmails.length != 0) {
      res.send("some"); // TO DO
      return;
    }
    if (availableUsers.length != 0) {
      res.send("some"); // TO DO
      return;
    }
    const user = new Users(userObject);
    await user.save();
    let new_user = {
      name: username,
    };
    let new_token = generateAccessToken(new_user);
    res.render(`Writes`, { auth_token: new_token, username : username });
  });

  app.post("/user", async (req, res) => {
    const email = req.body.email;
    const password = req.body.pswd;
    let re = new RegExp(`^${email}`);
    const availableUsers = await find(Users, ["email"], [re]);
    if (availableUsers.length == 0) {
      res.render("some"); // TO DO
      return;
    }
    let verified = validateUser(password,availableUsers[0].password);
    if (verified) {
      let new_user = {
        name: availableUsers[0].name,
      };
      let new_token = generateAccessToken(new_user);
      res.render(`Writes`, { auth_token: new_token });
    } else {
      res.render("some"); // TO DO
    }
  });
}

module.exports = { app_routing };
