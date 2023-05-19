const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  writer: String,
  title: String,
  sub_title: String,
  blog: String,
  display: String,
});

const blogs = mongoose.model("blogs", blogSchema);

module.exports = { blogs };
