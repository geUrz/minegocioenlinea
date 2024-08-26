import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Button, Image } from 'semantic-ui-react'
import { FaBars, FaCloudUploadAlt, FaHome, FaList, FaSignOutAlt, FaTimes, FaUser, FaUserCircle } from 'react-icons/fa'
import styles from './TopBar.module.css'


export function TopBar() {

  const { user, logout } = useAuth()

  const router = new useRouter()

  const [menu, setMenu] = useState()

  const menuOpen = () => {
    setMenu(prevState => !prevState)
  }

  return (

    <>
      <div className={styles.containerMenu}>

        <div className={styles.logo} onClick={() => router.push('/')}>
          <Image src='/img/logo.webp' />
        </div>

        <div className={styles.menu}>
          <Link href='/'>
            <FaHome /> Home
          </Link>
          <Link href='/categorias'>
            <FaList /> Categorias
          </Link>
          <Link href='/registro'>
            <FaCloudUploadAlt /> Publicar Negocio
          </Link>
          <Link href='/nosotros'>
            ¿ Qué es <br></br>Mi Negocio en Línea ?
          </Link>
          <div className={styles.iconUser}
            onClick={user ? (
              () => router.push('/cuenta')
            ) : (
              () => router.push('/join/signin')
            )}
          >
            <FaUser />
            {!user ? (
              <h1>Iniciar sesión</h1>
            ) : (
              <h1>{user.usuario}</h1>
            )}
          </div>
        </div>

        <div className={styles.iconBar}>
          <div onClick={menuOpen}>
            {menu ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </div>
        </div>

        <div className={styles.containerMenuSide} style={{ left: menu ? '0' : '-100%' }} onClick={menuOpen}>
          <div className={styles.topMenuSide}
            onClick={user ? (
              () => router.push('/cuenta')
            ) : (
              () => router.push('/join/signin')
            )}>
            {user ? (
              <>
                <FaUserCircle />
                <h1>{user.usuario}</h1>
                <h2>ver perfil</h2>
              </>
            ) : (
              <>
                <FaUserCircle />
                <h1>Iniciar sesión</h1>
              </>
            )}
          </div>
          <div className={styles.listaMenuSide}>
            <Link href='/'>
              <div onClick={menuOpen}>
                <FaHome /> Home
              </div>
            </Link>
            <Link href='/categorias'>
              <div onClick={menuOpen}>
                <FaList /> Categorias
              </div>
            </Link>
            <Link href='/registro'>
              <div onClick={menuOpen}>
                <FaCloudUploadAlt /> Publicar Negocio
              </div>
            </Link>
            <Link href='/nosotros'>
              <div onClick={menuOpen}>
                Qué es Mi Negocio en Línea ?
              </div>
            </Link>
          </div>

          <div className={styles.mainSignOut}>
            <div className={styles.boxSignOut} onClick={logout}>
              <FaSignOutAlt />
            </div>
          </div>

        </div>

      </div>


    </>

  )
}
