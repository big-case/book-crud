import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookDataService";
import { Link } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";


const BooksList = props => {
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        setBooks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BookDataService.findByTitle(searchTitle)
      .then(response => {
        setIsLoading(false);
        setBooks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

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
              className="btn btn-outline-success"
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
      </div>
    </div>
  );
};



export default BooksList;
