import Rating from './Rating'
import DeleteIcon from '@mui/icons-material/Delete'

const Color = ({ id, title, color, rating, onDeleteColor = f => f, onRate = f => f }) => {

  return (
    <section>
      <h1>{title}</h1>
      <div style={{ height: 50, backgroundColor: color }} />
      <Rating
        rating={rating}
        onRate={rating => {
          onRate(id, rating)
        }}
      />
      <div>
        <button
          onClick={() => onDeleteColor(id)}
          >
          <DeleteIcon />
          Delete
        </button>
      </div>
    </section>
  )
}

export default Color
