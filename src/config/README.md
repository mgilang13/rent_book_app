# Config

Modul ini kita gunakan untuk mengkonfigurasi database pada sistem aplikasi yang tengah kita bangun.

```
require("dotenv").config();
const mysql = require("mysql");
```

Di sini kita akan membutuhkan package `dotenv` untuk membantu kita dalam mengatur file `.env`.

```
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "Z"
});
```

Pada kode di atas, kita akan membuat koneksi dengan database kita dengan menggunakan file `.env` yang sudah kita buat tadi. Hal ini membantu kita dalam menyembunyikan informasi yang ada pada file `.env` namun kita masih dapat menggunakannya dengan bantuan `process.env.VARIABLE_NAME`.

```
connection.connect(err => {
  if (err) {
    console.log(err);
  }
});

module.exports = connection;
```

Setelah itu kita mulai menjalankan function `connect()` untuk menghubungkan aplikasi kita dengan database yang ada pada localhost phpmyadmin di komputer kita.
