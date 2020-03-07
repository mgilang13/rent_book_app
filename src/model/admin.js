const connection = require("../config/db");
module.exports = {
  register: data => {
    console.log(data);

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
  getByUserName: username => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT id, username, salt, password FROM admin WHERE username = ?",
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
  }
};
