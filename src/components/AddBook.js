import React, { useState } from "react";
import BookDataService from "../services/BookDataService";
import { Button, Stack, TextField } from "@mui/material";
import { styled } from '@mui/material/styles'
import Paper from "@mui/material/Paper";

const AddBook = () => {
  
  // initial values for form
  const initialBookState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [book, setBook] = useState(initialBookState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    var data = {
      title: book.title,
      description: book.description
    };

    // get axios call
    BookDataService.create(data)
      .then(response => {
        setBook({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBook = () => {
    setBook(initialBookState);
    setSubmitted(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <h4>Add Book</h4>
    <Stack
      component="form"
      direction="row"
    >
      {submitted ? (
        <Item>
          <h4>You submitted successfully!</h4>
          <Button onClick={newBook}>
            Add
          </Button>
        </Item>
      ) : (
        <div>
          <Item className="form-group">
            <TextField
              required
              id="title"
              label="Title"
              value={book.title}
              onChange={handleInputChange}
              name="title"
            />


            <TextField
              required
              id="description"
              label="Author"
              value={book.description}
              onChange={handleInputChange}
              name="description"
            />
          </Item>
          <Item>
          <Button onClick={saveBook} variant="outlined">
            Submit
          </Button>
          </Item>
        </div>
      )}
    </Stack>
    </div>
  );
};

export default AddBook;