import Color from './Color'
import { useColors } from './ColorContextProvider'

const ColorList = () => {
  const { colors } = useColors()

  if (colors.length === 0) {
    return (
      <div>The color list is emptry</div>
    )
  }
  return (
    <div>
      {
        colors.map(color =>
          <Color
            key={color.id}
            {...color}
          />
        )
      }
    </div>
  )
}

export default ColorList
