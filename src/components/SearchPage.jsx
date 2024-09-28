import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {Search} from "@mui/icons-material";
import {swapi_base_url} from "../utils/globals";
import {Autocomplete, Box, InputAdornment, TextField} from "@mui/material";
import '../app.css';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        axios.get(swapi_base_url).then(res => {
            const categories = Object.keys(res.data)
            setCategories(categories);
        })
    }, []);

    const handleChange = (searchTerm) => {
        setSearchTerm(searchTerm);
        const requests = categories.map((category) =>
            axios.get(`${swapi_base_url}/${category}?search=${searchTerm}`)
                .then(res => ({
                    category,
                    results: res.data.results.slice(0, 3)
                }))
                .catch(err => {
                    console.error(err);
                    return {category, results: []};
                })
        );

        let newOptions = [];

        Promise.all(requests).then((responses) => {
            responses.forEach(response => {
                response.results.forEach((result) => {
                    newOptions.push({
                        ...result,
                        category: response.category,
                    })
                })

                if (response.results.length > 0) {
                    newOptions.push({
                        category: response.category,
                        name: `View all results for ${response.category}`,
                        isViewAll: true,
                    })
                }


            });

            setOptions(newOptions);
        })
    }

    const onSelectViewAll = (category) => {
        navigate(`/category?category=${category}`);
    }

    console.log('options', options);

    const renderOption = (props, option) => {
        if (option.isViewAll) {
            return <Box {...props} className="view-all-option" onClick={() => onSelectViewAll(option.category)}>
                {option.name}
            </Box>
        } else {
            return <Box {...props}>{option.name || option.title}</Box>
        }
    }


    return (
        <div>
            <h1 className="search-page-title">Search For Your Star Wars Hero</h1>
            <div className="search-bar-wrapper">
                <Autocomplete
                    freeSolo
                    options={options}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => option.name || option.title || searchTerm}
                    renderOption={renderOption}
                    onInputChange={(e, value) => handleChange(value)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            className="search-bar-input"
                            placeholder="Search Star Wars Term"
                            disabled={categories.length === 0}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <Search/>
                                    </InputAdornment>
                                ),
                            }}
                        />}
                />
            </div>
        </div>
    );
};


export default SearchPage;
