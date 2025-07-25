import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cards from './components/Cards';
import Searchbar from './components/Searchbar';
import Search from './components/Search';
import Specific from './components/Specific';
import axios from 'axios';
import RecomendSearches from './components/RecomendSearches';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);


  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: 'random',
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
  }, [page]);


  useEffect(() => {
    fetchImages();
  }, [fetchImages]);


  
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Searchbar />
          <RecomendSearches />
          <Cards images={images} loading={loading} error={error} />
        </>
      ),
      errorElement: <div>Not Found</div>
    },
    {
      path : "/searches",
      element: (<><Search/></>),
    },
    {
      path: "/images/:id/:search",
      element: (<><Searchbar/><Specific/></>),
    }

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App