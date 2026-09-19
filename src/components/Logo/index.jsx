import logo from '../../assets/Logo.svg'
import styles from './Logo.module.css'

function Logo() {
  return <img src={logo} alt="SportSee" className={styles.logo} />
}

export default Logo