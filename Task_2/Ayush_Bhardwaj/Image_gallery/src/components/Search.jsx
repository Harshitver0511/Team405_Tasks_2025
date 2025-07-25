import React, { useState, useEffect, useCallback } from 'react'
import Cards from './Cards'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Search() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const navigate = useNavigate();

    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: query,
                    per_page: 16,
                    page: page,
                },
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`
                }
            });
            setImages(prev => {
                const all = [...prev, ...response.data.results];
                const unique = Array.from(new Map(all.map(img => [img.id, img])).values());
                return unique;
            });
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }, [query, page]);

    useEffect(() => {
        setImages([]);
        setPage(1);
    }, [query]);

    useEffect(() => {
        if (query) fetchImages();
    }, [page, query]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollTop + windowHeight >= docHeight - 10 && !loading) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div>
            <div className="sticky top-0 z-20 bg-white py-5 flex items-center justify-between mb-10 px-5">
                <IconButton color="primary" onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <h1 className="text-2xl font-bold text-center flex-1">
                    Search results for {query}
                </h1>
                {/* Empty div to balance the layout */}
                <div className="w-[70px]"></div>
            </div>

                <Cards images={images} loading={loading} error={error} />
        </div>
    )
}

export default Search
