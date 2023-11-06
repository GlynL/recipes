import styles from './page.module.css'
import Recipes from './recipes'

export default function Home() {
  return (
    <main className={styles.main}>
      <Recipes />
    </main >
  )
}
