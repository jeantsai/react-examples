import React from 'react'
import StarIcon from '@mui/icons-material/Star'

const Star = ({ up = false, onSelect = f => f }) => {
  return (
    <StarIcon
      color={ up ? 'primary' : 'disabled' }
      onClick={ onSelect }
    />
  )
}

const createArray = (size = 5) => {
  return [...Array(size)]
}

const Rating =  ({ rating, onRate = f => f }) => {
  return createArray(5).map((_, i) =>
    <Star
      key={i + 1}
      up={i < rating}
      onSelect={() => onRate(i + 1)}
    />
  )
}

export default Rating

