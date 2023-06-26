import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BookDataService from "../services/BookDataService";
import { Spinner } from "react-bootstrap";

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
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>Book</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBook.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBook.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBook.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBook.published ? (
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={() => updatePublished(false)}
            >
              Unpublish
            </button>
          ) : (
            <button
              className="m-3 btn btn-sm btn-success"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            type="submit"
            className="m-3 btn btn-sm btn-primary"
            onClick={updateBook}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
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