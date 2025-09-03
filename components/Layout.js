import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/Layout.module.css'
import { taskLists } from '@/libs/statics';

export default function Layout({ children }) {
  const router = useRouter()
  const route = router.pathname

  const isIndex = route === '/'
  return (
    <div className={styles.container}>
      {
        !isIndex && (
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            {
              taskLists.map((task, index) => (
                <Link
                  key={index}
                  href={task.url}
                  target={task.url === '/api/products' ? '_blank' : '_self'}
                  className={
                    route === task.url ? `${styles.navLink} ${styles.active}` : styles.navLink
                  }
                >
                  Soal {index + 1}
                </Link>
              ))
            }
          </nav>
        )
      }
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}