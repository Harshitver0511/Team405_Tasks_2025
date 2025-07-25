import React from 'react'

function TopBar({onSelect}) {
    return (
        <div>
    <ul className="flex justify-evenly my-4 flex-wrap">
     <li onClick={() => onSelect('Nature')} className="bg-red-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer">Nature</li>
     <li onClick={() => onSelect('Animals')} className='bg-blue-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>Animals</li>
     <li onClick={() => onSelect('Film')} className='bg-green-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>Film</li>
     <li onClick={() => onSelect('People')} className='bg-yellow-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>People</li>
     <li onClick={() => onSelect('Food')} className='bg-indigo-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>Food</li>
     <li onClick={() => onSelect('Sports')} className='bg-purple-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>Sports</li>
     <li onClick={() => onSelect('Wallpapers')} className='bg-pink-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>Wallpapers</li>
     <li onClick={() => onSelect('Valentine')} className='bg-gray-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>Valentine</li>
     <li onClick={() => onSelect('Flower')} className='bg-teal-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>Flower</li>
     <li onClick={() => onSelect('Book')} className='bg-orange-500 w-3/7 md:w-auto md:p-1.5 text-center py-1.5 my-1 rounded cursor-pointer'>Book</li>
    </ul>
  </div>
    )
}

export default TopBar
