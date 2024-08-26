import { Image } from 'semantic-ui-react'
import styles from './Services.module.css'

export function Services(props) {

  const {description} = props

  return (
    
    <div className={styles.containerServ}>
      <div className={styles.boxServ}>
        <div className={styles.boxImg}>
          <Image src='/img/services/deg1.png' />
        </div>
        <div className={styles.content}>
            <h1>Corte de pelo</h1>
            {description ? (
              <p>
                <ul>
                  <li>Cortes frescos</li>
                  <li>High fade</li>
                  <li>Mid fade</li>
                  <li>Low fade</li>
                </ul>
              </p> 
            ) : ('')}
       </div>
      </div>
      <div className={styles.boxServRev}>
        <div className={styles.boxImg}>
          <Image src='/img/services/deg2.png' />
        </div>
        <div className={styles.content}>
            <h1>Corte de barba</h1>
            {description ? (
              <p>
                <ul>
                  <li>Cortes frescos</li>
                  <li>High fade</li>
                  <li>Mid fade</li>
                  <li>Low fade</li>
                </ul>
              </p> 
            ) : ('')}
       </div>
      </div>
      <div className={styles.boxServ}>
        <div className={styles.boxImg}>
          <Image src='/img/services/deg3.png' />
        </div>
        <div className={styles.content}>
            <h1>Aplicación de cera</h1>
            {description ? (
              <p>
                <ul>
                  <li>Cortes frescos</li>
                  <li>High fade</li>
                  <li>Mid fade</li>
                  <li>Low fade</li>
                </ul>
              </p> 
            ) : ('')}
       </div>
      </div>
      <div className={styles.boxServRev}>
        <div className={styles.boxImg}>
          <Image src='/img/services/deg4.png' />
        </div>
        <div className={styles.content}>
            <h1>Equipos sanitizados</h1>
            {description ? (
              <p>
                <ul>
                  <li>Cortes frescos</li>
                  <li>High fade</li>
                  <li>Mid fade</li>
                  <li>Low fade</li>
                </ul>
              </p> 
            ) : ('')}
       </div>
      </div>
    </div>

  )
}
