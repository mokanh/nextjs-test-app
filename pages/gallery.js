import { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Gallery.module.css'
import { imageUrls, blurImage } from '@/libs/statics';

export default function Gallery() {
  const [imageLoading, setImageLoading] = useState({})

  const handleImageLoad = (index) => {
    setImageLoading(prev => ({
      ...prev,
      [index]: false
    }))
  }

  const handleImageLoadStart = (index) => {
    setImageLoading(prev => ({
      ...prev,
      [index]: true
    }))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Galeri Gambar</h1>
      <p className={styles.subtitle}>
        Galeri ini menggunakan komponen next/image untuk optimisasi gambar
      </p>
      
      <div className={styles.gallery}>
        {imageUrls.map((url, index) => (
          <div key={index} className={styles.imageContainer}>
            {imageLoading[index] && (
              <div className={styles.imagePlaceholder}>
                <div className={styles.loadingSpinner}></div>
              </div>
            )}
            <Image
              src={url}
              alt={`Gallery image ${index + 1}`}
              width={400}
              height={300}
              className={styles.image}
              priority={index < 4}
              placeholder="blur"
              blurDataURL={blurImage}
              onLoadingComplete={() => handleImageLoad(index)}
              onLoadStart={() => handleImageLoadStart(index)}
            />
            <div className={styles.imageOverlay}>
              <span>Image {index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}