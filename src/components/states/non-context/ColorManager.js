import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import colorData from './colors.json'
import ColorList from './ColorList'
import ColorForm from './ColorForm'

const ColorManager = () => {
  const [colors, setColors] = useState(colorData)

  const onDeleteColor = id => {
    const newColors = colors.filter(color => color.id !== id)
    setColors(newColors)
  }

  const onRateColor = (id, rating) => {
    const newColors = colors.map(color =>
      color.id === id ? { ...color, rating } : color
    )
    setColors(newColors)
  }

  const onAddNewColor = (title, color) => {
    const newColors = [
      ...colors,
      {
        id: uuidv4(),
        title: title,
        color: color,
        rating: 0,
      }
    ]
    setColors(newColors)
  }

  return (
    <React.Fragment>
    <ColorForm
      onAddColor={onAddNewColor}
    />
    <ColorList
      colors={colors}
      onDeleteColor={onDeleteColor}
      onRateColor={onRateColor}
    />
    </React.Fragment>
  )
}

export default ColorManager
