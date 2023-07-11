import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Link,
    useParams
    } from "react-router-dom";
import {
    AppBar,
    Button,
    LinearProgress,
    TextField,
    Toolbar
    } from "@mui/material";

const Edit = () => {
    const { id } = useParams();
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [loading, setLoading] = useState(true);
  
      useEffect(() =>{
          const fetchData = async () => {
              try {
                  const response = await axios.get(`http://localhost:3003/books/${id}`);
                  const { title, description } = response.data;
                  setTitle(title);
                  setDescription(description);
                  setLoading(false);
              }
           catch (error) {
              console.log('Error fetching item data:', error);
              }
          };
          fetchData();
      }, [id]);
  
      const handleUpdate = async (e) => {
          e.preventDefault();
          try {
              await axios.put(`http://localhost:3003/books/${id}`, { title, description });
              navigate('/view');
          } catch (error) {
              console.log('Error updating item:', error);
          }
      };

      if (loading) {
        return <LinearProgress />
      }
  
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
              <h2>Edit Item</h2>
              <form onSubmit={handleUpdate}>
                  <div>
                      <TextField
                          size="small"
                          label="Title"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                      />
                  </div>
                  <div>
                      <TextField
                          size="small"
                          label="description"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      />
                  </div>
                  <Button size="small" variant="outlined" type="submit">Update</Button>
              </form>
          </div>
      );
  };

export default Edit;