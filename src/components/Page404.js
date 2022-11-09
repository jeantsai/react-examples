import { useLocation } from 'react-router'


const Page404 = () => {
  const location = useLocation()

  return (
    <div>
      <h1>Page not found at {location.pathname}</h1>
    </div>
  )
}

export default Page404
