import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CategoryButton from "./components/CategoryButton";
import ImageGrid from "./components/ImageGrid";

const AccessKey = "Se7GlFVNGjjGl3Sl75KXEWXtQYvhR4NNhJp2zvCM5Is";


function App() {

  const [images, setImages] = useState([]);
  const fetchImages = async (query) => {
    
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${AccessKey}`
    );
    const data = await res.json();
    setImages(data.results);
  };

  useEffect(() => {fetchImages();}, []);

  return (
       <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Image Gallery</h1>
        
        <div className="flex justify-center mb-4">
            <SearchBar onSearch={fetchImages} />
        </div>

        <CategoryButton onSelect={fetchImages} />
        <ImageGrid images={images} />
        
       </div>
  );
};

export default App;