import React, { useRef } from "react"
import AddIcon from "@mui/icons-material/AddBoxRounded"

const ColorForm = ({ onAddColor = f => f }) => {
  const txtTitle = useRef()
  const hexColor = useRef()
  const submit = e => {
    e.preventDefault()
    const title = txtTitle.current.value
    const color = hexColor.current.value
    onAddColor(title, color)
    txtTitle.current.value = ""
    hexColor.current.value = ""
  }

  return (
    <form onSubmit={submit}>
      <input ref={txtTitle} type="text" placeholder="Title" required />
      <input ref={hexColor} type="color" required />
      <button><AddIcon />Add</button>
    </form>
  )
}

export default ColorForm
