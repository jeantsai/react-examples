import React, { useState } from "react"
import { useInput } from './FormHooks'
import AddIcon from "@mui/icons-material/AddBoxRounded"

const ColorForm = ({ onAddColor = f => f }) => {
  const [titleProps, resetTitle] = useInput("")
  const [colorProps, resetColor] = useInput("#000000")

  const submit = e => {
    e.preventDefault()
    onAddColor(titleProps.value, colorProps.value)
    resetTitle("")
    resetColor("")
  }

  return (
    <form onSubmit={submit}>
      <input { ...titleProps } type="text" placeholder="Title" required />
      <input { ...colorProps } type="color" required />
      <button><AddIcon />Add</button>
    </form>
  )
}

export default ColorForm
