# Route
Untuk menentukan rute kemana _logic_ akan dijalankan.

1. Admin <br>
`route.post("/register", admin.register).post("/login", admin.login);`

    Route admin bertugas untuk mengarahkan _logic_ ke `register` dan `login`.

2. Book <br>
    ```
    route
    .all("*", auth.authInfo)
    .get("/", book.getBook)
    .get("/searchBook", book.searchBook)
    .get("/sortBookByTitle", book.sortBookByTitle)
    .get("/sortBookByDate", book.sortBookByDate)
    .get("/sortBookByGenre", book.sortBookByGenre)
    .get("/sortBookByAvailability", book.sortBookByAvailability)
    .post("/addbook", book.addBook)
    .patch("/:idbook", book.updateBook)
    .patch("/returnBook/:idbook", book.returnBook)
    .patch("/rentBook/:idbook", book.rentBook)
    .delete("/:idbook", book.deleteBook);
    ```
    Merutekan workflow ke bagian `books`.

3. Genre
    ```
    route
    .all("*", auth.authInfo)
    .get("/", genre.getGenre)
    .post("/addgenre", genre.addGenre)
    .patch("/:idgenre", genre.updateGenre)
    .delete("/:idgenre", genre.deleteGenre);
    ```
    Untuk merutekan workflow ke bagian `genre`.

    