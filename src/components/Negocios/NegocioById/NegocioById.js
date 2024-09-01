import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaAddressCard, FaCheck, FaEdit, FaEnvelope, FaFacebook, FaGlobe, FaImage, FaMapMarkerAlt, FaMobileAlt, FaStoreSlash, FaTimes, FaTrash, FaWhatsapp } from 'react-icons/fa'
import { size } from 'lodash'
import Link from 'next/link'
import { Confirm } from '@/components/Layout'
import { BasicModal } from '@/layouts'
import { NegocioModForm } from '../NegocioModForm'
import styles from './NegocioById.module.css'
import { Button, Image} from 'semantic-ui-react'
import { NegocioUploadImg } from '../NegocioUploadImg'

export function NegocioById(props) {

  const { user, onToastSuccess, onToastDelete } = props

  const [reload, setReload] = useState(false)

  const onReload = () => setReload((prevState) => !prevState)

  const [negocio, setNegocio] = useState([])
  const [formValues, setFormValues] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModForm, setShowModForm] = useState(false)
  const [showSubirImg, setShowSubirImg] = useState(false)
  const [showCambiarImg, setShowCambiarImg] = useState(false)

  const onShowConfirm = () => setShowConfirm((prevState) => !prevState)
  const onShowModForm = () => setShowModForm((prevState) => !prevState)
  const onShowSubirImg = () => setShowSubirImg((prevState) => !prevState)
  const onShowCambiarImg = () => setShowCambiarImg((prevState) => !prevState)

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/negocios/negocios?usuario_id=${user.id}`)
        setNegocio(res.data)
        setFormValues(res.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [reload, user.id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const updateNegocio = async () => {
    try {
      const response = await axios.put(`/api/negocios/negocios?id=${negocio.id}`, formValues);
      const updatedNegocio = { ...formValues, slug: response.data.slug }; // Asegúrate de incluir el slug en el estado actualizado
      setNegocio(updatedNegocio); // Actualiza el estado con el negocio modificado
      onShowModForm();  // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar el negocio:', error);
    }
  };

  const delNegocio = async () => {
    try {
      await axios.delete(`/api/negocios/negocios?id=${negocio.id}`)
      setNegocio([])
      onShowConfirm()
      onToastDelete()
    } catch (error) {
      console.error('Error al eliminar el negocio:', error)
    }
  }

  const deleteImage = async () => {
    try {
      await axios.delete(`/api/negocios/negocios?id=${negocio.id}&deleteImage=true`);
      setNegocio({
        ...negocio,
        image: null, // Actualiza el estado local para reflejar la eliminación
      });
      console.log('Imagen eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };





  return (

    <>

      {size(negocio) === 0 ? (
        <div className={styles.noShop}>
          <FaStoreSlash />
          <h2>Sin negocio publicado</h2>
          <Link href='registro'>
            Publicar negocio
          </Link>
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.section}>
            <div className={styles.img}>
              {!negocio.image ? (
                <FaImage />
              ) : (
                <Image src={negocio.image} />
              )}
            </div>

            <div className={styles.editImg}>
              {!negocio.image ? (
                <Button secondary size='mini' onClick={onShowSubirImg}>
                  Subir imagen
                </Button>
              ) : (
                <Button secondary size='mini' onClick={onShowCambiarImg}>
                  Cambiar imagen
                </Button>
              )}
              <FaTrash onClick={deleteImage} />
            </div>

            <h1>{negocio.negocio}</h1>
            <p>{
              !negocio.descripcion ? (
                'No disponible'
              ) : (
                negocio.descripcion
              )}

            </p>
            <div>
              <FaMobileAlt />
              <h2>{
                !negocio.tel ? (
                  'No disponible'
                ) : (
                  negocio.tel
                )
              }</h2>
            </div>
            <div>
              <FaWhatsapp />
              <h2>{
                !negocio.whatsapp ? (
                  'No disponible'
                ) : (
                  negocio.whatsapp
                )
              }</h2>
            </div>
            <div>
              <FaFacebook />
              <h2>{
                !negocio.facebook ? (
                  'No disponible'
                ) : (
                  negocio.facebook
                )
              }</h2>
            </div>
            <div>
              <FaEnvelope />
              <h2>{
                !negocio.email ? (
                  'No disponible'
                ) : (
                  negocio.email
                )
              }</h2>
            </div>
            <div>
              <FaGlobe />
              <h2>{
                !negocio.web ? (
                  'No disponible'
                ) : (
                  <Link href={`${negocio.web}`} target="_blank">
                    {negocio.web}
                  </Link>
                )
              }</h2>
            </div>
            <div>
              <FaAddressCard />
              <h2>{
                !negocio.ubicacion ? (
                  'No disponible'
                ) : (
                  negocio.ubicacion
                )
              }</h2>
            </div>
            <div>
              <FaMapMarkerAlt />
              {!negocio.mapa ? (
                <h2>Mapa no disponible</h2>
              ) : (
                <Link href={`${negocio.mapa}`} target="_blank">
                  Click para ver la ubicación en el mapa
                </Link>
              )}
            </div>

            <div className={styles.iconEditTrash}>
              <div>
                <Button secondary size='mini' onClick={onShowModForm}>
                  Editar negocio
                </Button>
              </div>
              <div onClick={onShowConfirm}>
                <FaTrash />
              </div>
            </div>
          </div>
        </div>
      )}

      <BasicModal title='subir imagen' show={showSubirImg} onClose={onShowSubirImg}>
        <NegocioUploadImg reload={reload} onReload={onReload} negocio={negocio} onShowSubirImg={onShowSubirImg} />
      </BasicModal>

      <BasicModal title='cambiar imagen' show={showCambiarImg} onClose={onShowCambiarImg}>
        <NegocioUploadImg reload={reload} onReload={onReload} negocio={negocio} onShowCambiarImg={onShowCambiarImg} />
      </BasicModal>

      <BasicModal title='modificar negocio' show={showModForm} onClose={onShowModForm}>
        <NegocioModForm
          onShowModForm={onShowModForm}
          onToastSuccess={onToastSuccess}
          formValues={formValues}
          handleInputChange={handleInputChange}
          updateNegocio={updateNegocio}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        cancelButton={
          <div className={styles.iconClose}>
            <FaTimes />
          </div>
        }
        confirmButton={
          <div className={styles.iconCheck}>
            <FaCheck />
          </div>
        }
        onConfirm={delNegocio}
        onCancel={onShowConfirm}
        content='¿Estás seguro de eliminar el negocio?'
      />

    </>

  )
}
