# Controller
Di dalam modul ini kita mengenal 3 jenis file yakni: `admin, book,` dan `genre`.

1. `Admin.js` <br>
File ini berisikan _logic_ dalam mengolah informasi mengenai admin.

    ```
    require("dotenv").config();
    const admin = require("../model/admin");
    const response = require("../helper/response");
    const jwt = require("jsonwebtoken");
    ```
    Kita akan membahas variabel-variabel yang digunakan. Ada `admin, response,` dan `jwt`.
    1. `admin` : Variable ini digunakan untuk load model `admin`. Di mana pada model `admin` tersebutlah akan dilakukan interaksi langsung system dengan database.
    2. `response` : Variable ini digunakan untuk laod helper `response`. Helper ini kita gunakan untuk menampilkan feedback dari aksi yang sudah kita lakukan. Sehingga kita bakal tahu nih, apakah ada error / bug ketika kita menjalankan aplikasi kita ini.
    3. `jwt` : Variable ini digunakan untuk memanggil package `jsonwebtoken`. JWT adalah sebuah token berbentuk string yang panjang dan random yang biasanya digunakan untuk otentifikasi atau pertukaran data informasi yang penting.

    Setelah itu kita akan membahas kode di bawahnya:
    ```
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
    ```
    Pada bagian ini, ada 3 konstanta yaitu `salt, passHash,` dan `data`. Kegunaan `salt` adalah untuk menambahkan string unik random untuk mengacak password sehingga susah di-decode. Kemudian ada `passHash` ini digunakan untuk me-_generate_ password dari `req.body` dengan `salt`, sehingga dihasilkan 1 baris string panjang dari beberapa karakter password yang diinputkan oleh user. Kemudian ada variable `data`. Variable `data` berfungsi untuk menyimpan data-data pengguna yang mendaftar ke aplikasi kita ini. Isinya ada `username, password,` dan `salt`.

    Selanjutnya kita dengan menggunakan variabel `admin`, kita akan memanggil method `register` yang ada pada model `admin.js` disamping itu kita menempatkan parameter `data` pada function `register` sehingga data akan dimasukkan ke dalam database melalui model `admin.js` tersebut.

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

    Selanjutnya kita akan membahas terkait dengan `login`. Ada 2 variable yang terlibat `username` dan `password` username ini nantinya akan dilempar ke method `getByUserName()` yang ada pada model admin. Gunanya untuk mengecek apakah `username` ada di database. Kalau password yang dimasukkan sama dengan password di database, maka field token akan diisi dengan JWT. Kalau tidak sama, maka system akan menolak untuk login.

2. `Book.js`<br>
Selanjutnya kita akan berkutat dengan _logic_ untuk mengolah berbagai macam data buku.
    1. `getBook` : Ini digunakan untuk menampilkan keseluruhan data buku yang ada.
    2. `addBook` : Menambahkan data buku
    3. `updateBook` : Mengupdate data buku tertentu
    4. `deleteBook` : Menghapus data buku tertentu
    5. `rentBook` : Menyewa/meminjam buku
    6. `returnBook` : Mengembalikan buku
    7. `searchBook` : Mencari buku berdasarkan judul buku
    8. `sortBook`: Mengurutkan data buku berdasarkan keadaan-keadaan tertentu seperti: `sortBookByTitle, sortBookByDate, sortBookByGenre,` dan `sortBookByAvailability`.

3. `Genre.js` <br>
File ini digunakan untuk melakukan _logic_ pada data genre. Nantiny data ini juga akan ditampilkan seperti halnya buku. Fitur-fiturnya antara lain:
    1. `getGenre` : Menampilkan daftar genre
    2. `addGenre` : Menambahkan data genre
    3. `updateGenre` : Mengupdate genre tertentu
    4. `deleteGenre` : Menghapus genre tertentu.