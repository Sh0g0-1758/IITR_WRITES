import { verifyToken } from "./jwt";

function token_verification(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.render("/some"); //TODO
  }
  if (verifyToken(token).status) {
    next();
  } else {
    res.render("/some"); //TODO
  }
}

module.exports = { token_verification };