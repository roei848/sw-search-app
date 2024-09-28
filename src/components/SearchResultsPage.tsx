import React, {useEffect, useState} from 'react';
import axios from "axios";
import SWLoader from "./SWLoader";
import PersonDialog from "./PersonDialog";
import {swapi_base_url} from "../utils/globals";
import {DialogMode, Person} from "../utils/interfaces";
import {AddOutlined, DeleteOutlined, EditOutlined} from "@mui/icons-material";
import '../app.css';


const SearchResultsPage = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<Person>({
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        eye_color: '',
        birth_year: '',
    });
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogMode, setDialogMode] = useState<DialogMode>();
    const category = new URLSearchParams(window.location.search).get('category');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (category === 'people') {
            axios.get(`${swapi_base_url}/people`)
                .then(res => {
                    setPeople(res.data.results);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
    }, [category]);

    const handleDelete = (name: string): void => {
        setPeople((prevPeople) => prevPeople.filter((person) => person.name !== name));
    };

    const handleEdit = (person: Person): void => {
        setSelectedPerson(person);
        setDialogMode('edit');
        setDialogOpen(true);
    };

    const handleCreate = (): void => {
        setSelectedPerson({
            name: '',
            height: '',
            mass: '',
            hair_color: '',
            eye_color: '',
            birth_year: '',
        });
        setDialogMode('create');
        setDialogOpen(true);
    };

    const handleSave = (updatedPerson: Person, dialogMode: DialogMode | undefined): void => {
        if (dialogMode === 'edit') {
            setPeople((prevPeople) =>
                prevPeople.map((person) => (person.name === selectedPerson?.name ? updatedPerson : person))
            );
        } else {
            setPeople([...people, updatedPerson]);
        }
    };

    return (
        <div className="search-results-page-wrapper">
            <h1 className="results-title">{category?.toUpperCase()}</h1>
            {category === 'people' ? isLoading ? (
                <SWLoader/>
            ) : (
                <>
                    {people.length > 0 ? (
                        <>
                            <table className="results-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Height</th>
                                    <th>Mass</th>
                                    <th>Hair Color</th>
                                    <th>Eye Color</th>
                                    <th>Birth Year</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {people.map((person) => (
                                    <tr key={person.name}>
                                        <td>{person.name}</td>
                                        <td>{person.height}</td>
                                        <td>{person.mass}</td>
                                        <td>{person.hair_color}</td>
                                        <td>{person.eye_color}</td>
                                        <td>{person.birth_year}</td>
                                        <td className="actions-column">
                                            <EditOutlined
                                                className="action-icon"
                                                onClick={() => handleEdit(person)}
                                            />
                                            <DeleteOutlined
                                                className="action-icon"
                                                onClick={() => handleDelete(person.name)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="add-new-button" onClick={handleCreate}>
                                <AddOutlined/>
                                <span>Add New</span>
                            </div>
                        </>
                    ) : (
                        <div>No results found</div>
                    )}
                    {dialogOpen && (
                        <PersonDialog
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                            onSave={handleSave}
                            initialPerson={selectedPerson}
                            dialogMode={dialogMode}
                        />
                    )}
                </>
            ) : <></>}
        </div>
    );
};

export default SearchResultsPage;
