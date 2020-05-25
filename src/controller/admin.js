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
      fullname: req.body.fullname,
      email: req.body.email,
      password: passHash.passHas,
      salt: passHash.salt
    };

    admin.checkAvailUser(data.username).then(i => {
      console.log("i : ", i);
      if (i.length !== 0) {
        response.response(res, null, 400, "Username has exist");
      } else if (i.length === 0) {
        admin
          .register(data)
          .then(result => {
            response.responseAuth(res, result, "You're registered!", 200, null);
          })
          .catch(err => {
            console.log(err)
            response.response(res, null, 401, "Sorry Something Wrong");
          });
      }
    });
  },
  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    admin
      .getByAdminEmail(email)
      .then(result => {
        const dataAdmin = result[0];
        const adminPass = response.setPass(password, dataAdmin.salt).passHas;

        if (adminPass === dataAdmin.password) {
          dataAdmin.token = jwt.sign(
            {
              email: dataAdmin.email,
              id: dataAdmin.id
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
      .catch(error => {
        console.log(error);
        return response.response(res, null, 404, "Username Not Register");
      });
  }
};
