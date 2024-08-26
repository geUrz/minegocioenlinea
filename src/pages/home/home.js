import { BasicLayout } from "@/layouts"
import { Image } from "semantic-ui-react"
import { NegociosTodos, NegociosBest } from "@/components/Negocios"
import { PublicarNegocio } from "@/components/Home"
import styles from './home.module.css'
import { FaMedal, FaStore } from "react-icons/fa"
import { ToastSuccess } from "@/components/Layout"
import { useState } from "react"

export default function Home() {

  return (
    <BasicLayout relative>

      <div className={styles.containerHome}>

        <div className={styles.containerHomebanner}>
          <div className={styles.bannerMobile}>
            <Image src='/img/wallpaperMobil.webp' />
          </div>
          <div className={styles.bannerPc}>
            <Image src='/img/wallpaperPC.webp' />
          </div>
        </div>

        <PublicarNegocio />

        <div className={styles.sectionOne}>
          <FaMedal />
          <h1>Los más buscados</h1>
        </div>

        <NegociosBest />

        <div className={styles.sectionOne}>
          <FaStore />
          <h1>Nuevos negocios</h1>
        </div>

        <NegociosTodos />

      </div>

    </BasicLayout>
  )
}
