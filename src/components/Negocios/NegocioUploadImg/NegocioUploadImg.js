import { Button, Form, FormField, FormGroup, Image, Input, Message } from 'semantic-ui-react'
import { useState } from 'react';
import styles from './NegocioUploadImg.module.css'
import { IconClose } from '@/components/Layout';
import axios from 'axios';

export function NegocioUploadImg(props) {

  const { reload, onReload, negocio, onShowSubirImg, onShowCambiarImg } = props

  const [fileName, setFileName] = useState('No se ha seleccionado ningún archivo');

  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState('')

  const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 1 * 150 * 150

  const handleImageSelect = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado

    if (!file) {
        // Si no se selecciona ningún archivo, simplemente salimos de la función
        return;
    }

    setFileName(file.name);

    // Validar tipo de archivo
    if (!acceptedTypes.includes(file.type)) {
        setError('Tipo de archivo no permitido. Solo se aceptan imágenes JPEG, PNG y WEBP.');
        return;
    }

    // Validar tamaño del archivo
    if (file.size > maxSize) {
        setError('El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.');
        return;
    }

    // Si pasa las validaciones, previsualizar la imagen y limpiar errores previos
    setError('');
    const imageUrl = URL.createObjectURL(file); // Crear una URL temporal para la previsualización
    setSelectedImage(imageUrl);
};


  const handleImageUpload = async () => {
    const file = document.querySelector('input[type="file"]').files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'minegocioenlinea-preset'); // Reemplaza con tu upload preset de Cloudinary

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dwi6j5wmy/image/upload', formData); // Reemplaza con tu cloud name
      const imageUrl = res.data.secure_url;

      // Ahora actualizamos solo la URL de la imagen en la base de datos
      await axios.put(`/api/negocios/negocios?id=${negocio.id}`, { image: imageUrl });

      setError('')
      onReload()

      if(!negocio.image){
        onShowSubirImg()
      } else{
        onShowCambiarImg()
      }

    } catch (error) {
      setError('Error al subir la imagen. Inténtalo de nuevo.');
      console.error('Error al subir la imagen:', error);
    }
  }

  return (

    <>

      <IconClose
        onOpenClose={
          !negocio.image ? (
            onShowSubirImg
          ) : (
            onShowCambiarImg
          )
        }
      />

      <div className={styles.main}>
        <div className={styles.img}>
          {selectedImage ? (
            <Image src={selectedImage} width='150px' height='150px' />
          ) : (
            ''
          )}
        </div>
        <Form>
          <FormGroup widths='equal'>
          <FormField>
              <label htmlFor="file" className="ui icon button">
                <Button as="span" primary>
                  {!selectedImage ? (
                    'Seleccionar imagen'
                  ) : (
                    'Cambiar imagen'
                  )}
                </Button>
              </label>
              <input
                id="file"
                type="file"
                hidden
                onChange={handleImageSelect}
              />
              <span>{fileName}</span>
              {error && <Message negative>{error}</Message>}
              <h1>Tamaño: alto 150px - ancho 150px</h1>
              <h1>Formatos: png, jpg y webp</h1>
              <Button onClick={handleImageUpload} secondary disabled={!selectedImage}>
                Subir Imagen
              </Button>
            </FormField>
          </FormGroup>
        </Form>
      </div>

    </>
  )
}
