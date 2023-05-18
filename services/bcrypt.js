const bcrypt = require("bcrypt");

function generateHash(password, saltRounds) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function validateUser(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { generateHash, validateUser };
