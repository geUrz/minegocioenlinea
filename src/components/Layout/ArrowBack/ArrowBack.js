import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa'
import styles from './ArrowBack.module.css'

export function ArrowBack(props) {

  const {title} = props

  const router = useRouter()

  return (

    <div className={styles.iconArrow}>
      <div>
        <FaChevronLeft
          onClick={() => router.back()}
        />
      </div>
      <h1>{title}</h1>
    </div>

  )
}
