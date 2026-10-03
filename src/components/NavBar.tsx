import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

// NavLink passes { isActive } to className when you give it a function.
function linkClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link
}

function NavBar() {
  return (
    <header className={styles.bar}>
      <span className={styles.brand}>Recipe Explorer</span>
      <nav className={styles.nav}>
        <NavLink to="/list" className={linkClass}>
          List
        </NavLink>
        <NavLink to="/gallery" className={linkClass}>
          Gallery
        </NavLink>
      </nav>
    </header>
  )
}

export default NavBar
