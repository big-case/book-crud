import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookDataService";
import { Link } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";


const BooksList = props => {
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  
  const [isLoading, setIsLoading] = useState(true); // Loading State
  
  // for Pagination
  const [currentPage, setCurrentPage] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const endOffset = offset + 5;
      setCurrentPage(books.slice(offset, endOffset))
    setPageCount(Math.ceil(books.length / 5));
  }, [books, offset]);

  useEffect(() => {
    retrieveBooks();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % books.length;
    setOffset(newOffset);
  }

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

  // For Loading State
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
            <th>#ID</th>
            <th>Title</th>
            <th>Description</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        {currentPage && currentPage.map((currentPage, index) => (
          <tbody>
            <tr key={index}>
              <td>{currentPage.id}</td>
              <td>{currentPage.title}</td>
              <td>{currentPage.description}</td>
              {/* <td>{book.published}</td> */}
              <td><Link
                  to={"/books/" + currentPage.id}
                  className="btn btn-sm btn-primary"
                  >
                  Update
              </Link></td>
              <td><Link
                  to={"/books/delete/" + currentPage.id}
                  className="btn btn-sm btn-danger"
                  >
                  Delete
              </Link></td>
            </tr>
          </tbody>
          ))}
        </Table>
        
      </div>
      <div className="pagination">
          <ReactPaginate
            breakLabel = "..."
            nextLabel = "Next >"
            onPageChange = {handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel = "< Prev"
            renderOnZeroPageCount={null}
            breakClassName="page-item"
            breakLinkClassName="pagination"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
      </div>
    </div>
  );
};



export default BooksList;
