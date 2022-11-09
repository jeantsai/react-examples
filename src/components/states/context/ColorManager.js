import React from 'react'
import ColorContextProvider from './ColorContextProvider'
import ColorList from './ColorList'
import ColorForm from './ColorForm'


const ColorManager = () => {
  return (
    <ColorContextProvider>
      <ColorForm />
      <ColorList />
    </ColorContextProvider>
  )
}

export default ColorManager
