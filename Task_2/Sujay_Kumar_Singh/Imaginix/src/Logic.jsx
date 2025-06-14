import React, { useEffect, useState } from 'react';
const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;


const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('nature');

    useEffect(() => {

        if(query.trim().length >0){
        const fetchImages = async () => {
            try {
                const response = await fetch(
                    `https://api.unsplash.com/search/photos?query=${query}&per_page=15`,
                    {
                        headers: {
                            Authorization: `Client-ID ${apiKey}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }

                const data = await response.json();
                setImages(data.results);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }}, [query]);

    const trigger = ()=> {
        const inputs = document.getElementById('input').value;
        setQuery(inputs);
    }
    return (
        <div>
             <div  class="flex justify-center">
      <input id='input' class="focus:outline-0 md:w-lg bg-gray-100 md:h-13 p-4 rounded-l-xl" type="text" placeholder="Search an Image"/>
      <button onClick={trigger} class="md:h-13 bg-sky-600 w-17 rounded-r-xl  hover:text-shadow-md hover:bg-gray-100 text-shadow-purple-300 text-lg">🔍</button>
      
    </div>
           <div class="flex  mt-20  md:gap-10 gap-3 justify-center flex-wrap  "> 
            <button class="btn" onClick={()=>setQuery('Nature')}>Nature</button>
            <button class="btn" onClick={()=>setQuery('Film')}>Film</button>
            <button class="btn" onClick={()=>setQuery('people')}>People</button>
            <button class="btn" onClick={()=>setQuery('animal')}>Animal</button>
            <button class="btn" onClick={()=>setQuery('food')}>Food</button>
            <button class="btn" onClick={()=>setQuery('flowers')}>Flowers</button>
            <button class="btn" onClick={()=>setQuery('Rajputs')}>Rajputs</button>
            <button class="btn" onClick={()=>setQuery('Bihar')}>Bihar</button>
            <button class="btn" onClick={()=>setQuery('India')}>India</button>
            <button class="btn" onClick={()=>setQuery('BMW')}>BMW</button>
           </div>
            <div class="flex gap-4 flex-wrap w-full justify-center mt-17 " >
                {images.map((img) => (
                    <img
                        key={img.id}
                        src={img.urls.small}
                        alt={img.alt_description}
                        style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
