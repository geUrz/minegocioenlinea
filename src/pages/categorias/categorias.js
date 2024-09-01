import { BasicLayout } from '@/layouts'
import styles from './categorias.module.css'
import { BoxCategoria } from '@/components/Categorias'
import { FaBriefcase, FaBullhorn, FaCity, FaGraduationCap, FaGuitar, FaHammer, FaHeartbeat, FaHotel, FaPaw, FaShopify, FaShoppingBag, FaSpa, FaTabletAlt, FaTools, FaUtensils } from 'react-icons/fa'
import { ArrowBack } from '@/components/Layout/ArrowBack'

export default function categorias() {
  return (

    <BasicLayout relative>

      <ArrowBack title='categorias' />

      <div className={styles.main}>
        <div className={styles.section}>
          <BoxCategoria 
            link='alimentos'
            title='alimentos'>
              <FaUtensils />
          </BoxCategoria>

          <BoxCategoria 
            link='belleza'
            title='belleza'>
              <FaSpa />
          </BoxCategoria>

          <BoxCategoria 
            link='bienes-raíces'
            title='bienes raíces'>
              <FaCity />
          </BoxCategoria>

          <BoxCategoria 
            link='escuelas-y-cursos'
            title='escuelas y cursos'>
              <FaGraduationCap />
          </BoxCategoria>
          
          <BoxCategoria 
            link='grupos-y-música'
            title='grupos y música'>
              <FaGuitar />
          </BoxCategoria>

          <BoxCategoria 
            link='mascotas'
            title='mascotas'>
             <FaPaw />
          </BoxCategoria>

          <BoxCategoria 
            link='oficios-varios'
            title='oficios varios'>
              <FaHammer />
          </BoxCategoria>

          <BoxCategoria 
            link='rentas'
            title='rentas'>
              <FaBullhorn />
          </BoxCategoria>

          <BoxCategoria 
            link='salones-y-jardines'          
            title='salones y jardines'>
              <FaHotel />
          </BoxCategoria>

          <BoxCategoria 
            link='salud'
            title='salud'>
              <FaHeartbeat />
          </BoxCategoria>

          <BoxCategoria 
            link='servicios-profesionales'
            title='servicios profesionales'>
              <FaBriefcase />
          </BoxCategoria>

          <BoxCategoria 
            link='servicios-técnicos'
            title='servicios técnicos'>
              <FaTools />
          </BoxCategoria>

          <BoxCategoria 
            link='tecnología'
            title='tecnología'>
              <FaTabletAlt />
          </BoxCategoria>

          <BoxCategoria 
            link='ventas-varias'
            title='ventas varias'>
              <FaShoppingBag />
          </BoxCategoria>

        </div>
      </div>

    </BasicLayout>

  )
}
