import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BookDataService from "../services/BookDataService";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

const Book = props => {
  const { id } = useParams();
  
  const initialBookState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");
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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentBook.id,
      title: currentBook.title,
      description: currentBook.description,
      published: status
    };

    BookDataService.update(currentBook.id, data)
      .then(response => {
        setIsLoading(false);
        setCurrentBook({ ...currentBook, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBook = () => {
    BookDataService.update(currentBook.id, currentBook)
      .then(response => {
        setIsLoading(false);
        console.log(response.data);
        setMessage("The book was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  if (isLoading) {
    return(
      <CircularProgress variant="determinate">
        <span className="visually-hidden">Loading...</span>
      </CircularProgress>
    );
  }

  return (
    <div>
      <Box>
      {currentBook ? (
        <div className="edit-form">
          <h4>Book</h4>
          <form>
            <div className="form-group">
              <TextField
                id="title"
                label="Title"
                name="title"
                defaultValue={currentBook.title}
                onChange={handleInputChange}
              />
              <br /><br />
              <TextField
                id="description"
                label="Author"
                name="description"
                defaultValue={currentBook.description}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBook.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBook.published ? (
            <Button
              variant="outlined"
              color="error"
              onClick={() => updatePublished(false)}
            >
              Unpublish
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => updatePublished(true)}
            >
              Publish
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={updateBook}
          >
            Update
          </Button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Book</p>
        </div>
      )}
      </Box>
    </div>
  );
};

export default Book;
