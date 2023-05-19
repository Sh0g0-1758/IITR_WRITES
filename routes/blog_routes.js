require("dotenv").config();
const upload = require("express-fileupload");
const {blogs} = require("../models/blog")

function blog_routing (app) {
    app.get("/blog/create/:name", (req,res) => {
        res.render("blog", {username : req.params.name})
    })

    app.post("/blog/create/:name", async (req,res) => {
        let file = req.files.display;
        let name = file.name;
        file.mv("/home/shogo/shogo/dev/blocsoc/blogSite/services/uploads/"+name, async function(err) {
            if (err) {
                console.log(err)
                res.redirect("/404")
              } else {
                  const blog_object = {
                      writer : req.params.name,
                      title : req.body.title,
                      sub_title : req.body.sub_title,
                      blog : req.body.content,
                      display : name
                  }
                  const blog = new blogs(blog_object);
                  await blog.save();
                  res.send(":)"); // TO DO
                  res.end();
              }
        })
    })
}

module.exports = {blog_routing}