import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Search} from '@mui/icons-material';
import {swapi_base_url} from '../utils/globals';
import {Autocomplete, InputAdornment, TextField} from '@mui/material';
import '../app.css';


interface SearchResult {
    category: string;
    name?: string;
    title?: string;
    isViewAll?: boolean;
}


const SearchPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [options, setOptions] = useState<SearchResult[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        axios.get(swapi_base_url).then(res => {
            const categories = Object.keys(res.data);
            setCategories(categories);
        });
    }, []);

    const handleChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setLoading(true);
        const requests = categories.map((category) =>
            axios.get(`${swapi_base_url}/${category}?search=${searchTerm}`)
                .then(res => ({
                    category,
                    results: res.data.results.slice(0, 3),
                }))
                .catch(err => {
                    console.error(err);
                    return {category, results: []};
                })
        );

        let newOptions: SearchResult[] = [];

        Promise.all(requests).then((responses) => {
            responses.forEach((response) => {
                response.results.forEach((result: SearchResult) => {
                    newOptions.push({
                        ...result,
                        category: response.category,
                    });
                });

                if (response.results.length > 0) {
                    newOptions.push({
                        category: response.category,
                        name: `View all results for ${response.category}`,
                        isViewAll: true,
                    });
                }
            });

            setOptions(newOptions);
            setLoading(false);
        });
    };

    const onSelectViewAll = (category: string) => {
        navigate(`/category?category=${category}`);
    };

    const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: SearchResult) => {
        if (option.isViewAll) {
            return (
                <li
                    {...props}
                    key={`${option.category}_${option.name}`}
                    className="view-all-option"
                    onClick={() => onSelectViewAll(option.category)}>
                    {option.name}
                </li>
            );
        } else {
            return(
                <li
                    {...props}
                    key={`${option.category}_${option.name || option.title}`}
                >
                    {option.name || option.title}
                </li>
            );
        }
    };

    return (
        <div>
            <h1 className="search-page-title">Search For Your Star Wars Hero</h1>
            <div className="search-bar-wrapper">
                <Autocomplete
                    freeSolo
                    loading={loading}
                    options={options}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }

                        return option.name || option.title || searchTerm;
                    }}
                    renderOption={renderOption}
                    onInputChange={(e, value) => handleChange(value)}
                    renderInput={(params) => (
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
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default SearchPage;
