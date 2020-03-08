# Helper
Helper berfungsi sebagai tempat untuk menampung fungsi-fungsi yang membantu proses-proses dalam aplikasi.
1. `Auth.js` <br>
    ```
    const jwt = require("jsonwebtoken");
    const response = require("./response");
    const allowedAccess = process.env.REQUEST_HEADERS;
    ```

    Ada 3 variable yang terlibat dalam proses authentifikasi, yaitu: `jwt, response,` dan `allowedAccess`.

    1. `authInfo`
        ```
        authInfo: (req, res, next) => {
            console.log("masuk");
            const headerAuth = req.headers["authorization"];
            const headerSecret = req.headers["x-token"];
            if (headerAuth !== allowedAccess) {
            return response.response(res, null, 401, "Sorry You Unauthorized");
            } else if (typeof headerSecret === "undefined") {
            next();
            } else {
            const barerToken = headerSecret.split(" ");
            req.token = barerToken[1];
            next();
            }
        },
        ```
        Pada `authInfo` terdapat pengecekan `headerAuth` dengan `REQUEST_HEADERS` pada file `.env`. bila tidak cocok maka akses ke sistem ditolak.

    2. `accessToken`
        ```
        accessToken: (req, res, next) => {
            const secretKey = process.env.SECRET_KEY;
            const accessToken = req.token;
            const adminToken = req.headers["user-token"];
            jwt.verify(accessToken, secretKey, (err, decode) => {
            if (err && err.name === "TokenExpiredError")
                return response.response(res, null, 402, "Token Expired");

            if (err && err.name === "JsonWebTokenError")
                return response.response(res, null, 402, "Invalid Token");

            if (parseInt(adminToken) !== parseInt(decode.id_user))
                return response.response(res, null, 402, "Invalid User Token");

            next();
            });
        }
        ```

        Selanjutnya bila proses di `authInfo` berhasil maka akan dilanjutkan di proses `accessToken`. Di dalam file ini akan dilakukan verifikasi terhadap token dan secret key untuk mengecek **expired token / invalid token / invalid user token, dsb**.

2. `Response.js` <br>
Untuk memberikan feedback / respon terhadap aksi yang kita lakukan pada sistem kita. Dan digunakan pula untuk mengecek apakah ada bug/error yang ada pada aplikasi kita.

    ```
    response: (res, result, status, error) => {
        let resultPrint = {};

        resultPrint.error = error || null;
        resultPrint.status = status || 200;
        resultPrint.result = result;

        return res.status(resultPrint.status).json(resultPrint);
    },
    ```