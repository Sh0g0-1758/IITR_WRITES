require("dotenv").config();
const { Users } = require("../models/user");
const { blogs } = require("../models/blog");
const { generateHash, validateUser } = require("../services/bcrypt");
const { find, findall } = require("../services/mongo");
const { generateAccessToken, verifyToken } = require("../services/jwt");

function app_routing(app) {
  app.get("/", (req, res) => {
    if (req.verified) {
      let username = req.username;
      res.redirect(`Writes/${username}`);
    } else if (!req.token) {
      res.redirect("/login?em=f&un=f&u=f&p=f");
    }
  });

  app.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    res.redirect("/");
  });

  //   #############################################################

  app.get("/Writes/:name", async (req, res) => {
    if (req.verified && req.username === req.params.name) {
      let available_blogs = await findall(blogs);
      res.render("Writes", {
        username: req.params.name,
        blogs: available_blogs,
      });
    } else {
      res.redirect("/403");
    }
  });

  app.get("/403", (req, res) => {
    res.status(403).render("403");
  });

  app.get("/404", (req, res) => {
    res.status(404).render("404");
  });

  app.get("/login", (req, res) => {
    let email = req.query.em;
    let username = req.query.un;
    let user = req.query.u;
    let password = req.query.p;
    res.render("login", {
      email: email,
      username: username,
      user: user,
      password: password,
    });
  });

  //   #####################################################################

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
      res.redirect("/login?em=t&un=f&u=f&p=f"); // TO DO
      return;
    }
    if (availableUsers.length != 0) {
      res.redirect("/login?em=f&un=t&u=f&p=f"); // TO DO
      return;
    }
    const user = new Users(userObject);
    await user.save();
    let new_user = {
      name: username,
    };
    let new_token = generateAccessToken(new_user);
    return res
      .cookie("access_token", new_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .redirect(`Writes/${new_user.name}`);
  });

  app.post("/user", async (req, res) => {
    const email = req.body.email;
    const password = req.body.pswd;
    let re = new RegExp(`^${email}`);
    const availableUsers = await find(Users, ["email"], [re]);
    if (availableUsers.length == 0) {
      res.redirect("/login?em=f&un=f&u=t&p=f"); // TO DO
      return;
    } else {
      let verified = validateUser(password, availableUsers[0].password);
      if (verified) {
        let new_user = {
          name: availableUsers[0].name,
        };
        let new_token = generateAccessToken(new_user);
        return res
          .cookie("access_token", new_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .redirect(`Writes/${new_user.name}`);
      } else {
        res.redirect("/login?em=f&un=f&u=f&p=t"); // TO DO
      }
    }
  });
}

module.exports = { app_routing };
