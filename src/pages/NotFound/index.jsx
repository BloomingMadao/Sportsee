import { Link } from "react-router-dom";

function NotFound () {
    return (
        <div>
            <h1>404</h1>
            <p>Cette page n'existe pas.</p>
            <Link to="/dashboard">Retour au dashboard</Link>
        </div>
    )
}
export default NotFound