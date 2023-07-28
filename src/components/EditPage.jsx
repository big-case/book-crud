import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editData, fetchData } from "../services/api";
import UpdateIcon from '@mui/icons-material/Update';

const Edit = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [ formData, setFormData ] = useState({});
    
    const { data: currentItem, isLoading } = useQuery(['books', id], async () => {
        const response = await fetchData(id);
        return response.data;
        });

    const editBook = useMutation(
        (updatedItem) => editData(id, updatedItem),
        {
            onMutate: (updatedItem) =>{
                queryClient.setQueryData(['books', id], updatedItem);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['books']);
                navigate('/view');
            }
        }
    );

    useEffect(() => {
        if(!isLoading) {
            setFormData(currentItem);
        }
    }, [currentItem, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editBook.mutate(formData);
        setButtonDisabled(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isLoading) {
        return <LinearProgress />
    }
    return (
        <div>
            <Typography>
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:'12px' }}>
                    <TextField
                        size="small"
                        label="Title"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <TextField
                        size="small"
                        label="description"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                </div>
                <Button size="small" variant="outlined" type="submit" disabled={buttonDisabled}>Update &nbsp; <UpdateIcon/></Button>
            </form>
            </Typography>
        </div>
    );
};

export default Edit;