import { BasicLayout } from "@/layouts"
import { Image } from "semantic-ui-react"
import { NegociosTodos, NegociosBest } from "@/components/Negocios"
import styles from './home.module.css'
import { FaCloudUploadAlt, FaMedal, FaStoreAlt } from "react-icons/fa"
import { useRouter } from "next/router"


export default function Home() {

  const router = useRouter()

  const userOn = () => {
    router.push('/registro')
  } 

  return (
    <BasicLayout relative>

      <div className={styles.containerHome}>

        <div className={styles.containerHomebanner}>
          <div className={styles.bannerMobile}>
            <Image src='/img/wallpaperMobil.webp' />
            <div className={styles.container}
              onClick={userOn}
            >
              <h2>¿ Tu negocio no esta en línea ?</h2>
              <h1>¡ Publícalo aquí !</h1>
              <FaCloudUploadAlt />
            </div>
          </div>
          <div className={styles.bannerPc}>
            <Image src='/img/wallpaperPC.webp' />
            <div className={styles.container}
              onClick={userOn}
            >
              <h2>¿ Tu negocio no esta en línea ?</h2>
              <h1>¡ Publícalo aquí !</h1>
              <div>
                <FaCloudUploadAlt />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectionOne}>
          <FaMedal />
          <h1>Los más buscados</h1>
        </div>

        <NegociosBest />

        <div className={styles.sectionOne}>
          <FaStoreAlt />
          <h1>Nuevos negocios</h1>
        </div>

        <NegociosTodos />

      </div>

    </BasicLayout>
  )
}
