import React, { useState, ChangeEvent } from 'react';
import {DialogMode, Person} from "../utils/interfaces";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import "../app.css";


interface PersonDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (person: Person, dialogMode: DialogMode | undefined) => void;
    initialPerson: Person;
    dialogMode: DialogMode | undefined;
}

const PersonDialog = ({ open, onClose, onSave, initialPerson, dialogMode }: PersonDialogProps) => {
    const [person, setPerson] = useState<Person>(initialPerson);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
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
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonDialog;
