import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaAddressCard, FaCheck, FaEdit, FaEnvelope, FaFacebook, FaGlobe, FaImage, FaMapMarkerAlt, FaMobileAlt, FaStoreSlash, FaTimes, FaTrash, FaWhatsapp } from 'react-icons/fa'
import { size } from 'lodash'
import Link from 'next/link'
import { Confirm } from '@/components/Layout'
import { BasicModal } from '@/layouts'
import { NegocioModForm } from '../NegocioModForm'
import styles from './NegocioById.module.css'

export function NegocioById(props) {
  
  const { user, onToastSuccess, onToastDelete } = props
  
  const [negocio, setNegocio] = useState([])
  const [formValues, setFormValues] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModForm, setShowModForm] = useState(false)
  
  const onShowConfirm = () => setShowConfirm((prevState) => !prevState)
  const onShowModForm = () => setShowModForm((prevState) => !prevState)
  
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
  }, [user.id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const updateNegocio = async () => {
    try {
      await axios.put(`/api/negocios/negocios?id=${negocio.id}`, formValues)
      setNegocio(formValues)  // Actualiza los datos del negocio en el estado
      onShowModForm()  // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar el negocio:', error)
    }
  }

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
          <div className={styles.img}>
            <FaImage />
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
                Whatsapp
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
              <FaEdit onClick={onShowModForm} />
            </div>
            <div onClick={onShowConfirm}>
              <FaTrash />
            </div>
          </div>

        </div>
      )}

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
