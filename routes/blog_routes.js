require("dotenv").config();
const {blogs} = require("../models/blog")

function blog_routing (app) {
    app.get("/blog/create/:name", (req,res) => {
        res.render("blog")
    })
}