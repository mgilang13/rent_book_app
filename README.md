# Rent Book App

**Deskripsi** : Aplikasi sederhana untuk melakukan aktivitas pinjam-meminjam buku <br>
**Pembuat** : Muhammad Gilang Nur Khoiri, A.Md.

## Requirement

Node JS

## Cara install

1. Clone git `git clone https://github.com/mgilang13/rent_book_app.git`

2. cd rent_book_app
3. `npm install`
4. Import Databaase dari folder db
5. `npm start`

## Book's Endpoints

| No  | HTTP Method | URI                             | Operations                |
| --- | ----------- | ------------------------------- | ------------------------- |
| 1   | GET         | /api/v1/book/                   | Get All Books Data        |
| 2   | GET         | /api/v1/book/bookDetail/:idbook | Get Book Data by ID       |
| 3   | GET         | /api/v1/book/?page=1            | Get Book in first page    |
| 4   | GET         | /api/v1/book/?search=book_title | Get Searched Book         |
| 5   | GET         | /api/v1/book/sortBookByTitle    | Sort Book By Title        |
| 6   | GET         | /api/v1/book/sortBookByDate     | Sort Book By Date         |
| 7   | GET         | /api/v1/book/sortBookByGenre    | Sort Book By Genre        |
| 8   | GET         | /api/v1/book/sortBookByAvail    | Sort Book By Availability |
| 9   | GET         | /api/v1/book/getBookReturn      | Get Returned Book Data    |
| 10  | POST        | /api/v1/book/addbook            | Post New Data Book        |
| 11  | PATCH       | /api/v1/book/updateBook/:idbook | Update Book by ID         |
| 12  | PATCH       | /api/v1/book/returnBook/:idbook | Return Book By ID         |
| 13  | PATCH       | /api/v1/book/rentBook/:idbook   | Rent Book By ID           |
| 14  | DELETE      | /api/v1/book/deleteBook/:idbook | Delete Book By ID         |

## Genre's Endponts

| No  | HTTP Method | URI                    | Operations              |
| --- | ----------- | ---------------------- | ----------------------- |
| 1   | GET         | /api/v1/genre/         | Get All Data Genres     |
| 2   | POST        | /api/v1/genre/addgenre | Post New Data Genre     |
| 3   | PATCH       | /api/v1/genre/:idgenre | Update Data Genre By ID |
| 4   | DELETE      | /api/v1/genre/:idgenre | Delete Data Genre By ID |

## Availability's Endpoint

| No  | HTTP Method | URI                      | Operations         |
| --- | ----------- | ------------------------ | ------------------ |
| 1   | GET         | /api/v1/avail/availCheck | Check Availability |

## Admin's Endpoints

| No  | HTTP Method | URI                    | Operations        |
| --- | ----------- | ---------------------- | ----------------- |
| 1   | POST        | /api/v1/admin/register | Registeri An User |
| 2   | POST        | /api/v1/admin/login    | Login An User     |

## Project Structure

```
+ node_modules
+ src
|   ++ config
|   ++ controller
|   ++ helper
|   ++ model
|   ++ route
.env
.gitignore
app.js
package-lock.json
package.json
README.md
```

Pada struktur proyek di atas, kita akan mengklasifikasikan berbagai jenis file berdasarkan fungsionalitasnya yang akan kita buat nanti.

1.  `app.js` <br>
    File ini nantinya akan menjadi file yang akan di-load pertama kali saat sistem dijalankan melalui perintah `npm start`. File ini berisikan berbagai _requirement_ yang dibutuhkan oleh sistem. Isi file tersebut dapat dilihat seperti _code_ di bawah ini:

        ```
        const express = require("express");
        const app = express();
        const bodyParser = require("body-parser");
        const port = 3000;
        const book = require("./src/route/book");
        const genre = require("./src/route/genre");
        const admin = require("./src/route/admin");
        const logger = require("morgan");
        ```

    Pada awalnya kita akan mendeklarasikan semua elemen yang dibutuhkan dalam aplikasi ini. Pada kode awal `app.js` di atas kita menggunakan variabel-variabel seperti `express, app, bodyParser, port, book, genre, admin,` dan `logger`.

    1. `express` : Variable ini akan memanggil package `expressjs` yang merupakan framework dari Node JS. Fitur ini tentu saja akan sangat memudahkan para back-end engineer di dalam membuat REST API (CRUD).

    2. `app` : Proses inisiasi untuk memulai menggunakan fitur-fitur yang ada pada `expressJS`.

    3. `bodyParser` : Digunakan untuk mengubah / menampung variable-variable yang ada pada middleware ke dalam bentuk `req.body` di mana hal itu juga digunakan dalam mentransfer data antar file pada konse **Model-View-Controller**.

    4. `port` : Menentukan pada port mana kita menjalankan aplikasi yang kita buat ini. Port ini nantinya yang akan mengubungkan client dengan server buatan pada Node JS yang telah kita jalankan.

    5. `book, genre, admin` : Variable ini digunakan untuk menentukan rute mana yang akan ditempuh oleh suatu data nantinya akan diolah di bagian mana. Pada kasus di atas, data yang kita gunakan ada data `book`, data `genre`, dan data `admin` yang mengelola aplikasi ini nantinya.

    6. `logger` : Variable ini akan memanggil package `morgan` yang nantinya akan mencatat setiap request ke server. Pencatatan ini disebut dengan istilah _logger_ yang dapat diakses melalui terminal. Pencatatan ini sangat penting karena kita akan tahu sistem sedang melakukan apa.

       ```
       app.use(
       bodyParser.urlencoded({
           extended: true
       })
       );
       app.use(bodyParser.json());
       ```

       Kemudian pada kode di atas kita akan menggunakan package `body-parser` di mana kita akan menggunakan jenis parser yakni `urlencoded` dan `.json`. Body parser ini sangat penting karena kita akan dimudahkan dalam mengakses middleware dan mengakses request body dari request-request yang kita lakukan seperti `PUT, POST, PATCH, DELETE`, dsb.

       `app.use(logger("dev"));` <br>
       Kemudian kita akan menggunakan `morgan` untuk mencatat. Kita menggunakan flag `dev` untuk mengenali bahwa sesuatu yang kita catat itu merupakan aktifitas delopment dari aplikasi ini.

       ```
       app.listen(port, () => {
       console.log("Server On using Port", port);
       });
       ```

       Setelah itu kita menngunakan _function_ `listen` untuk mengindikasikan bahwa kita sedang berjalan di `port` sekian.

       ```
       app.use("/api/v1/book/", book);
       app.use("/api/v1/genre/", genre);
       app.use("/api/v1/admin/", admin);
       ```

       Selanjutnya kita menentukan url yang nantinya akan membuka `route` tertentu yang akan menentukan jalan mana yang akan ditempuh untuk melakukan aktivitas tertentu. Seperti update data buku, maka kita akan menggunakan route `book` yang nantinya akan disambungkan ke `controoler` book dan disitulah data kita akan diolah dan diproses oleh sistem yang tengah berjalan ini.

       `module.exports = app;`<br>
       Ini bertujuan supaya `app` dapat nyambung ke modul-modul yang ada pada folder `src` yang nantinya akan berisikan modul `config, controller, helper, model,` dan `route`.
