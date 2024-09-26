import React, {useEffect} from 'react';
import {Autocomplete, InputAdornment, TextField} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from 'axios';
import '../app.css';

const base_url = 'https://swapi.dev/api'

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        axios.get(base_url).then(res => {
            const categories = Object.keys(res.data)
            console.log(categories);
            setCategories(categories);
        })
    }, []);

    const handleChange = (searchTerm) => {
        setSearchTerm(searchTerm);
        console.log(searchTerm)

        const requests = categories.map((category) =>
            axios.get(`${base_url}/${category}?search=${searchTerm}`)
                .then(res => ({
                    category,
                    results: res.data.results.slice(0, 3)
                }))
                .catch(err => {
                    console.error(err);
                    return { category, results: [] };
                })
        );

        Promise.all(requests).then((responses) => {
            let newOptions = [];

            responses.forEach(response => {
                response.results.forEach((result) => {
                    newOptions.push({
                        ...result,
                        category: response.category,
                    })
                })


                // return {
                //     results: response.results || [],
                //     category: response.category
                // }
                // newOptions[response.category] = response.results;
            });

            setOptions(newOptions);
        })
    }


    console.log('options', options);



    return (
        <div>
            <h1>Search For Your Star Wars Hero</h1>
            <div className="search-bar-wrapper">
                {/*<Autocomplete*/}
                {/*    className={classes.autoComplete}*/}
                {/*    multiple*/}
                {/*    options={props.supportedApplicationSources}*/}
                {/*    value={sources}*/}
                {/*    onChange={handleSourcesChanged}*/}
                {/*    renderInput={(params) => (*/}
                {/*        <TextField*/}
                {/*            {...params}*/}
                {/*            variant="outlined"*/}
                {/*            label="Sources"*/}
                {/*            placeholder="Sources"*/}
                {/*        />*/}
                {/*    )}*/}
                {/*/>*/}



                <Autocomplete
                    options={options}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => option.name || option.title}
                    // value={searchTerm}
                    // onChange={(e) => handleChange(e.target.value)}
                    // sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                        {...params}
                        className="search-bar-input"
                        placeholder="Search Star Wars Term"
                        // disabled={categories.length === 0}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <Search />
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
