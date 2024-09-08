import { IconClose } from '@/components/Layout';
import styles from './NegocioBestForm.module.css';
import { Button, Form, FormField, FormGroup } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';

export function NegocioBestForm(props) {
  const { negocioId, onOpenClose } = props;
  
  const [formValues, setFormValues] = useState({ best: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const validarForm = () => {
    const newErrors = {};

    if (!formValues.best) {
      newErrors.best = 'El campo es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {

    e.preventDefault()

    if (!validarForm()) {
      return;
    }

    try {
      await axios.put(`/api/negocios/updateBest?id=${negocioId}`, { best: formValues.best });

      onOpenClose();
    } catch (error) {
      console.error('Error al actualizar la columna best:', error);
    }
  };

  return (
    <>
      <IconClose onOpenClose={onOpenClose} />

      <Form>
        <FormGroup widths='equal'>
          <FormField error={!!errors.best}>
            <FormField
              name='best'
              control='select'
              value={formValues.best}
              onChange={handleInputChange}
            >
              <option value=''></option>
              <option value='true'>Sí</option>
              <option value='false'>No</option>
            </FormField>
            {errors.best && <span className={styles.error}>{errors.best}</span>}
          </FormField>
        </FormGroup>
        <Button primary onClick={onSubmit}>
          Guardar
        </Button>
      </Form>
    </>
  );
}
