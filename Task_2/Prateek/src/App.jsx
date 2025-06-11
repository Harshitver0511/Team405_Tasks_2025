import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [input, setinput] = useState("");
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("photo");
  const [images, setImages] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=aTz3v3ffro8ePj66NyfQsknZKbB8sSlZ9kWau1U1UYk`
      );
      setImages(res.data.results);
      console.log(res.data.results);
    };
    getData();
  }, [search, page]);
  const handleClick = (e) => {
    const category = e.target.innerText.toLowerCase();
    setsearch(category);
    console.log("Selected:", category);
    setpage(1)
    search
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setsearch(input);
    console.log(search);
    setpage(1)
  };

  const handleInput = (e) => {
    setinput(e.target.value);
    console.log(input)
  };

  return (
    <div className="flex flex-col justify-center bg-zinc-700 w-full min-h-screen">
      <div className="flex mt-7 px-10 flex-col w-full items-center md:items-start ">
        <h1 className="text-3xl font-semibold mb-4 text-white">
          Image Gallery
        </h1>
        <form className="flex w-full gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInput}
            value={input}
            className="outline-none w-full border border-zinc-500 text-zinc-400 rounded-md px-3 py-2"
            placeholder="Enter your image tag"
          />
          <button
            type="submit"
            className="px-3 text-white bg-blue-500 rounded-md py-2"
          >
            Search
          </button>
        </form>
        <div className="flex flex-wrap px-0 gap-x-4 md:gap-x-6 gap-y-3 justify-center md:justify-start py-4 w-full">
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-orange-400 text-white"
          >
            Nature
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-green-600 text-white"
          >
            Film
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-blue-400 text-white"
          >
            Sports
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-red-300 text-white"
          >
            Animals
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-orange-300 text-white"
          >
            People
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-purple-600 text-white"
          >
            Food
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-pink-600 text-white"
          >
            Wallpaper
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-zinc-600 text-white"
          >
            Valentine
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-red-600 text-white"
          >
            Flower
          </button>
          <button
            onClick={handleClick}
            className="px-4 w-2/5 md:w-auto py-2 rounded-md bg-blue-900 text-white"
          >
            Book
          </button>
        </div>
      </div>
      <div className="images columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
        {images.map((image, index) => (
          <div className="mb-4" key={index}>
            <img
              src={image.urls.regular}
              className="w-full h-auto rounded-lg shadow-md"
              alt={image.description}
            />
          </div>
        ))}
      </div>
      <div className="flex mt-4 gap-4 justify-center mb-5 w-full">
        <button
          onClick={() => {
            if (page >= 2) {
              return setpage(page - 1);
            }
          }}
          className="px-4 py-3 text-white bg-blue-500 rounded-md"
        >
          Prev
        </button>
        <button className="px-4 py-3 bg-blue-500 text-white rounded-md">{page}</button>
        <button
          onClick={() => {
            return setpage(page + 1);
          }}
          className="px-4 py-3 text-white bg-blue-500 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
