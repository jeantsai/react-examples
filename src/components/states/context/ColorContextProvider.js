import React, { createContext, useContext, useState } from 'react'
import colorData from '../colors.json'
import { v4 as uuidv4 } from 'uuid'


const ColorContext = createContext()
export const useColors = () => useContext(ColorContext)

const ColorContextProvider = ({ children }) => {
  const [colors, setColors] = useState(colorData)

  const addColorToState = color => setColors(allColors => [color, ...allColors])

  const addColor = (title, color) => {
    const newColors = [
      ...colors,
      {
        id: uuidv4(),
        title: title,
        color: color,
        rating: 0,
      }
    ]
    // setColor(newColors)
    addColorToState({
      id: uuidv4(),
      title: title,
      color: color,
      rating: 0,
    })
  }

  const deleteColor = id => {
    const newColors = colors.filter(color => color.id !== id)
    setColors(newColors)
  }

  const rateColor = (id, rating) => {
    const newColors = colors.map(color =>
      color.id === id ? { ...color, rating } : color
    )
    setColors(newColors)
  }

  return (
    <ColorContext.Provider value={{ colors, addColor, deleteColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  )
}

export default ColorContextProvider
