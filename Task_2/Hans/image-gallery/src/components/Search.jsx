import React, { useContext } from 'react'
import { Search } from 'lucide-react';
import { ImageContext } from '../contexts/ImageContextProvider';


const SearchList = () => {

  const {inputValue, setInputValue, setSearchQuery, setPage, setSearchTitle} = useContext(ImageContext);

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(inputValue);
    setSearchTitle(inputValue);
    setInputValue('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div 
    className="relative flex h-80 justify-center items-center bg-[url('/bg.jpeg')] bg-cover bg-center shadow-md">

       <h1 className="absolute top-4 left-6 text-4xl font-bold text-white drop-shadow-lg">
        Image Search
      </h1>

        {/* Search Input */}
        <div className="z-20 my-auto relative flex items-center  mx-auto w-full sm:w-1/2 px-10">
            <input value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text" 
                placeholder="Search for images..." 
                className="w-full drop-shadow-lg border text-slate-300 border-gray-500 rounded-lg  p-4 bg-white/30 text-white"/>
            <button onClick={handleSearch} className="ml-[-50px] p-3 bg-white/30 rounded-full backdrop-blur-sm hover:bg-white/50 transition-colors duration-200">
                <Search className="w-5 h-5 text-white" />
            </button>
        </div>
    </div>
  )
}

export default SearchList