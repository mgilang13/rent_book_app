const jwt = require("jsonwebtoken");
const response = require("./response");
const allowedAccess = process.env.REQUEST_HEADERS;

module.exports = {
  authInfo: (req, res, next) => {
    const headerAuth = req.headers["authorization"];
    const headerSecret = req.headers["x-token"];
    console.log("header secret", headerSecret);
    console.log("header Auth", headerAuth)
    console.log("allowed Access", allowedAccess)

    if (headerAuth !== allowedAccess) {
      console.log('result result result', res)
      return response.response(res, null, 401, "Sorry You Unauthorized");
    } else if (typeof headerSecret === "undefined") {
      next();
    } else {
      const barerToken = headerSecret.split(" ");
      req.token = barerToken[1];
      console.log("req-token", barerToken[1]);
      next();
    }
  },
  accessToken: (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const accessToken = req.token;
    const adminToken = req.headers["user-token"];
    console.log(adminToken);
    console.log("accestoken", accessToken);
    jwt.verify(accessToken, secretKey, (err, decode) => {
      console.log("decoded", decode);
      if (err && err.name === "TokenExpiredError") {
        console.log('token exp', err)
        return response.response(res, null, 402, "Token Expired");
      }
      if (err && err.name === "JsonWebTokenError") {
        console.log('jsonweb', err)
        return response.response(res, null, 402, "Invalid Token");
      }

      if (parseInt(adminToken) !== parseInt(decode.id)) {
        console.log('adminToken gak cocok', decode.id);

        return response.response(res, null, 402, "Invalid User Token");
      }

      next();
    });
  }
};
