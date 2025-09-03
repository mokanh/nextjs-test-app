import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/UserDetail.module.css'

export default function UserDetail({ user, posts }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <h1>User tidak ditemukan</h1>
        <Link href="/users" className={styles.backLink}>Kembali ke Daftar User</Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Link href="/users" className={styles.backLink}>← Kembali</Link>
      
      <div className={styles.userInfo}>
        <h1 className={styles.userName}>{user.name}</h1>
        <div className={styles.userDetails}>
          <div className={styles.detailSection}>
            <h3>Informasi Kontak</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>
          
          <div className={styles.detailSection}>
            <h3>Alamat</h3>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
          
          <div className={styles.detailSection}>
            <h3>Perusahaan</h3>
            <p><strong>Nama:</strong> {user.company.name}</p>
            <p><strong>Slogan:</strong> {user.company.catchPhrase}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params

  try {
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

    if (!userRes.ok) {
      return {
        notFound: true,
      }
    }

    const user = await userRes.json()

    return {
      props: {
        user,
      },
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return {
      notFound: true,
    }
  }
}