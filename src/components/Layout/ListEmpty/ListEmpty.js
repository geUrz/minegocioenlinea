import { FaStoreAlt, FaTimesCircle } from 'react-icons/fa'
import styles from './ListEmpty.module.css'
import classNames from 'classnames'

export function ListEmpty(props) {

  const {listEmpty} = props

  const listEmptyClass = classNames({
    [styles.listEmptyMain]: listEmpty === 0,
    [styles.listEmptyLarge]: listEmpty === 1
  })

  return (

    <div className={listEmptyClass}>
      <div>
        <FaStoreAlt />
        <FaTimesCircle />
      </div>
    </div>

  )
}
