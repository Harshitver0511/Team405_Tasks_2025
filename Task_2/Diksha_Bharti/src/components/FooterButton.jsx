import React from 'react'

function FooterButton({incrementPage, decrementPage}){
    return(
        <>
        <div className='mb-5 w-full mx-auto justify-center flex flex-row gap-3'>
            <button 
            onClick={decrementPage}
            className='rounded border-gray-400 outline-none border-1 bg-neutral-100 px-2 py-2'>➖</button>
            <p 
            className='px-2 text-lg border-gray-400 py-2 border-1 bg-neutral-100 rounded '>Pages</p>
            <button
            onClick={incrementPage} 
            className='rounded outline-none border-1 border-gray-400 bg-neutral-100 px-2 py-2'>➕</button>
        </div>
        </>
    )
}
export default FooterButton