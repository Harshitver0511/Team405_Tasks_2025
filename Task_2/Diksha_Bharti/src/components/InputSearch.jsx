import { useContext, useState } from 'react'

function App({onClick}) {

  const [value,setValue] = useState("");

  // puts the value entered by the user in input field
  function handleChange(event){
    setValue(event.target.value)
  }
  
  function handleSearchBtn(){
    onClick(value)
  }

  return (
    <>
      <h1 className='text-center text-3xl font-bold py-2 mt-3'>Image Gallery</h1>

      <div className='flex flex-row gap-3 w-[90%] px-2 py-2 mx-auto mt-3'>
        <input
        value= {value}
        onChange={handleChange}
        type='text'
        placeholder='Search anything...'
        className='outline-none border-2 border-gray-400 w-full rounded px-2 py-1'
        />

        <button
        onClick={handleSearchBtn}
        className='bg-blue-400 cursor-pointer px-2 rounded text-white text-[18px]'
        >Search</button>
      </div>

        {/* This buttons on click fills the input field with the value */}
        <div id='buttonDiv' className='md:flex md:flex-row md:gap-5 gap-3 w-[80%] md:flex-wrap justify-evenly grid grid-cols-2 mx-auto mt-5'>
          <button className='bg-linear-to-b from-green-300 to-green-500 px-3 py-2 outline-none rounded text-blue-950 text-lg cursor-pointer' onClick={() => setValue("Nature")}>Nature</button>
          <button className='bg-linear-to-b from-pink-300 to-pink-500 px-3 py-2 outline-none rounded  text text-lg cursor-pointer' onClick={() => setValue("Film")}>Film</button>
          <button className='bg-linear-to-b from-amber-300 to-amber-600 py-2 px-3 rounded text-lg outline-none cursor-pointer' onClick={() => setValue("Animals")}>Animals</button>
          <button className='bg-linear-to-b from-blue-300 to-blue-500 py-2 px-3 rounded text-lg outline-none cursor-pointer' onClick={() => setValue("People")}>People</button>
          <button className='bg-linear-to-b from-violet-300 to-violet-400 py-2 px-3 rounded text-lg outline-none cursor-pointer' onClick={() => setValue("Food")}>Food</button>
          <button className='bg-linear-to-b from-red-300 to-red-500 py-2 px-3 rounded text-lg  outline-none cursor-pointer' onClick={() => setValue("Sports")}>Sports</button>
          <button className='bg-linear-to-b from-gray-400 to-gray-500 py-2 px-3 rounded text-lg  outline-none cursor-pointer' onClick={() => setValue("Wallpapers")}>Wallpapers</button>
          <button className='bg-linear-to-b from-orange-300 to-orange-500 py-2 px-3 rounded text-lg  outline-none cursor-pointer' onClick={() => setValue("Valentine")}>Valentine</button>
          <button className='bg-linear-to-b from-cyan-300 to-cyan-600 py-2 px-3 rounded text-lg  outline-none cursor-pointer' onClick={() => setValue("Flower")}>Flower</button>
          <button className='bg-linear-to-b from-emerald-300 to-emerald-600 py-2 px-3 rounded text-lg  outline-none cursor-pointer' onClick={() => setValue("Book")}>Book</button>
        </div>
    </>
  )
}

export default App
