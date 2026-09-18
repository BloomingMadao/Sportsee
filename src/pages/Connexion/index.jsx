import ConnexionForm from "../../components/ConnexionForm"
import Image from "../../assets/hero.png"
import './Connexion.css'
//TODO: Faire le style du formulaire de connexion
//Ajouter un components Image pour l'image a coté du formulaire de connexion

function Connexion () {
    return(
        <>
        <div className="main-content">
            <ConnexionForm/>
            <img src={Image} alt="image" className="img"/>
        </div>
        </>
    )
}

export default Connexion