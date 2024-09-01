import { Button, Form, FormField, FormGroup, FormTextArea, Input, Label } from 'semantic-ui-react'
import styles from './NegocioModForm.module.css'
import { IconClose } from '@/components/Layout'
import { useState } from 'react'

export function NegocioModForm(props) {

  const {onToastSuccess, onShowModForm, formValues, handleInputChange, updateNegocio} = props

  const [errors, setErrors] = useState({})

  const validarForm = () => {
    const newErrors = {}

    if(!formValues.negocio) {
      newErrors.negocio = 'El campo es requerido'
    }

    if(!formValues.categoriaone) {
      newErrors.categoriaone = 'El campo es requerido'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
    
  }

  const onUpdateNegocio = (e) => {
    
    e.preventDefault()

    if(!validarForm()) {
      return
    }

    updateNegocio()

    onToastSuccess()

  }

  return (
    
    <>

      <IconClose onOpenClose={onShowModForm} />

        <Form>
          <FormGroup widths='equal'>
            <FormField error={!!errors.negocio}>
              <Label className={styles.formLabel}>
                Nombre de tu negocio*
              </Label>
              <Input
                name='negocio'
                type="text"
                placeholder='Nombre de tu negocio'
                value={formValues.negocio}
                onChange={handleInputChange}
              />
              {errors.negocio && <span className={styles.error}>{errors.negocio}</span>}
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Descripción (opcional)
              </Label>
              <FormTextArea
                name='descripcion'
                type="text"
                placeholder='Describe lo que ofrece tu negocio'
                value={formValues.descripcion}
                onChange={handleInputChange}
              >
              </FormTextArea>
            </FormField>
          </FormGroup>
        {/* </Form> */}

        {/* <Form> */}
          <FormGroup widths='equal'>
            <FormField error={!!errors.categoriaone}>
              <Label className={styles.formLabel}>
                Categoría 1*
              </Label>
              <FormField
                name='categoriaone'
                type="text"
                control='select'
                value={formValues.categoriaone}
                onChange={handleInputChange}
              >
                <option value=''>-- Seleccionar categoría --</option>
                <option value='alimentos'>Alimentos</option>
                <option value='belleza'>Belleza</option>
                <option value='bienes-raíces'>Bienes Raíces</option>
                <option value='escuelas-y-cursos'>Escuelas y Cursos</option>
                <option value='grupos-y-música'>Grupos y Música</option>
                <option value='mascotas'>Mascotas</option>
                <option value='oficiosvarios'>Oficios varios</option>
                <option value='rentas'>Rentas</option>
                <option value='salones-y-jardines'>Salones y Jardines</option>
                <option value='salud'>Salud</option>
                <option value='servicios-profesionales'>Servicios Profesionales</option>
                <option value='servicios-técnicos'>Servicios Técnicos</option>
                <option value='tecnología'>Tecnología</option>
                <option value='ventasvarias'>Ventas varias</option>
              </FormField>
              {errors.categoriaone && <span className={styles.error}>{errors.categoriaone}</span>}
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Categoría 2 (opcional)
              </Label>
              <FormField
                name='categoriatwo'
                type="text"
                control='select'
                value={formValues.categoriatwo}
                onChange={handleInputChange}
              >
                <option value=''>-- Seleccionar categoría --</option>
                <option value='alimentos'>Alimentos</option>
                <option value='belleza'>Belleza</option>
                <option value='bienes-raíces'>Bienes Raíces</option>
                <option value='escuelas-y-cursos'>Escuelas y Cursos</option>
                <option value='grupos-y-música'>Grupos y Música</option>
                <option value='mascotas'>Mascotas</option>
                <option value='oficiosvarios'>Oficios varios</option>
                <option value='rentas'>Rentas</option>
                <option value='salones-y-jardines'>Salones y Jardines</option>
                <option value='salud'>Salud</option>
                <option value='servicios-profesionales'>Servicios Profesionales</option>
                <option value='servicios-técnicos'>Servicios Técnicos</option>
                <option value='tecnología'>Tecnología</option>
                <option value='ventasvarias'>Ventas varias</option>
              </FormField>
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Palabras clave (opcional)
              </Label>
              <FormTextArea
                name='tags'
                type="text"
                placeholder='"Ejemplo: comida, tecnico, ventas, musica, renta, ropa, zapatos, tenis "'
                value={formValues.tags}
                onChange={handleInputChange}
              >
              </FormTextArea>
            </FormField>
          </FormGroup>
        {/* </Form> */}

        {/* <Form> */}
          <FormGroup widths='equal'>
            <FormField>
              <Label className={styles.formLabel}>
                Teléfono (opcional)
              </Label>
              <Input
                name='tel'
                type="number"
                placeholder='10 dígitos'
                value={formValues.tel}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Whatsapp (opcional)
              </Label>
              <Input
                name='whatsapp'
                type="number"
                placeholder='10 dígitos'
                value={formValues.whatsapp}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Facebook (opcional)
              </Label>
              <Input
                name='facebook'
                type="text"
                placeholder='miperfil'
                value={formValues.facebook}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Correo (opcional)
              </Label>
              <Input
                name='email'
                type="email"
                placeholder='www.minegocio.com'
                value={formValues.email}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Sitio web (opcional)
              </Label>
              <Input
                name='web'
                type="text"
                placeholder='www.minegocio.com'
                value={formValues.web}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Ubicación (opcional)
              </Label>
              <Input
                name='ubicacion'
                type="text"
                placeholder='Fracc. Nuevo, Calle Nueva, # 2098'
                value={formValues.ubicacion}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Mapa (opcional)
              </Label>
              <Input
                name='mapa'
                type="text"
                placeholder=''
                value={formValues.mapa}
                onChange={handleInputChange}
              />
            </FormField>
          </FormGroup>
          <Button
            primary
            onClick={onUpdateNegocio}
          >
            Guardar
          </Button>

        </Form>

    </>

  )
}
