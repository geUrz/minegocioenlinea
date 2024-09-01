import Link from 'next/link'
import styles from './BoxCategoria.module.css'

export function BoxCategoria(props) {

  const {link, children, title} = props

  return (
    
    <Link href={`/categorias/${link}`} className={styles.box}>
      <div className={styles.box}>
        {children}
        <h1>{title}</h1>
      </div>
    </Link>

  )
}
