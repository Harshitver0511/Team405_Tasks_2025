import React, { useState, useEffect } from 'react'
import Card from './components/card';

const App = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

   const searchImage = async (e) => {
    e.preventDefault();
    fetchImages(query);
    };

    const fetchImages = async (q) => {
         console.log('we are here');
        if (!q.trim()) return;
        setIsLoading(true);
        try {
            const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&client_id=iNioFG647vdcAh6vmXkZdct4IV8ircM2Qn4OhDfGsLY`);
            const data = await res.json();
            console.log("data", data.results);
            if (data.results.length > 0) {
                setImages(data.results);
            }
        } catch (error) {
            console.log('Error in fetching Image: ', error);
            alert("API error");
        }
        setIsLoading(false);
    };


    const queryset = async (e) => {
        const newQuery = e.currentTarget.innerText;
        setQuery(newQuery);
        fetchImages(newQuery);
        }
  return (
        <>
        <div className='p-2'>
            <h2 className='text-2xl'>Image Search</h2>
            <form onSubmit={searchImage}>
                <input
                    onChange={(e) =>{ setQuery(e.target.value)}}
                    value={query}
                    placeholder='Search images...'
                    type="text" 
                    className='w-full border rounded px-2 py-1 mt-3 '
                />
            </form>
        </div>
        <div className='p-2 flex flex-wrap justify-around'>
            <div onClick={(e) => {queryset(e)}} className='bg-red-600 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Books</div>
            <div onClick={(e) => {queryset(e)}} className='bg-green-500 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Nature</div>
            <div onClick={(e) => {queryset(e)}} className='bg-blue-500 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Films</div>
            <div onClick={(e) => {queryset(e)}} className='bg-yellow-400 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Animals</div>
            <div onClick={(e) => {queryset(e)}} className='bg-indigo-500 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>People</div>
            <div onClick={(e) => {queryset(e)}} className='bg-violet-500 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Food</div>
            <div onClick={(e) => {queryset(e)}} className='bg-pink-500 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Sports</div>
            <div onClick={(e) => {queryset(e)}} className='bg-gray-500 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Wallpaper</div>
            <div onClick={(e) => {queryset(e)}} className='bg-cyan-500 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Flower</div>
            <div onClick={(e) => {queryset(e)}} className='bg-orange-400 mt-4 w-[45vw] sm:w-[8vw] sm:px-2 flex items-center justify-center rounded sm:text-[1.6vw]'>Valentine</div>
        </div>
         {isLoading && <p>Loading...</p>}
        <div className='w-full flex justify-around flex-wrap mt-5'>
            {
                images.length > 0 ? (
                    images.map((img, index) => (
                        <Card key={index} Url={img.urls.full} />
                    ))
                ) : (
                    <p className='text-gray-500 mt-4'>No images found</p>
                )
            }
        </div>
        </>
  )
}

export default App;