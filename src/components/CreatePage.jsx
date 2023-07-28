import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createData } from "../services/api";

const Create = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const addNewBook = useMutation((newBook) => createData(newBook), {
      onSuccess: () => {
        queryClient.invalidateQueries(['books']);
        navigate('/view');
      },
      onError: (error, newItem, context) => {
        queryClient.setQueryData('books', context);
      },
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      addNewBook.mutate(formData);
      setButtonDisabled(true);
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    return (
      <div>
        <Typography>
        <h2>Create Entry</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <TextField label="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <TextField label="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <Button type="submit" disabled={buttonDisabled}>Create</Button>
          </div>
        </form>
        </Typography>
      </div>
    );
  };

export default Create;