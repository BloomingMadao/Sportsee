
// export async function connexionAction({ request }) {
//     const formData = await request.formData();
//     const username = formData.get("username");
//     const password = formData.get("password");

//     const response = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ username, password })
//     });

//     if (!response.ok) {
//         throw new Error("Erreur lors de la connexion");
//     }

//     const data = await response.json();
//     console.log("Connexion réussie :", data);

//     return redirect("/dashboard");
// }

function ConnexionForm(){
    return (
        // <Form method="post" className="connexion-form">
        //     <div className="form-group">
        //         <label htmlFor="username">Nom d'utilisateur</label>
        //         <input type="text" name="username" id="username" required />
        //     </div>
        //     <div className="form-group">
        //         <label htmlFor="password">Mot de passe</label>
        //         <input type="password" name="password" id="password" required />
        //     </div>
        //     <button type="submit">Se connecter</button>
        // </Form>

        <h1>Test</h1>
    )
}

export default ConnexionForm