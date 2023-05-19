const express = require("express");
const upload = require("express-fileupload");
const app = express();
app.set("view engine", "ejs");
app.use(express.json()); // to get the data in json format
app.use(express.urlencoded({ extended: true })); // to get the form data
app.use(upload());

app.post("/data", (req, res) => {
  console.log(req.body.title);
  console.log(req.body.sub_title);
  console.log(req.body.content);
  if (req.files) {
    var file = req.files.display;
    var filename = file.name;
    console.log(file);
    file.mv("./uploads/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send(":)");
      }
    });
  }
});

app.get("/", (req, res) => {
  res.render("test");
});

app.post("/post", (req, res) => {});

app.listen(8989, () => {
  console.log("end it luv");
});
