import { useState, useEffect } from 'react'
import { map, size } from 'lodash'
import { Products } from '@/api'
import { Loading, ListEmpty } from '@/components/Layout' 
import { Product } from './Product'
import styles from './ListProducts.module.css'

const productCtrl = new Products()

export function ListProducts(props) {

  const { reload, onReload } = props

  const [products, setProducts] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getAll()
        setProducts(response.data)
      } catch (error) {
          console.error(error)
      }
    })()
  }, [reload])

  return (
    
    <>
    
      {!products ? (
        <Loading />  
      ) :
      size(products) === 0 ? (
        <ListEmpty />
      ) : (
        
        <div className={styles.mainProducts}>
          {map(products, (product) => (
            <Product
              key={product.id} 
              productId={product.id}
              product={product.attributes}  
              onReload={onReload}
            />
          ))}
        </div>
      
      )}

    </>

  )
}
