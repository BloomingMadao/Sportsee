import { Link } from "react-router-dom";
import style from './NotFound.module.css'
import Logo from "../../components/Logo";
import ErrorMessage from "../../components/ErrorMessage";
function NotFound () {
    return (
        <main className={style.page}>
            <div className={style.img}>
                <Logo />
            </div>
            <div className={style.info} >
                <ErrorMessage status={404}>
                    <Link to="/dashboard">Retour au dashboard</Link>
                </ErrorMessage>
            </div>
        </main>
    )
}
export default NotFound