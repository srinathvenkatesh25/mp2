import { Outlet } from 'react-router-dom'
import { useMeals } from '../hooks/useMeals'
import NavBar from './NavBar'
import StatusMessage from './StatusMessage'
import styles from './Layout.module.css'

function Layout() {
  const { loading, error, notice, retry } = useMeals()

  // Handling loading/error here means every page below can assume the meals exist.
  let content
  if (loading) content = <StatusMessage message="Loading recipes..." />
  else if (error) content = <StatusMessage message={error} onRetry={retry} />
  else content = <Outlet />

  return (
    <>
      <NavBar />
      {notice && <p className={styles.notice}>{notice}</p>}
      <main>{content}</main>
    </>
  )
}

export default Layout
