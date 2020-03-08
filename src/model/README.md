# Model
Modul ini digunakan untuk melakukan operasi query pada database kita.

1. Admin : `register` untuk mendaftarkan admin ke sistem dan `getByUserName` untuk mengecek apakah username ada di db atau tidak. `getByUserName` digunakan ketika proses login  tengah berjalan.

2. Book <br>
    1. `bookCount` : Untuk menghitung buku, digunakan  pada saat pagination.
    2. `getBook` : Untuk menampilan keseluruhan data buku.
    3. `addBook` : Menambahkan data buku
    4. `updateBook` : Menupdate data buku tertentu
    5. `deleteBook` : Menghapus data buku tertentu
    6. `checkAvailabilityBook` : Mengecek Ketersediaan buku
    7. `rentBook` : Menyewa / meminjam buku sehingga mengubah value `books.available` menjadi 0, sehingga tidak bisa dipinjam lagi oleh orang lain.
    8. `returnBook` : Mengembalikan buku dan mengubah nilai `books.available` menajadi 1, sehingga buku dapat dipinajam lagi oleh orang lain.
    9. `searchBook`: Untuk mencari buku berdasarkan judul buku
    10. `sortBookByTitle` : Mengurutkan buku berdasarkan judul buku
    11. `sortBookByGenre` : Mengurutkan buku berdasarkan genre
    12. `sortBookByDate` : Mengurutkan buku berdasarkan tanggal release
    13. `sortBookByAvailability` : Mengurutkan buku berdasarkan ketersediaan buku.

3. Genre <br>
    1. `getAllGenre` : Untuk menampilkan keseluruhan data genre
    2. `addGenre` : Menambahkan genre
    3. `updateGenre` : Mengupdate genre tertentu
    4. `deleteGenre` : Menghapus data genre tertentu