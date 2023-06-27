import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BookDataService from "../services/BookDataService";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from "@mui/material";

const Book = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialBookState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [isLoading, setIsLoading] = useState(true);

  const getBook = id => {
    BookDataService.get(id)
      .then(response => {
        setIsLoading(false);
        setCurrentBook(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getBook(id);
  }, [id]);

  const handleClose = () => {
    navigate("/books");
  };

  const deleteBook = () => {
    BookDataService.remove(currentBook.id)
      .then(response => {
        setIsLoading(false);
        console.log(response.data);
        navigate("/books");
      })
      .catch(e => {
        console.log(e);
      });
  };

  if (isLoading) {
    return(
      <CircularProgress color="inherit">
        <span className="visually-hidden">Loading...</span>
      </CircularProgress>
    );
  }

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      {currentBook ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby = "alert-dialog-title"
          aria-describedby = "alert-dialog-description">
            <DialogTitle>
                Delete Confirmation
            </DialogTitle>
            <DialogContent>
                <DialogContentText id = "alert-dialog-description">Are you sure you want to delete?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Close</Button>
                <Button variant="outlined" onClick={deleteBook} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
      ) : (
        <div>
          <br />
          <p>Please click on a Book</p>
        </div>
      )}
    </div>
  );
};

export default Book;