import styles from './Card.module.css'

// children  : le contenu placé entre <Card> et </Card>
// className : classes supplémentaires venant du parent (padding, largeur...)
// = ''      : valeur par défaut si le parent n'en passe pas
function Card({ children, className = '' }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>
}

export default Card