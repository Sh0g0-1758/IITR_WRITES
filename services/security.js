import { verifyToken } from "./jwt";

function token_verification(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.render("/"); //TODO
  }
  if (verifyToken(token).status) {
    next();
  } else {
    res.render("/"); //TODO
  }
}

module.exports = { token_verification };
