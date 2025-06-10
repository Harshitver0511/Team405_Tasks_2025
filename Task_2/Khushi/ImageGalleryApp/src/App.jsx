import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'
import TopBar from './Components/TopBar';

function App() {
  //Storing the api URL
  const URL = "https://api.unsplash.com/search/photos";
  const searchBox = useRef(null); //to get the reference of input-search
  const per_page = 30;
  const [images,setImages] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  //Function to get images from api link
  const getImages = useCallback(async() => {
    try {
      if(searchBox.current.value){
        setErrorMsg('');
        setLoading(true);
        const response = await fetch(`${URL}?page=${page}&query=${searchBox.current.value}&per_page=${per_page}&client_id=${import.meta.env.VITE_API_KEY}`); //VITE_API_Key is the access key of the api
        const data = await response.json();
        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {//incase if any error arises in fetching images
      setErrorMsg("Error in fetching images....!");
      setLoading(false);
    }
  },[page]) //everytime page changes the getImages function get redefined

  useEffect(() => {
   getImages();
  },[getImages])

  //function to handle the input passed by the user
  const searchHandler = (event) => {
    event.preventDefault();
    console.log(searchBox.current.value);
    setPage(1);
    getImages();
  }

  //to get the images from the suggestions
  const Select = (text) =>{
    searchBox.current.value = text;
    setPage(1);
    getImages();
  }
  return (
  <div className="px-8 md:px-20">
    <div>
    <h2 className="font-bold md:text-4xl py-4 text-2xl">Image Search</h2>

    {/* For the error msg if present */}
    {errorMsg ?(
      <h3 className='text-center text-red-600 text-xl'>${errorMsg}</h3>) : null
    }

    {/* form for taking input */}
    <form className="text-center" onSubmit={searchHandler}>
    <input type="text"
     id="input"  
     className="border border-gray-200 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 focus:bg-gray-100 block w-full p-2.5"
      placeholder="Search images"
      ref={searchBox}
      />
    </form>
  </div>

  {/* To display the top suggestions this Topbar component is defined */}
   <TopBar onSelect={Select} />

   {/* Till images are getting fetched */}
   {loading? <p className='text-3xl text-center'>Loading Images....</p>: null}

   {/* To display the images */}
   <div className='flex flex-wrap justify-evenly'>
    {images ? images.map((image) => (
      <img
      key={image.id}
      src={image.urls.small}
      alt={image.alt_description}
      className="rounded mb-2 w-[45%] md:w-[32%]"
      />
    )) : null}
   </div>

    <div className="flex justify-center m-5">

      {/* Button to get the previous page */}
      {page>1 && (
        <button className="border-blue-800 rounded py-2 px-4 bg-blue-800 mx-4 text-white cursor-pointer" onClick={() => setPage(page-1)}>Previous</button>
      )}

      {/* Button for the next page */}
      {page<totalPages && (
        <button className="border-green-800 rounded py-2 px-4 bg-green-800 text-white cursor-pointer" onClick={() => setPage(page+1)}>Next</button>
      )}
    </div>
  </div>

  )
}

export default App
