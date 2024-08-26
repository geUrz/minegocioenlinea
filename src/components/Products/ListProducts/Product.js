import { Image } from 'semantic-ui-react'
import styles from './Product.module.css'
import Link from 'next/link'

export function Product(props) {

  const { product, productId, onReload } = props

  return (

    <Link href={`/products/${productId}`}>
      <div className={styles.boxProduct}>
        <div className={styles.boxImg}>
          <Image src={product.image.data.attributes.url} />
        </div>
        <h1>{product.title}</h1>
      </div>
    </Link>

  )
}
