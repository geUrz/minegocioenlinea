import { Button, Form, FormField, FormGroup, Label, TextArea } from 'semantic-ui-react'
import { useState } from 'react'
import { ToastSuccess } from '@/components/Layout'
import axios from 'axios'
import styles from './NosotrosForm.module.css'

export function NosotrosForm() {

  const [toastSuccessMensaje, setToastSuccessMensaje] = useState(false)

  const onToastSuccessMensaje = () => {
    setToastSuccessMensaje(true)
    setTimeout(() => {
      setToastSuccessMensaje(false)
    }, 3000)
  }

  const [mensaje, setMensaje] = useState('')

  const [errors, setErrors] = useState({})

  const validarForm = () => {
    const newErrors = {}

    if (!mensaje) {
      newErrors.mensaje = 'El campo es requerido'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0

  }

  const crearMensaje = async (e) => {

    e.preventDefault()

    if (!validarForm()) {
      return
    }

    try {
      await axios.post('/api/nosotros/nosotros', {
        mensaje,
      })

      setMensaje('')

      onToastSuccessMensaje()

    } catch (error) {
      console.error('Error al crear el mensaje:', error)
    }

  }

  return (

    <>

      {toastSuccessMensaje && <ToastSuccess contain='Mensaje enviado exitosamente' onClose={() => setToastSuccessMensaje(false)} />}

      <div className={styles.main}>

        <div className={styles.title}>
          <h1>¡ Envíanos un mensaje con dudas o sugerencias !</h1>
        </div>

        <div className={styles.textArea}>
          <Form>
            <FormGroup widths='equal'>
              <FormField error={!!errors.mensaje}>
                <TextArea
                  name='mensaje'
                  type="text"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
                {errors.mensaje && <span className={styles.error}>{errors.mensaje}</span>}
                <Button primary onClick={crearMensaje}>
                  Enviar
                </Button>
              </FormField>
            </FormGroup>
          </Form>
        </div>

      </div>

    </>

  )
}
