require("dotenv").config();
const upload = require("express-fileupload");
const { blogs } = require("../models/blog");
const { find, delete_data } = require("../services/mongo");

function blog_routing(app) {
  app.get("/blog_page", async (req, res) => {
    if (req.verified && req.query.w == req.username) {
      let title = req.query.t;
      let username = req.query.w;
      let re_1 = new RegExp(`^${username}`);
      let re_2 = new RegExp(`^${title}`);
      const blog = await find(blogs, ["writer", "title"], [re_1, re_2]);
      let actual_blog = blog[0];
      res.render("blog_page", {
        title: actual_blog.title,
        writer: actual_blog.writer,
        sub_title: actual_blog.sub_title,
        blog: actual_blog.blog,
        error: false,
        edit: true,
      });
    } else {
      res.redirect("/403");
    }
  });

  app.get("/blog/create/:name", (req, res) => {
    if (req.verified && req.username == req.params.name) {
      res.render("blog", {
        writer: req.params.name,
        title: "",
        blog: "",
        sub_title: "",
        error: false,
        edit: false,
      });
    } else {
      res.redirect("/403");
    }
  });

  app.get("/blog/edit", async (req, res) => {
    if (req.verified && req.username == req.query.w) {
      let title = req.query.t;
      let username = req.query.w;
      let re_1 = new RegExp(`^${username}`);
      let re_2 = new RegExp(`^${title}`);
      const blog = await find(blogs, ["writer", "title"], [re_1, re_2]);
      let actual_blog = blog[0];
      res.render("blog", {
        title: actual_blog.title,
        writer: actual_blog.writer,
        sub_title: actual_blog.sub_title,
        blog: actual_blog.blog,
        error: false,
        edit: true,
      });
    } else {
      res.redirect("/403");
    }
  });

  app.post("/blog/del_new", async (req, res) => {
    if (req.verified && req.username == req.query.w) {
      /// deleting the old blog

      let old_title = req.query.t;
      let user = req.query.w;
      let old_re_1 = new RegExp(`^${old_title}`);
      let old_re_2 = new RegExp(`^${user}`);
      const available_blogs = await delete_data(
        blogs,
        ["title", "writer"],
        [old_re_1, old_re_2]
      );

      /// creating a new blog

      let title = req.body.title;
      let username = user;
      let re_1 = new RegExp(`^${username}`);
      let re_2 = new RegExp(`^${title}`);
      const blog = await find(blogs, ["writer", "title"], [re_1, re_2]);
      if (blog.length != 0) {
        res.render("blog", {
          title: req.body.title,
          writer: user,
          sub_title: req.body.sub_title,
          blog: req.body.content,
          error: true,
          edit: false,
        });
      } else {
        let file = req.files.display;
        let name = file.name.split(" ").join("");
        file.mv(
          "/home/shogo/shogo/dev/blocsoc/blogSite/public/uploads/" + name,
          async function (err) {
            if (err) {
              res.redirect("/404");
            } else {
              const blog_object = {
                writer: user,
                title: req.body.title,
                sub_title: req.body.sub_title,
                blog: req.body.content,
                display: name,
              };
              const blog = new blogs(blog_object);
              await blog.save();
              res.redirect(`/profile/${user}`);
            }
          }
        );
      }
    } else {
      res.redirect("/403");
    }
  });

  app.post("/blog/create/:name", async (req, res) => {
    if (req.verified && req.username == req.params.name) {
      let title = req.body.title.split(" ").join("_");
      let username = req.params.name;
      let re_1 = new RegExp(`^${username}`);
      let re_2 = new RegExp(`^${title}`);
      const blog = await find(blogs, ["writer", "title"], [re_1, re_2]);
      if (blog.length !== 0) {
        res.render("blog", {
          title: req.body.title,
          writer: req.params.name,
          sub_title: req.body.sub_title,
          blog: req.body.content,
          error: true,
          edit: false,
        });
      } else {
        let file = req.files.display;
        let name = file.name.split(" ").join("");
        file.mv(
          "/home/shogo/shogo/dev/blocsoc/blogSite/public/uploads/" + name,
          async function (err) {
            if (err) {
              res.redirect("/404");
            } else {
              const blog_object = {
                writer: username,
                title: title,
                sub_title: req.body.sub_title,
                blog: req.body.content,
                display: name,
              };
              const blog = new blogs(blog_object);
              await blog.save();
              res.redirect(`/profile/${req.params.name}`);
            }
          }
        );
      }
    } else {
      res.redirect("/403");
    }
  });
}

module.exports = { blog_routing };
