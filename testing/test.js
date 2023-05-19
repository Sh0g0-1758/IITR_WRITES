const express = require("express");
const upload = require("express-fileupload");
const app = express();
app.use(express.static("some/uploads")); // to view static files
app.set("view engine", "ejs");
app.use(express.json()); // to get the data in json format
app.use(express.urlencoded({ extended: true })); // to get the form data
// app.use(upload());

app.post("/data", (req, res) => {
  res.render("error", {content : req.body.content})
});

app.get("/", (req, res) => {
  res.render("test")
});

app.get("/hope", (req,res) => {
  if(req.body.hope) {
    res.send(":)")
  } else {
    res.send(":(")
  }
  res.end();
})

app.listen(8989, () => {
  console.log("end it luv");
});
