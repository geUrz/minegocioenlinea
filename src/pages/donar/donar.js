import { BasicLayout } from '@/layouts'
import styles from './donar.module.css'
import { FaHandHoldingUsd, FaWhatsapp, FaWhatsappSquare } from 'react-icons/fa'

export default function donar() {

  const handleClick = () => {
    const numero = '6861349399'; // Reemplaza con el número de celular
    const mensaje = '¡Quiero donar!, Necesito los datos para hacer transferencia'; // Reemplaza con el mensaje predeterminado
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (

    <BasicLayout relative>

      <div className={styles.main}>
        <div className={styles.section}>
          <FaHandHoldingUsd />
          <h1>¿ Quieres donar ?</h1>
          <h2>¡ Envianos un whatsapp para darte mas detalles !</h2>
          <div className={styles.whatsapp} onClick={handleClick}>
            <FaWhatsappSquare />
          </div>
        </div>
      </div>

    </BasicLayout>

  )
}
