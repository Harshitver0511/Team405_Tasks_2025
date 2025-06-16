import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20 my-10'>
        {Array(10)
            .fill()
            .map((_, i) => (
                <div key={i} className=' bg-gray-300 h-64 w-full animate-pulse'>
                </div>
            ))}
    </div>
  )
}

export default LoadingSkeleton