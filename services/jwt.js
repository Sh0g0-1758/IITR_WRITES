const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JSON_TOKEN_SECRET);
}

function verifyToken(token) {
  let info = {
    status: false,
    user_info: null,
  };
  jwt.verify(token, process.env.JSON_TOKEN_SECRET, (err, user) => {
    if (err == null) {
      info = {
        status: true,
        user_info: user,
      };
    }
  });
  return info;
}

module.exports = { generateAccessToken, verifyToken };
