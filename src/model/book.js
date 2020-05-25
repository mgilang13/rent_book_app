const connection = require("../config/db");

module.exports = {
  bookCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as totalbooks FROM books",
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.log(error);
            reject(new Error(error));
          }
        }
      );
    });
  },
  getAllBook: (search, offset, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.title, b.author, b.description, b.image_url, b.date_released, g.name as genre, a.status as availability FROM books as b INNER JOIN genres as g ON b.id_genre = g.id INNER JOIN availability as a ON b.available = a.id WHERE b.title LIKE CONCAT('%', ?, '%') ORDER BY b.title ASC LIMIT ?, ?;",
        [search, offset, limit],
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
  showBookReturn: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.*, date_format(b.date_released, '%W, %D %M %Y') as df, g.name FROM books AS b INNER JOIN genres AS g ON b.id_genre = g.id INNER JOIN availability AS a ON b.available = a.id WHERE b.available = 1",
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

  addBook: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO books SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.log(err);
          reject(new Error(err));
        }
      });
    });
  },
  updateBook: (data, idBook) => {
    // console.log(id)
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE books SET ? WHERE id = ?",
        [data, idBook],
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
  showBookById: (idBook) => {
    return new Promise((resolve, reject) => {
      connection.query(
        // "SELECT b.id, b.title, b.author, b.description, b.image_url, b.date_released, g.name as genre, a.status as availability FROM books as b INNER JOIN genres as g ON b.id_genre = g.id INNER JOIN availability as a ON b.available = a.id WHERE b.id = ?",
        " SELECT *, date_format(b.date_released, '%W, %D %M %Y') as df FROM books AS b INNER JOIN genres AS g ON b.id_genre = g.id INNER JOIN availability AS a ON b.available = a.id WHERE b.id = ?",
        idBook,
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
  deleteBook: (idbook) => {
    console.log(idbook);
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM books WHERE id = ?",
        idbook,
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
  checkAvailabilityBook: (idbook) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM books WHERE id = ?",
        idbook,
        (err, result) => {
          resolve(result);
        }
      );
    });
    // return 0;
  },
  rentBook: (availability, idBook) => {
    // console.log(id)
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE books SET available = ? WHERE id = ?",
        [availability, idBook],
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
  returnBook: (availability, idBook) => {
    // console.log(id)
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE books SET available = ? WHERE id = ?",
        [availability, idBook],
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
  searchBook: (keyword) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.title, b.author, b.description, b.image_url, b.date_released, g.name as genre, a.status as availability FROM books as b INNER JOIN genres as g ON b.id_genre = g.id INNER JOIN availability as a ON b.available = a.id WHERE b.title LIKE CONCAT('%', ?, '%')",
        keyword,
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
  sortBookByTitle: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.title, b.author, b.description, b.image_url, b.date_released, g.name as genre, a.status as availability FROM books as b INNER JOIN genres as g ON b.id_genre = g.id INNER JOIN availability as a ON b.available = a.id ORDER BY title;",
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  sortBookByDate: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.title, b.author, b.description, b.image_url, b.date_released, g.name as genre, a.status as availability FROM books as b INNER JOIN genres as g ON b.id_genre = g.id INNER JOIN availability as a ON b.available = a.id ORDER BY date_released;",
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
  sortBookByGenre: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.title, b.author, b.description, b.image_url, b.date_released, g.name as genre, a.status as availability FROM books as b INNER JOIN genres as g ON b.id_genre = g.id INNER JOIN availability as a ON b.available = a.id ORDER BY genre;",
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
  sortBookByAvailability: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.title, b.author, b.description, b.image_url, b.date_released, g.name as genre, a.status as availability FROM books as b INNER JOIN genres as g ON b.id_genre = g.id INNER JOIN availability as a ON b.available = a.id ORDER BY availability;",
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
};
