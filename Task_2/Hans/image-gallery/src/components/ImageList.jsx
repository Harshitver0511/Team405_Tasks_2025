import React, { useContext } from 'react'
import ImageItem from './ImageItem'
import { ImageContext } from '../contexts/ImageContextProvider'
import LoadingSkeleton from './LoadingSkeleton'

const ImageList = () => {

  const { images, page, setPage, searchTitle, loading, setSearchQuery, setSearchTitle } = useContext(ImageContext);

  const suggestions = ["Nature", "Cars", "Cats", "Mountains", "Flowers", "Technology", "Travel", "Space", "Food", "Animals", "Sports", "Fashion", "Music", "Art", "Ocean"];

const handleSuggestionClick = (suggestion) => {
    setPage(1);
    setSearchQuery(suggestion);
    setSearchTitle(suggestion);
  };

  return (
    <div className='my-10'>

    <div className='flex flex-wrap justify-center gap-4 mb-8 px-4'>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className='bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded transition-colors duration-200'
          >
            {suggestion}
          </button>
        ))}
      </div>

      {searchTitle && (<h2 className='text-2xl font-bold mb-10 text-center'>
        Showing results for "{searchTitle}"
      </h2>
      )}

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-20">
            {images.map((image) => (
              <ImageItem key={image.id} image={image} />
            ))}
          </div>

          {images.length > 0 && (
            <div className='flex justify-center mt-4 '>
              <button
                onClick={() => setPage(page + 1)}
                className='bg-slate-500 text-white rounded px-4 py-2'>
                Load More Images
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ImageList