const admin = require("../model/admin");
const response = require("../helper/response");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    const salt = response.getRandomSalt(process.env.LENGTH_SALT);
    const passHash = response.setPass(req.body.password, salt);

    //data yang akan dimasukkan ke database
    const data = {
      username: req.body.username,
      password: passHash.passHas,
      salt: passHash.salt
    };
    admin
      .register(data)
      .then(result => {
        response.response(res, result);
      })
      .catch(err => {
        response.response(res, null, 401, "Sorry something wrong");
      });
  },
  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    user.getByUserNamee(username).then(result => {
      const dataAdmin = result[0];
      const adminPass = response.setPass(password, dataAdmin.salt).passHas;
    });
  }
};
