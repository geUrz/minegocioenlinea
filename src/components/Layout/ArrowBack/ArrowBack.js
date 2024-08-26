import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa'
import styles from './ArrowBack.module.css'

export function ArrowBack(props) {

  const {title} = props

  const router = useRouter()

  return (

    <div className={styles.iconArrow}>
      <FaChevronLeft
        onClick={() => router.back()}
      />
      <h1>{title}</h1>
    </div>

  )
}
