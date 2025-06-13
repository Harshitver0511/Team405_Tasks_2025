import React,{ useState, useEffect } from 'react'
import InputSearch from './components/InputSearch'
import FooterButton from './components/FooterButton'
import Footer from './components/Footer'
import userConfig from './config/userConfig'

function App() {
  const [image, setImage] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState(false);
  const [footerDisplay, setFooterDisplay] = useState(false);
     
  // to retrive data or images on page change
  useEffect(() => {
    if(search){
      handleButtonClick(search);
    }
  },[page]);

  // handling api call when search button is clicked
  const handleButtonClick = (value) => {
      setSearch(value)
      setTopic(false)
      setLoading(true)

      fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${value}&orientation=landscape&client_id=${userConfig.apiAccesskey}`)
      .then((response) => response.json())
      .then((data) => {
        setImage(data.results);
        setLoading(false)
        setTopic(true);
        setFooterDisplay(true);
      })
      .catch((error) => {
        alert(`Opps !! Error in fetching image: ${error}`);
        setLoading(false)
        setTopic(false)
        setFooterDisplay(false);
  })
      
  }
  

  return (
    <>
      <InputSearch onClick = {handleButtonClick}/>

      {loading && <p className='text-center text-2xl font-[600] mt-6 mb-5'> Fetching images.....</p>}
      {topic && <p className='text-center text-3xl font-[600] mt-8'>  Displaying results </p>}

      <div className='w-[90%] mx-auto md:grid md:grid-cols-3 md:gap-x-8  grid grid-cols-1 gap-y-10 mt-[3rem] mb-8'>
        
        {/* Image Div */}
        {image.map(img => (
          <div key = {img.id} className='flex flex-col shadow-xl shadow-gray-300 rounded-2xl pb-3 mx-auto'>
            <img 
            src = {img.urls.small} 
            alt = {img.alt_description}
            className = 'rounded-t-2xl'
            />
            <p className='md:text-[16px] text-center text-xl capitalize mx-2 my-2'> {img.alt_description} </p>

            <div className='flex flex-row justify-between items-center px-3 py-2 my-auto'>
            
            <p className='md:text-md texl-xl'> 🩷 {img.likes} </p>
            <a
            href={`${img.links.download}?force=true`}
            target='_blank'
            rel='noopener noreferrer'
            download
            className='text-md bg-gray-700 hover:border-1 hover:border-b-slate-800 hover:bg-gray-200 hover:font-[600] hover:text-black text-white px-2 py-1 rounded'
            >View Image</a>
            </div>

          </div>
        ))}
        
      </div>

      {/* Page increment and decrement button */}
      {/* Displaying the FooterButton on successful image load */}
      {footerDisplay && 
      <FooterButton 
      incrementPage={() => setPage(prev => prev+1)}
      decrementPage = {() => setPage(prev => (prev > 1 ? prev - 1 : 1))}
      />
      }

      {/* Displaying the Footer on successful image load */}
      <div>
        {footerDisplay && <Footer/>}
      </div>
    </>
  )
}

export default App
