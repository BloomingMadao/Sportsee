import { getErrorMessage } from '../../services/errorMessages'
import style from './ErrorMessage.module.css'

function ErrorMessage ({status,message,children}) {
    return (
        <div className={style.info}>
            <h1>{status===0 ? 'Oups' : status}</h1>
            <p>{message ?? getErrorMessage(status)}</p>
            {children}
        </div>
    )

}
export default ErrorMessage
