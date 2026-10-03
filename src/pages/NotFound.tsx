import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/list">Go to the list</Link>
    </>
  )
}

export default NotFound
