import React from "react";
import axios from "axios";
import {
    Link,
    useNavigate
    } from "react-router-dom";
import {
    AppBar,
    Button,
    TextField,
    Toolbar
    } from "@mui/material";

const Create = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newBook = Object.fromEntries(formData.entries());
  
      try {
        await axios.post('http://localhost:3003/books', newBook);
        navigate('/view');
      } catch (error) {
        console.log('Error creating data:', error);
      }
    };
  
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Link to="/">
              <Button variant='contained' color='success'>
                Home
              </Button>
            </Link>
            <Link to="/view">
              <Button variant='contained' color='success'>
                View
              </Button>
            </Link>
            <Link to="/create">
              <Button variant='contained' color='success'>
                Create
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <h2>Create Entry</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField label="title" name="title" required />
          </div>
          <div>
            <TextField label="description" name="description" required />
          </div>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    );
  };

export default Create;