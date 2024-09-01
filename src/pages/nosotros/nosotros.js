import { BasicLayout } from '@/layouts'
import styles from './nosotros.module.css'
import { NosotrosForm } from '@/components/Nosotros'

export default function nosotros() {
  return (
    
    <BasicLayout relative>

      <div className={styles.main}>

      <div className={styles.title}>
        <h1>Mi Negocio en Linea</h1>
      </div>

      <div className={styles.p}>
        <p>Es una plataforma gratuita que su función es publicar negocios que no cuentan con una pagina web o simplemente quieren tener mas exposición y asi obtener mas clientes.</p>
      </div>

      <div className={styles.p1}>
        <p>Todos los negocios, información, promociones, datos personales aquí publicados son totalmente responsabilidad del que lo publica.
        Mi Negocio en Linea se deslinda de cualquier responsabilidad que ofrecen los negocios.
        </p>
      </div>

      <NosotrosForm />

      </div>

    </BasicLayout>

  )
}
