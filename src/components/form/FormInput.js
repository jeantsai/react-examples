import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { styled, useTheme } from '@mui/material/styles'


const StyledTextField = styled(TextField)({
  '& .MulInput-underline;after': {
    border: 'none',
  }
})

const SampleForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" ref={register} name="login" />
    </form>
  )
}

export default SampleForm
