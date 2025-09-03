import { useState } from 'react'
import styles from '@/styles/Form.module.css'

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [submittedData, setSubmittedData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmittedData({
      ...formData,
      submittedAt: new Date().toLocaleString('id-ID')
    })

    setFormData({
      name: '',
      email: '',
      password: '',
    })

    setIsSubmitting(false)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Formulir Pendaftaran</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={styles.input}
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
            placeholder="Masukkan email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className={styles.input}
            placeholder="Masukkan password"
            minLength="6"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
        >
          {isSubmitting ? 'Mengirim...' : 'Daftar'}
        </button>
      </form>

      {submittedData && (
        <div className={styles.submittedData}>
          <h2 className={styles.submittedTitle}>Data Berhasil Dikirim!</h2>
          <div className={styles.dataDisplay}>
            <div className={styles.dataItem}>
              <strong>Nama:</strong> {submittedData.name}
            </div>
            <div className={styles.dataItem}>
              <strong>Email:</strong> {submittedData.email}
            </div>
            <div className={styles.dataItem}>
              <strong>Password:</strong> {'•'.repeat(submittedData.password.length)}
            </div>
            <div className={styles.dataItem}>
              <strong>Waktu Dikirim:</strong> {submittedData.submittedAt}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}