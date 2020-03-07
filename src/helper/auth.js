const jwt = require("jsonwebtoken");
const response = require("./response");
const allowedAccess = process.env.REQUEST_HEADERS;

module.exports = {
  authInfo: (req, res, next) => {
    // next ke middleware selanjutnya
    const headerAuth = req.headers["authorization"];
    const headerSecret = req.headers["x-token"];

    if (headerAuth != allowedAccess) {
      return response.response(res, null, 401, "Unauthorized, Sorry");
    } else {
      next();
    }
  }
};
