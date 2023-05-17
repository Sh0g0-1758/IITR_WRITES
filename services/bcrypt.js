const bcrypt = require("bcrypt");

function generateHash(password,saltRounds) {
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));
}

function validateUser(hash) {
  bcrypt
    .compare(password, hash)
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err.message));
}

module.exports = {generateHash,validateUser};