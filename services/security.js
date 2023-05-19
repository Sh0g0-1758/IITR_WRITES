const { verifyToken } = require("./jwt");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  let ourl = req.originalUrl;
  console.log(ourl);
  if (!token) {
    req.verified = false;
    req.o_url = ourl;
    return next();
  } else {
    try {
      let data = verifyToken(token);
      if (data.status == false) {
        req.verified = false;
        req.o_url = ourl;
        return next();
      } else {
        req.username = data.user_info.name;
        req.verified = true;
        req.o_url = ourl;
        return next();
      }
    } catch {
      req.verified = false;
      req.o_url = ourl;
      return next();
    }
  }
};

module.exports = { authorization };
