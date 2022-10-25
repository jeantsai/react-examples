import { useInput } from '../FormHooks'
import AddIcon from "@mui/icons-material/AddBoxRounded"
import { useColors } from "./ColorContextProvider";

const ColorForm = () => {
  const [titleProps, resetTitle] = useInput("")
  const [colorProps, resetColor] = useInput("#000000")
  const { addColor } = useColors()

  const submit = e => {
    e.preventDefault()
    addColor(titleProps.value, colorProps.value)
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
