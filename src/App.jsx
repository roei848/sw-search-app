import React from 'react';
import {
    BrowserRouter,
    Route,
    Router,
    Routes,
} from 'react-router-dom';
import './app.css';
import SearchPage from "./components/SearchPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                {/*<Route path="/search" element={<SearchResultsPage />} />*/}
            </Routes>
        </BrowserRouter>
    );
};


export default App;
