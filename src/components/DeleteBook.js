import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BookDataService from "../services/BookDataService";
import { Button, ModalBody, ModalDialog, ModalFooter, ModalHeader } from "react-bootstrap";

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

  const getBook = id => {
    BookDataService.get(id)
      .then(response => {
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
        console.log(response.data);
        navigate("/books");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBook ? (
        <ModalDialog>
            <ModalHeader>
                Delete Confirmation
            </ModalHeader>
            <ModalBody>
                <p>Are you sure you want to delete?</p>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="danger" onClick={deleteBook}>Delete</Button>
            </ModalFooter>
        </ModalDialog>
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