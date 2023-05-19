require("dotenv").config();
const { blogs } = require("../models/blog");
const { find, delete_data } = require("../services/mongo");

function profile_routing(app) {
  app.get("/profile/:name", async (req, res) => {
    if(req.verified && req.username === req.params.name) {
        let username = req.params.name;
        let re_1 = new RegExp(`^${username}`);
        const available_blogs = await find(blogs, ["writer"], [re_1]);
        res.render("profile", { username: username, blogs: available_blogs });
    } else {
        res.redirect("/403");
    }
  });

  app.get("/profile/delete", async (req, res) => {
    if(req.verified && req.username === req.query.w) {
        let title = req.query.t;
        let user = req.query.w;
        let re_1 = new RegExp(`^${title}`);
        let re_2 = new RegExp(`^${user}`);
        const available_blogs = await delete_data(
          blogs,
          ["title", "writer"],
          [re_1, re_2]
        );
        res.redirect(`/profile/${user}`);
    } else {
        res.redirect("/403");
    }
  });
}

module.exports = { profile_routing };
