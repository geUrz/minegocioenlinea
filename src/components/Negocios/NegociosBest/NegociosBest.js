import { useEffect, useState } from 'react'
import styles from './NegociosBest.module.css'
import axios from 'axios'
import { ListEmpty, Loading } from '@/components/Layout'
import { map, size } from 'lodash'
import { FaRegImage } from 'react-icons/fa'

export function NegociosBest() {

  const [negocios, setNegocios] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/negocios/negocios?best=true')
        setNegocios(res.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

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
              <div key={negocio.id} className={styles.boxSection}>

                <div className={styles.box}>
                  {true ? (
                    <div className={styles.noImage}>
                      <FaRegImage />
                    </div>
                  ) : (
                    ''
                  )
                  }
                  <div className={styles.boxSelec}></div>
                </div>
                <div className={styles.title}>
                  <h1>{negocio.negocio}</h1>
                </div>

              </div>
            ))}

          </div>
        )
      )}

    </>

  )
}
