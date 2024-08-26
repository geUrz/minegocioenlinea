import { FaCloudUploadAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
import styles from './PublicarNegocio.module.css'

export function PublicarNegocio() {

  const router = useRouter()

  const userOn = () => {
    router.push('/registro')
  } 

  return (

    <div className={styles.section}>
      <div className={styles.container} 
        onClick={userOn}
      >
        <h2>¿ Tu negocio no esta en línea ?</h2>
        <h1>¡ Publicalo aquí !</h1>
        <FaCloudUploadAlt />
      </div>
    </div>

  )
}
