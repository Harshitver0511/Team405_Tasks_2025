import React, { useState, useEffect, useCallback } from 'react'
import Cards from './Cards'
import axios from 'axios'
import { useParams} from 'react-router-dom'

function Specific() {
    const { id, search } = useParams();
    console.log(id, search);
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!id) return;
        const fetchImage = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`
                    }
                });
                setImage(response.data);
                setLoading(false);
            } catch (err) {
                setError('Image not found');
                setLoading(false);
            }
        };
        fetchImage();
    }, [id]);

    const fetchImages = useCallback(async () => {
        if (!search) return;
        setLoading(true);
        try {
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: decodeURIComponent(search),
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
    }, [search, page]);


    useEffect(() => {
        setImages([]);
        setPage(1);
    }, [search]);


    useEffect(() => {
        if (search) fetchImages();
    }, [page, search, fetchImages]);


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
            {loading && <div className="flex justify-center items-center h-64">Loading...</div>}
            {error && <div className="flex justify-center items-center h-64">{error}</div>}
            {image && (
                <div className="flex flex-col items-center mt-8">
                    <img src={image.urls?.regular} alt={image.alt_description} className="rounded shadow max-w-full max-h-[70vh]" />
                    <h2 className="text-xl font-bold mt-4">{image.alt_description || 'No description'}</h2>
                    <p className="text-gray-600 mt-2">By {image.user?.name}</p>
                </div>
            )}
            <div className="mt-20 bg-white py-5 flex items-center justify-between mb-10 px-5">
                <h1 className="text-2xl font-bold text-center flex-1">
                    You may also like ...
                </h1>
            </div>
            {search && <Cards images={images} loading={loading} error={error} />}
        </div>
    )
}

export default Specific
