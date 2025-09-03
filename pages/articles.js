import styles from '@/styles/Articles.module.css'

export default function Articles({ articles }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daftar Artikel</h1>
      <div className={styles.articlesContainer}>
        {articles.map(article => (
          <article key={article.id} className={styles.articleCard}>
            <h2 className={styles.articleTitle}>{article.title}</h2>
            <p className={styles.articleBody}>{article.body}</p>
            <div className={styles.articleMeta}>
              <span>Post by: User {article.userId}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const articles = await res.json()

    return {
      props: {
        articles,
      },
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
    return {
      props: {
        articles: [],
      },
    }
  }
}