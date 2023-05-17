const mongoose = require('mongoose');
mongodb()
.then()
.catch(err => console.log(err));

async function mongodb() {
  await mongoose.connect(`mongodb+srv://shogo:${process.env.MONGO_ATLAS_SECRET_KEY}@cluster0.s6ib9cb.mongodb.net/?retryWrites=true&w=majority`);
}

async function find (model,query,param) {
    if(query.length !== param.length) {
        return "invalid parameters";
    }
    var Tofind = {};
    for(let i = 0; i < model.length;i++) {
        Tofind[query[i]] = param[i];
    }
    return await model.find(Tofind)
}

module.exports = {mongodb}
module.exports = {find}