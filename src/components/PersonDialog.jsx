import React, { useState, useEffect } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button} from '@mui/material';
import "../app.css"

const PersonDialog = ({ open, onClose, onSave, initialPerson, dialogMode }) => {
    const [person, setPerson] = useState(initialPerson);

    useEffect(() => {
        setPerson(initialPerson);
    }, [initialPerson]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(person, dialogMode);
        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{dialogMode === 'edit' ? 'Edit Person' : 'Create New Person'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={person?.name || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Height"
                    name="height"
                    value={person?.height || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Mass"
                    name="mass"
                    value={person?.mass || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Hair Color"
                    name="hair_color"
                    value={person?.hair_color || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Eye Color"
                    name="eye_color"
                    value={person?.eye_color || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Birth Year"
                    name="birth_year"
                    value={person?.birth_year || ''}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button variant="contained" onClick={() => handleSave(person, dialogMode)}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonDialog;
