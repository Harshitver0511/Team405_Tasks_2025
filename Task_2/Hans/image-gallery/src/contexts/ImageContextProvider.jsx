import React, { createContext, use, useEffect, useState } from 'react'
import axios from 'axios';

export const ImageContext = createContext()

const ImageContextProvider = ({ children }) => {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://api.unsplash.com/search/photos'
  const IMAGES_PER_PAGE = 20;


  const fetchImages = async (term, page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?query=${term}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`  
      );
      if (page === 1) {
        setImages(response.data.results);
      } else {
        setImages((preImages) => [...preImages, ...response.data.results]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }

  // Default pics
  useEffect(() => {
    fetchImages('nature', 1);
  }, [])

  useEffect(() => {
    if (searchQuery) {
      fetchImages(searchQuery, page);
    }
  }, [searchQuery, page]);

  return (
    <ImageContext.Provider value={{ 
      images,
      page,
      setPage,
      inputValue,
      setInputValue,
      setSearchQuery,
      searchTitle,
      setSearchTitle,
      loading,
      }}>

      {children}
    </ImageContext.Provider>
  )
}

export default ImageContextProvider