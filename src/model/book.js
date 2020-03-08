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
            reject(new Error(error));
          }
        }
      );
    });
  },
  getAllBook: (offset, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT books.id, title, description, image_url, date_released, name as genre, status as availability FROM books, genres, availability WHERE books.id_genre = genres.id AND books.available = availability.id LIMIT ?, ?;",
        [offset, limit],
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
  addBook: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO books SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
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
  deleteBook: idbook => {
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
  checkAvailabilityBook: idbook => {
    console.log(idbook);
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT available FROM books WHERE id = ?",
        idbook,
        (err, result) => {
          resolve(result);
          console.log("jjj", result);
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
  searchBook: keyword => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT books.id, title, description, image_url, date_released, name as genre, status FROM books, genres, availability WHERE books.id_genre = genres.id AND books.available = availability.id AND title LIKE CONCAT('%',?,'%');",
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
        "SELECT books.id, title, description, image_url, date_released, name as genre, status FROM books, genres, availability WHERE books.id_genre = genres.id AND books.available = availability.id ORDER BY title;",
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

  sortBookByDate: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT books.id, title, description, image_url, date_released, name as genre, status FROM books, genres, availability WHERE books.id_genre = genres.id AND books.available = availability.id ORDER BY date_released;",
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
        "SELECT books.id, title, description, image_url, date_released, name as genre, status FROM books, genres, availability WHERE books.id_genre = genres.id AND books.available = availability.id ORDER BY genre;",
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
        "SELECT books.id, title, description, image_url, date_released, name as genre, status FROM books, genres, availability WHERE books.id_genre = genres.id AND books.available = availability.id ORDER BY status;",
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
