require("dotenv").config();
const admin = require("../model/admin");
const response = require("../helper/response");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    const salt = response.getRandomSalt(process.env.LENGTH_SALT);
    const passHash = response.setPass(req.body.password, salt);
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
        response.response(res, null, 401, "Sorry Something Wrong");
      });
  },
  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    admin
      .getByUserName(username)
      .then(result => {
        const dataAdmin = result[0];
        const adminPass = response.setPass(password, dataAdmin.salt).passHas;

        if (adminPass === dataAdmin.password) {
          dataAdmin.token = jwt.sign(
            {
              username: dataAdmin.username,
              id_admin: dataAdmin.id
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1200s"
            }
          );

          delete dataAdmin.salt;
          delete dataAdmin.password;
          return response.response(res, dataAdmin);
        } else {
          return response.response(
            res,
            null,
            403,
            "Wrong Password Or Username"
          );
        }
      })
      .catch(() => {
        return response.response(res, null, 404, "Username Not Register");
      });
  }
};
