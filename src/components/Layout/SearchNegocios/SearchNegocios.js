import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchNegocios.module.css';
import { Input } from 'semantic-ui-react';
import { NegocioList } from '../NegocioList/NegocioList.js';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';

export function SearchNegocios(props) {

  const {onResults, onOpenCloseSearch} = props

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [negocios, setNegocios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === '') {
        setNegocios([]); // Limpiar resultados si no hay texto en el input
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`/api/negocios/negocios?search=${query}`);
        setNegocios(response.data);
      } catch (err) {
        setError('No se encontraron negocios');
        setNegocios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className={styles.main}>

      <div className={styles.input}>
        <Input
          type="text"
          placeholder="Buscar negocios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
          loading={loading}
        />
        <div className={styles.iconSearch} onClick={onOpenCloseSearch}>
          <FaTimesCircle />
        </div>
      </div>

      <div className={styles.negocioLista}>
        {error && <p>{error}</p>}
        {negocios.length > 0 && (
          <div className={styles.resultsContainer}>
            <NegocioList negocios={negocios} onOpenCloseSearch={onOpenCloseSearch} />
          </div>
        )}
      </div>
    </div>
  )
}
