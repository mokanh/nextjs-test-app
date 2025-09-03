import styles from '@/styles/User.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function User({ users }) {
    const router = useRouter()
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Daftar User</h1>
        <div className={styles.userList}>
            {users.map(user => (
            <div key={user.id} className={styles.userItem} onClick={() => router.push(`/users/${user.id}`)}>
              <div>
                <h2 className={styles.userName}>
                    {user.name}
                </h2>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
              <Link href={`/users/${user.id}`} className={styles.detailLink}>
                Lihat Detail
              </Link>
            </div>
            ))}
        </div>
        </div>
    )
}


export async function getServerSideProps() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()

    return {
      props: {
        users,
      },
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return {
      props: {
        users: [],
      },
    }
  }
}