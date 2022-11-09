import Color from './Color'

const ColorList = ({ colors = [], onDeleteColor = f => f, onRateColor = f => f }) => {
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
            onDeleteColor={onDeleteColor}
            onRate={onRateColor}
          />
        )
      }
    </div>
  )
}

export default ColorList
