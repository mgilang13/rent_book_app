const connection = require("../config/db");
module.exports = {
  register: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO admin SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getByAdminEmail: email => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM admin WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  checkAvailUser: username => {
    console.log(username);

    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT username FROM admin WHERE username = ?",
        username,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
    // return 0;
  }
};
