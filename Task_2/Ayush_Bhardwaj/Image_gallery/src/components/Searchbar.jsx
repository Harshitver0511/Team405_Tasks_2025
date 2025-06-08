import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';

function Searchbar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length !== 0) {
            navigate(`/searches?query=${encodeURIComponent(search)}`);
        }
    }

    return (
        <div className="sticky top-0 z-20 bg-white flex flex-col items-center mt-0 px-4  pb-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Image Search</h1>
            <form className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-3" onSubmit={handleSubmit}>

                <IconButton
                    component={NavLink}
                    to="/"
                    color="primary"
                    className="mb-4 sm:mb-0"
                >
                    <HomeIcon />
                </IconButton>

                <input
                    type="text"
                    name="search"
                    id="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search images..."
                    className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full sm:w-auto"
                >
                    Search
                </Button>
            </form>
        </div>
    )
}

export default Searchbar
