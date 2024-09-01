import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BasicLayout } from '@/layouts'
import styles from './slug.module.css'
import { map, size } from 'lodash'
import { FaStoreAlt } from 'react-icons/fa'
import { ArrowBack } from '@/components/Layout/ArrowBack'
import { ListEmpty, Loading } from '@/components/Layout'
import Link from 'next/link'
import { Image } from 'semantic-ui-react'

// Función para limpiar y formatear el slug para el título
function formatSlugForTitle(slug) {
  if (typeof slug === 'string') {
    return slug.replace(/-/g, ' '); // Reemplazar guiones medios por espacios
  }
  return ''; // Retornar un string vacío si slug no es una cadena
}

export default function Categoria() {
  const router = useRouter()
  const { slug } = router.query

  const [negocios, setNegocios] = useState([])

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const res = await axios.get(`/api/negocios/negocios?categoria=${slug}`)
          setNegocios(res.data)
        } catch (error) {
          console.error('Error al obtener los negocios:', error)
        }
      })()
    }
  }, [slug])

  return (
    <BasicLayout relative>

      <ArrowBack title={formatSlugForTitle(slug)} />

      {!negocios ? (
        <Loading size={45} loading={1} />
      ) : (
        size(negocios) === 0 ? (
          <ListEmpty listEmpty={1} />
        ) : (

          <div className={styles.boxMain}>

            {map(negocios, (negocio) => (
              <Link href={`/negocio/${negocio.slug}`} key={negocio.id} className={styles.boxSection}>

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

    </BasicLayout>
  )
}
