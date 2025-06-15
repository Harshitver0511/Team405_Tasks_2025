import React from 'react'

const Card = (Url) => {
  return (
    <>
        <div>
            <img
                src={Url.Url}
                alt="cover"
                className="object-cover mt-4 w-[22vw] min-w-40 h-60 rounded-md shadow"
            />
        </div>
    </>
  )
}

export default Card;
