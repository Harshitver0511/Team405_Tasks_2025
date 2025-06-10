import React from 'react'
import SearchList from './components/Search'
import ImageList from './components/ImageList'
import ImageContextProvider from './contexts/ImageContextProvider'
import ImageItem from './components/ImageItem'

const App = () => {
  return (
  <ImageContextProvider>  
      <div>
        <SearchList />
        <ImageList />
      </div>
    </ImageContextProvider>
  )
}

export default App