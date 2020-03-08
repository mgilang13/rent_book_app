const book = require("../model/book");
const response = require("../helper/response");
module.exports = {
  getBook: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    // const search = req.query.search || "";
    // const sortBy = req.query.sortBy || "title";
    // const sort = req.query.sort || "DESC";
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    book
      .bookCount()
      .then(result => {
        let total = result[0].totalbooks;
        console.log(total);
        const prevPage = page === 1 ? 1 : page - 1;
        const nextPage = page === total ? total : page + 1;
        console.log(prevPage);
        console.log(nextPage);

        book
          .getAllBook(offset, limit)
          .then(data => {
            let pageDetail = {
              total: Math.ceil(total),
              per_page: limit,
              current_page: page,
              nextLink: `http://localhost:3000${req.originalUrl.replace(
                "page=" + page,
                "page=" + nextPage
              )}`,
              prevLink: `http://localhost:3000${req.originalUrl.replace(
                "page=" + page,
                "page=" + prevPage
              )}`
            };
            console.log(pageDetail.nextLink);
            if (data[1] === undefined) {
              response.responseP(
                res,
                "Data is not found",
                404,
                true,
                pageDetail,
                data
              );
            } else {
              for (i = 0; i < data.length; i++) {
                data[i].date_released = data[i].date_released
                  .toGMTString()
                  .slice(0, 16);
              }
              response.responseP(res, "OK", 200, false, pageDetail, data);
            }
          })
          .catch(err => {
            console.log(err);
            response.response(res, null, 404, "Data not found");
          });
      })
      .catch(error => {
        helper.response(res, null, 404, "Data is not found");
        console.log(error);
      });
  },
  addBook: (req, res) => {
    let data = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      id_genre: req.body.id_genre,
      available: req.body.available
    };

    book
      .addBook(data)
      .then(result => {
        response.response(res, result);
      })
      .catch(err => {
        response.response(res, null, 401, "Something Wrong");
      });
  },
  updateBook: (req, res) => {
    const idbook = req.params.idbook;
    const data = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      id_genre: req.body.id_genre,
      available: req.body.available
    };
    book
      .updateBook(data, Number(idbook))
      .then(result => {
        if (result.affectedRows == 0) {
          response.response(res, null, 404, "Id of book Not found");
        } else {
          response.response(res, result);
        }
      })
      .catch(err => {
        console.log(err);
        response.response(res, null, 404, "Id Book Not found");
      });
  },
  deleteBook: (req, res) => {
    const idbook = req.params.idbook;
    book
      .deleteBook(Number(idbook))
      .then(result => {
        if (result.affectedRows == 0) {
          response.response(res, null, 404, "Id of book Not found");
        } else {
          response.response(res, result);
        }
      })
      .catch(err => {
        console.log(err);
        response.response(res, null, 404, "Id of book Not found");
      });
  },
  rentBook: (req, res) => {
    const idbook = req.params.idbook;
    const availability = 0;

    book.checkAvailabilityBook(idbook).then(i => {
      if (i[0].available === 0) {
        response.response(res, null, 405, "Book is borrowed");
      } else {
        book
          .rentBook(availability, Number(idbook))
          .then(result => {
            response.response(res, result);
          })
          .catch(err => {
            console.log(err);
            response.response(res, null, 404, "Id Book Not found");
          });
      }
    });
  },
  returnBook: (req, res) => {
    const idbook = req.params.idbook;
    const availability = 1;

    book.checkAvailabilityBook(idbook).then(i => {
      if (i[0].available === 1) {
        response.response(res, null, 405, "Book is still ready to borrow");
      } else {
        book
          .returnBook(availability, Number(idbook))
          .then(result => {
            response.response(res, result);
          })
          .catch(err => {
            console.log(err);
            response.response(res, null, 404, "Id Book Not found");
          });
      }
    });
  },
  searchBook: (req, res) => {
    const keyword = req.query.keyword;
    book
      .searchBook(keyword)
      .then(result => {
        for (i = 0; i < result.length; i++) {
          result[i].date_released = result[i].date_released
            .toGMTString()
            .slice(0, 16);
        }
        response.response(res, result, 200, null);
      })
      .catch(err => {
        console.log(err);
        response.response(res, null, 404, "Data is not found");
      });
  },
  sortBookByTitle: (req, res) => {
    book
      .sortBookByTitle()
      .then(result => {
        for (i = 0; i < result.length; i++) {
          result[i].date_released = result[i].date_released
            .toGMTString()
            .slice(0, 16);
        }
        response.response(res, result, 200, null);
      })
      .catch(error => {
        console.log(error);
        response.response(res, null, 404, "Data is not found");
      });
  },
  sortBookByDate: (req, res) => {
    book
      .sortBookByDate()
      .then(result => {
        for (i = 0; i < result.length; i++) {
          result[i].date_released = result[i].date_released
            .toGMTString()
            .slice(0, 16);
        }
        response.response(res, result, 200, null);
      })
      .catch(error => {
        console.log(error);
        response.response(res, null, 404, "Data is not found");
      });
  },
  sortBookByGenre: (req, res) => {
    book
      .sortBookByGenre()
      .then(result => {
        for (i = 0; i < result.length; i++) {
          result[i].date_released = result[i].date_released
            .toGMTString()
            .slice(0, 16);
        }
        response.response(res, result, 200, null);
      })
      .catch(error => {
        console.log(error);
        response.response(res, null, 404, "Data is not found");
      });
  },
  sortBookByAvailability: (req, res) => {
    book
      .sortBookByAvailability()
      .then(result => {
        for (i = 0; i < result.length; i++) {
          result[i].date_released = result[i].date_released
            .toGMTString()
            .slice(0, 16);
        }
        response.response(res, result, 200, null);
      })
      .catch(error => {
        console.log(error);
        response.response(res, null, 404, "Data is not found");
      });
  }
};
