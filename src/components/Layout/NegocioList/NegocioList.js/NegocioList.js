import { map, size } from 'lodash'
import { ListEmpty } from '../../ListEmpty'
import { Loading } from '../../Loading'
import styles from './NegocioList.module.css'
import Link from 'next/link'
import { FaStoreAlt } from 'react-icons/fa'
import { Image } from 'semantic-ui-react'

export function NegocioList(props) {

  const { negocios, onOpenCloseSearch } = props
  
  return (

    <>
    
      {!negocios ? (
        <Loading size={45} loading={1} />
      ) : (
        size(negocios) === 0 ? (
          <ListEmpty />
        ) : (
          <div className={styles.boxMain}>

            {map(negocios, (negocio) => (
              <Link 
                href={`/negocio/${negocio.slug}`} 
                key={negocio.id} 
                className={styles.boxSection}
                onClick={onOpenCloseSearch}
              >

                <div className={styles.box}>
                {!negocio.image ? (
                    <div className={styles.noImage}>
                      <FaStoreAlt />
                    </div>
                    ) : (
                      <Image src={negocio.image} />
                    )
                  }
                  <div className={styles.boxSelec}></div>
                </div>
                <div className={styles.title}>
                  <h1>{negocio.negocio}</h1> 
                </div>

              </Link>
            ))}

          </div>
        )
      )}
    
    </>

  )
}
