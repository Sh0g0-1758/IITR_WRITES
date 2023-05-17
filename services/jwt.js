const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JSON_TOKEN_SECRET);
}

function verifyToken(token) {
  jwt.verify(token, process.env.JSON_TOKEN_SECRET, (err, user) => {
    if (err) {
      let info = {
        status: false,
        user_info: null,
      };
      return info;
    }
    let info = {
      status: true,
      user_info: user,
    };
    return info;
  });
}

module.exports = { generateAccessToken, verifyToken };
