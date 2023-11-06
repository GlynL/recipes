import { Link } from '../components/basic'
import styles from './banner.module.css'

export default function Banner() {
  return (
    <header>
        <div className={styles.banner}>
            <Link href='/'>
                <h1>Recipes</h1>
            </Link>
            <nav>
                <Link href='/add_recipe'>New</Link> 
            </nav>
        </div>
    </header>
  )
}
