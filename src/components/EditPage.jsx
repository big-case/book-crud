import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import BookDataService from "../services/BookDataService";

const Edit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BookDataService.get(`${id}`);
                const { title, description } = response.data;
                setTitle(title);
                setDescription(description);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching item data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await BookDataService.update(`${id}`, { title, description });
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
            <h2>Edit Item</h2>
            <form onSubmit={handleUpdate}>
                <div style={{ marginBottom:'12px' }}>
                    <TextField
                        size="small"
                        label="Title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '12px' }}>
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
            </Typography>
        </div>
    );
};

export default Edit;