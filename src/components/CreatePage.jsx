import React from "react";
import axios from "axios";
import {
    Link,
    useNavigate
    } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from "@mui/material";
import BookDataService from "../services/BookDataService";

const Create = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newBook = Object.fromEntries(formData.entries());
  
      try {
        await BookDataService.create(newBook);
        navigate('/view');
      } catch (error) {
        console.log('Error creating data:', error);
      }
    };
  
    return (
      <div>
        <Typography>
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
        </Typography>
      </div>
    );
  };

export default Create;