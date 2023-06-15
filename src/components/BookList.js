import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookDataService";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const BooksList = props => {
  const [books, setBooks] = useState([]);
  // const [currentBook, setCurrentBook] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  // const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    retrieveBooks();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBooks = () => {
    BookDataService.getAll()
      .then(response => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // [NOT USED]
  const refreshList = () => {
    retrieveBooks();
    // setCurrentBook(null);
    // setCurrentIndex(-1);
  };


  // [NOT USED]
  // const removeAllBooks = () => {
  //   BookDataService.removeAll()
  //     .then(response => {
  //       console.log(response.data);
  //       refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const findByTitle = () => {
    BookDataService.findByTitle(searchTitle)
      .then(response => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className = "input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-link"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Books List</h4>

        <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            {/* <th>Status</th> */}
            <th colSpan={2}>Actions</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        {books && books.map((book, index) => (
          <tbody>
            <tr key={index}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              {/* <td>{book.published}</td> */}
              <td><Link
                  to={"/books/" + book.id}
                  className="btn btn-sm btn-primary"
                  >
                  Update
              </Link></td>
              <td><Link
                  to={"/books/delete/" + book.id}
                  className="btn btn-sm btn-danger"
                  >
                  Delete
              </Link></td>
            </tr>
          </tbody>
          ))}
        </Table>

        {/* <ul className="list-group">
          {books &&
            books.map((book, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBook(book, index)}
                key={index}
              >
                {book.title}
              </li>
            ))}
        </ul> */}

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBooks}
        >
          Remove All
        </button> */}
      </div>
      {/* <div className="col-md-6">
        {currentBook ? (
          <div>
            <h4>Book</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBook.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBook.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBook.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/books/" + currentBook.id}
              className="m-3 btn btn-sm btn-primary"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book.</p>
          </div>
        )}
      </div> */}
    </div>
  );
};



export default BooksList;
