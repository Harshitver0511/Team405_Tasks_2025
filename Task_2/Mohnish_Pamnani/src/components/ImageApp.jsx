import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const ImageApp = () => {
    const [value, setValue] = useState("")
    const [photos, setPhotos] = useState([])
    const page = useRef(1)

    useEffect(() => {
        const fetch_photos = async () => {
            const get_api = await fetch("https://api.unsplash.com/photos/?per_page=16&&client_id=3EE73RnIGItI-PccW7x8UPHyl4OKOcOOkTjgP1Py5d8")
            const get_photos = await get_api.json()
            setPhotos(get_photos)
        }
        fetch_photos()


    }, [])

    const searchCategory = (e) => {
        setValue(e)
    }
    const handleChange = (e) => {

        setValue(e.target.value)
    }

    const searchImage = async () => {
        if (value) {
            page.current = 1
            const get_api = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=20&query=${value}&&client_id=3EE73RnIGItI-PccW7x8UPHyl4OKOcOOkTjgP1Py5d8`)
            const get_photos = await get_api.json()
            setPhotos(get_photos.results)
        }
        else {
            toast.error('Enter Category to search', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const nextPage = async () => {
        if (value) {
            page.current++
            const get_api = await fetch(`https://api.unsplash.com/search/photos?page=${page.current}&per_page=20&query=${value}&&client_id=3EE73RnIGItI-PccW7x8UPHyl4OKOcOOkTjgP1Py5d8`)
            const get_photos = await get_api.json()
            setPhotos(get_photos.results)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        else {
            page.current++
            const get_api = await fetch(`https://api.unsplash.com/photos/?page=${page.current}&per_page=20&&client_id=3EE73RnIGItI-PccW7x8UPHyl4OKOcOOkTjgP1Py5d8`)
            const get_photos = await get_api.json()
            setPhotos(get_photos)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
    const previousPage = async () => {
        if (page.current !== 1) {
            page.current--
            const get_api = await fetch(`https://api.unsplash.com/search/photos?page=${page.current}&per_page=20&query=${value}&&client_id=3EE73RnIGItI-PccW7x8UPHyl4OKOcOOkTjgP1Py5d8`)
            const get_photos = await get_api.json()
            setPhotos(get_photos.results)
            window.scrollTo({ top: 0, behavior: 'smooth' })

        }
        else {
            toast.info('You are already on the first Page', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }




    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h1 className=' font-bold text-4xl font-serif'>Image Search</h1>
            <div className="search_bar flex gap-2.5 justify-center items-center">
                <input type="text" value={value} onChange={handleChange} placeholder='Type something to search...' className='border border-amber-700 rounded-xl w-1/2 p-3 ' />
                <button onClick={() => searchImage()}>
                    <lord-icon
                        className="cursor-pointer h-12 w-12"
                        src="https://cdn.lordicon.com/iuvnsegf.json"
                        trigger="hover"
                        state="hover-rotation">
                    </lord-icon>

                </button>

            </div>
            <div className="category md:flex-row flex-wrap gap-3 flex justify-evenly mt-5 ">
                <button className='bg-red-500 py-3  text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Nature")}>Nature</button>
                <button className='bg-yellow-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Film")}>Film</button>
                <button className='bg-indigo-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Animals")}>Animals</button>
                <button className='bg-emerald-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("People")}>People</button>
                <button className='bg-fuchsia-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Food")}>Food</button>

                <button className='bg-lime-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Sports")}>Sports</button>
                <button className='bg-orange-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Wallpapers")}>Wallpapers</button>
                <button className='bg-pink-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Valentine")}>Valentine</button>
                <button className='bg-sky-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Flower")}>Flower</button>
                <button className='bg-teal-500 py-3 text-white font-bold text-lg rounded-2xl cursor-pointer px-5' onClick={() => searchCategory("Books")}>Book</button>
            </div>

            <div className='flex gap-y-5 justify-around flex-wrap mt-6 '>
                {photos.map(item => {
                    return <img key={item.urls.regular} className='rounded-4xl w-[150px] sm:w-[200px] md:w-[360px]' src={item.urls.regular} alt=""  />
                })}
            </div>
            <div className="pageToggle flex gap-3 my-2">

                <span><button className='hover:font-bold text-xl text-white bg-green-500 cursor-pointer py-3 px-5 rounded-2xl' onClick={() => previousPage()} >Previous</button></span>
                <span><button className='hover:font-bold text-xl text-white bg-green-500 cursor-pointer py-3 px-5 rounded-2xl' onClick={() => nextPage()} >Next</button></span>
            </div>

        </div>
    )
}

export default ImageApp
