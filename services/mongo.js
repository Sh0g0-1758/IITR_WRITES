const mongoose = require("mongoose");

async function mongodb() {
  await mongoose.connect(
    `mongodb+srv://shogo:${process.env.MONGO_ATLAS_SECRET_KEY}@cluster0.s6ib9cb.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log("database is connected !!");
}

async function find(model, query, param) {
  if (query.length !== param.length) {
    return "invalid parameters";
  }
  var Tofind = {};
  for (let i = 0; i < model.length; i++) {
    Tofind[query[i]] = param[i];
  }
  return await model.find(Tofind);
}

module.exports = { mongodb, find };
