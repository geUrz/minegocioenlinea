import { BasicLayout } from '@/layouts'
import { NegocioRegistroForm } from '@/components/Negocios'
import { useState } from 'react'
import ProtectedRouteNegocio from '@/components/Layout/ProtectedRouteNegocio/ProtectedRouteNegocio'
import styles from './registro.module.css'
import { ToastSuccess } from '@/components/Layout'

export default function Registro() {
  const [reload, setReload] = useState(false)

  const onReload = () => setReload(prevState => !prevState)

  const [toastSuccessNegocio, setToastSuccessNegocio] = useState(false)

  const onToastSuccessNegocio = () => {
    setToastSuccessNegocio(true)
    setTimeout(() => {
      setToastSuccessNegocio(false)
    }, 3000)
  }

  return (
    <ProtectedRouteNegocio>
      <BasicLayout relative>

        {toastSuccessNegocio && <ToastSuccess contain='Negocio creado exitosamente' onClose={() => setToastSuccessNegocio(false)} />}

        <NegocioRegistroForm reload={reload} onReload={onReload} onToastSuccessNegocio={onToastSuccessNegocio} />

      </BasicLayout>
    </ProtectedRouteNegocio>
  )
}
