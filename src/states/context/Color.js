import Rating from './Rating'
import DeleteIcon from '@mui/icons-material/Delete'
import { useColors } from './ColorContextProvider'

const Color = ({ id, title, color, rating }) => {
  const { deleteColor, rateColor } = useColors()

  return (
    <section>
      <h1>{title}</h1>
      <div style={{ height: 50, backgroundColor: color }} />
      <Rating
        rating={rating}
        onRate={rating => {
          rateColor(id, rating)
        }}
      />
      <div>
        <button
          onClick={() => deleteColor(id)}
          >
          <DeleteIcon />
          Delete
        </button>
      </div>
    </section>
  )
}

export default Color
