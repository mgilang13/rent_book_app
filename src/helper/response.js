const crypto = require("crypto");

module.exports = {
  response: (res, result, status, error) => {
    let resultPrint = {};

    resultPrint.error = error || null;
    resultPrint.status = status || 200;
    resultPrint.result = result;

    return res.status(resultPrint.status).json(resultPrint);
  },
  responseP: (res, message, status, error, pageDetail, data) => {
    let resultPrint = {};
    resultPrint.status = status || 200;
    resultPrint.error = error || false;
    resultPrint.message = message || "Success";
    resultPrint.pageDetail = pageDetail || {};
    resultPrint.data = data || {};

    return res.status(resultPrint.status).json(resultPrint);
  },
  getRandomSalt: length => {
    return crypto
      .randomBytes(Math.ceil(length * 4))
      .toString("hex")
      .slice(0, length);
  },
  setPass: (password, salt) => {
    let hash = crypto.createHmac("sha256", salt);
    hash.update(password);
    let value = hash.digest("hex");
    return {
      salt: salt,
      passHas: value
    };
  }
};
