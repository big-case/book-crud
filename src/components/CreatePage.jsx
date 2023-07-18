import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
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
            <div style={{ marginLeft: '8px' }}>
            <Button variant='contained' color='inherit'>
              Home
            </Button>
            </div>
          </Link>
          <Link to="/view">
            <div style={{ marginLeft: '8px' }}>
            <Button variant='contained' color='inherit'>
              View
            </Button>
            </div>
          </Link>
          <Link to="/create">
            <div style={{ marginLeft: '8px' }}>
            <Button variant='contained' color='inherit'>
              Create
            </Button>
            </div>
          </Link>
        </Toolbar>
      </AppBar>
        <h2>Create Entry</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <TextField label="title" name="title" required />
          </div>
          <div style={{ marginBottom: '12px' }}>
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