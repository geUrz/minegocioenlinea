import { FaCartPlus, FaEdit, FaFolderPlus, FaGooglePlus, FaRegPlusSquare, FaTimes } from 'react-icons/fa'
import styles from './NegocioRegistroForm.module.css'
import { Button, Form, FormField, FormGroup, FormTextArea, Input, Label } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'

export function NegocioRegistroForm(props) {

  const {user} = useAuth()
  const router = useRouter()

  const [negocio, setNegocio] = useState('')
  const [slug, setSlug] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoriaone, setCategoriaone] = useState('')
  const [categoriatwo, setCategoriatwo] = useState('')
  const [tags, setTags] = useState('')
  const [tel, setTel] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [facebook, setFacebook] = useState('')
  const [email, setEmail] = useState('')
  const [web, setWeb] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [mapa, setMapa] = useState('')

  const {onToastSuccessNegocio} = props

  const [errors, setErrors] = useState({})

  const validarForm = () => {
    const newErrors = {}

    if(!negocio) {
      newErrors.negocio = 'El campo es requerido'
    }

    if(!categoriaone) {
      newErrors.categoriaone = 'El campo es requerido'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
    
  }

  // Función para generar el slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')  // Elimina caracteres especiales
      .replace(/\s+/g, '-')          // Reemplaza espacios con guiones
      .trim()
  }

  // Actualizar el valor del slug cada vez que cambia el nombre del negocio
  const handleNegocioChange = (e) => {
    const value = e.target.value
    setNegocio(value)
    setSlug(generateSlug(value))
  }

  const crearNegocio = async (e) => {

    e.preventDefault()

    if(!validarForm()) {
      return
    }

    try {
      await axios.post('/api/negocios/negocios',{
        negocio,
        slug,
        descripcion,
        categoriaone,
        categoriatwo,
        tags,
        tel,
        whatsapp,
        facebook,
        email,
        web,
        ubicacion,
        mapa,
        usuario_id: user.id
      })

      setNegocio('')
      setSlug('')
      setDescripcion('')
      setCategoriaone('')
      setCategoriatwo('')
      setTags('')
      setTel('')
      setWhatsapp('')
      setFacebook('')
      setEmail('')
      setWeb('')
      setUbicacion('')
      setMapa('')

      onToastSuccessNegocio()
      router.push('/')

    } catch (error) {
        console.error('Error al crear el negocio:', error)
    }

  }

  return (

    <div className={styles.main}>

      <div className={styles.container}>

        <div className={styles.steps}>
          <h1>crear negocio</h1>
          <h2>1. Pon nombre a tu negocio y describe lo que ofrece</h2>
        </div>

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
                value={negocio}
                onChange={handleNegocioChange}
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
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              >
              </FormTextArea>
            </FormField>
          </FormGroup>
        {/* </Form> */}

        <div className={styles.steps}>
          <h2>2. Elige categorías y escribe palabras clave para que encuentren tu negocio fácilmente</h2>
        </div>

          <FormGroup widths='equal'>
            <FormField error={!!errors.categoriaone}>
              <Label className={styles.formLabel}>
                Categoría 1*
              </Label>
              <FormField
                name='categoriaone'
                type="text"
                control='select'
                value={categoriaone}
                onChange={(e) => setCategoriaone(e.target.value)}
              >
                <option value=''></option>
                <option value='alimentos'>Alimentos</option>
                <option value='belleza'>Belleza</option>
                <option value='bienes-raíces'>Bienes Raíces</option>
                <option value='escuelas-y-cursos'>Escuelas y Cursos</option>
                <option value='grupos-y-música'>Grupos y Música</option>
                <option value='mascotas'>Mascotas</option>
                <option value='oficios-varios'>Oficios varios</option>
                <option value='rentas'>Rentas</option>
                <option value='salones-y-jardines'>Salones y Jardines</option>
                <option value='salud'>Salud</option>
                <option value='servicios-profesionales'>Servicios Profesionales</option>
                <option value='servicios-técnicos'>Servicios Técnicos</option>
                <option value='tecnología'>Tecnología</option>
                <option value='ventas-varias'>Ventas varias</option>
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
                value={categoriatwo}
                onChange={(e) => setCategoriatwo(e.target.value)}
              >
                <option value=''></option>
                <option value='alimentos'>Alimentos</option>
                <option value='belleza'>Belleza</option>
                <option value='bienes-raíces'>Bienes Raíces</option>
                <option value='escuelas-y-cursos'>Escuelas y Cursos</option>
                <option value='grupos-y-música'>Grupos y Música</option>
                <option value='mascotas'>Mascotas</option>
                <option value='oficios-varios'>Oficios varios</option>
                <option value='rentas'>Rentas</option>
                <option value='salones-y-jardines'>Salones y Jardines</option>
                <option value='salud'>Salud</option>
                <option value='servicios-profesionales'>Servicios Profesionales</option>
                <option value='servicios-técnicos'>Servicios Técnicos</option>
                <option value='tecnología'>Tecnología</option>
                <option value='ventas-varias'>Ventas varias</option>
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
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </FormField>
          </FormGroup>

        <div className={styles.steps}>
          <h2>3. Agrega todas las formas de contacto</h2>
        </div>

          <FormGroup widths='equal'>
            <FormField>
              <Label className={styles.formLabel}>
                Teléfono (opcional)
              </Label>
              <Input
                name='tel'
                type="number"
                placeholder='10 dígitos'
                value={tel}
                onChange={(e) => setTel(e.target.value)}
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
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
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
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={web}
                onChange={(e) => setWeb(e.target.value)}
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
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
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
                value={mapa}
                onChange={(e) => setMapa(e.target.value)}
              />
            </FormField>
          </FormGroup>
          <Button
            primary
            onClick={crearNegocio}
          >
            Crear
          </Button>

        </Form>

      </div>

    </div>

  )
}
