import { Image } from 'semantic-ui-react'
import styles from './BannerStatic.module.css'

export function BannerStatic() {
  return (
   
    <div className={styles.containerBanner}>
      <Image src='/img/wallpaper/banner1.jpg' />
    </div>

  )
}
