import { useEffect, useState } from "react"
import { ListEmpty, Loading } from "@/components/Layout"
import { map, size } from "lodash"
import styles from './NegociosTodos.module.css'
import axios from "axios"
import Link from "next/link"
import { Image } from "semantic-ui-react"
import { FaRegImage } from "react-icons/fa"

export function NegociosTodos(props) {

  const { reload, onReload } = props

  const [negocios, setNegocios] = useState()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/negocios/negocios')
        setNegocios(response.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [reload])

  return (

    <>

      {!negocios ? (
        <Loading />
      ) :
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

        )}

    </>

  )
}
