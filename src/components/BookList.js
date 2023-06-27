import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookDataService";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Box, Button, CircularProgress, Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";


const BooksList = props => {
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  
  const [isLoading, setIsLoading] = useState(true); // Loading State
  
  // for Pagination
  const [currentPage, setCurrentPage] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const entryPerPage = 4;

  useEffect(() => {
    const endOffset = offset + entryPerPage;
    setCurrentPage(books.slice(offset, endOffset))
    setPageCount(Math.ceil(books.length / entryPerPage));
  }, [books, offset]);

  useEffect(() => {
    retrieveBooks();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * entryPerPage) % books.length;
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

  // Searching module
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
      <CircularProgress animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </CircularProgress>
    );
  }

  return (
    <div>
      <Box>
      <div className="col-md-8">
        <div className = "input-group mb-3">
          <TextField
            fullWidth
            label="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
            size="small"
          />
          <div>
            <Button
              variant="outlined"
              onClick={findByTitle}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      </Box>
      <Box>
        <h4>Books List</h4>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell colSpan={2} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        {currentPage && currentPage.map((currentPage, index) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell>{currentPage.id}</TableCell>
              <TableCell>{currentPage.title}</TableCell>
              <TableCell>{currentPage.description}</TableCell>
              <TableCell align="center">
                <Link
                  to={"/books/" + currentPage.id}
                >
                  <Button variant="outlined" size="small">
                    Update
                  </Button>
                </Link>
              </TableCell>
              <TableCell align="center">
                <Link
                  to={"/books/delete/" + currentPage.id}
                >
                <Button variant="outlined" color="error" size="small">
                  Delete
                </Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
          ))}
          <TableFooter>
            <TableCell colSpan={4}>
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
      </TableCell>
          </TableFooter>
        </Table>
        </TableContainer>
        
      </Box>
      
    </div>
  );
};



export default BooksList;
