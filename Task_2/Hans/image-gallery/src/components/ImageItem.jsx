import React from 'react'

const ImageItem = ({ image }) => {
  return (
    <div className='overflow-hidden rounded-lg shadow-lg'>
      <a href={image.urls.small} className="" target='_blank'>
        <img src={image.urls.small}
         alt={image.alt_description} 
         className='w-full h-full object-cover' />
      </a>
    </div>
  );
}

export default ImageItem