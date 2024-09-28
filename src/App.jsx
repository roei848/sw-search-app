import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import SearchPage from "./components/SearchPage";
import SearchResultsPage from "./components/SearchResultsPage";
import './app.css';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage/>}/>
                <Route path="/category" element={<SearchResultsPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};


export default App;
