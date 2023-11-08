import { Link } from '../components/basic'
import styles from './banner.module.css'

export default function Banner() {
  return (
    <header>
        <div className={styles.banner}>
            <Link href='/' data-testid='nav-home-link'>
                <h1>Recipes</h1>
            </Link>
            <nav>
                <Link href='/add_recipe' data-testid='nav-new-link'>New</Link> 
            </nav>
        </div>
    </header>
  )
}
