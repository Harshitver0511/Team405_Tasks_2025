function ImageGrid({ images }) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {images.map((img) => (
        <img
          key={img.id}
          src={img.urls.small}
          alt={img.alt_description}
          className=" rounded shadow border-5 border-green-400 "
        />
      ))}
    </div>
  );
}


export default ImageGrid;