import { Image } from 'semantic-ui-react'
import { FaRegEnvelope, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import styles from './Footer.module.css'

export function Footer(props) {

  const { noFooter = true } = props

  return (

    <>

      {noFooter ? (

        <div className={styles.section}>

          <div className={styles.container}>
            <Image src='/img/logo.webp' />
            <h1>Contacto y soporte técnico</h1>
            <Link href='https://wa.me/6861349399' target='blank'>
              <FaWhatsapp />
              <h2>6861349399</h2>
            </Link>
          </div>

          <div className={styles.copy}>
            <h4>&copy; 2024 MI NEGOCIO EN LÍNEA</h4>
          </div>

        </div>

      ) : (
        ''
      )}

    </>

  )
}
