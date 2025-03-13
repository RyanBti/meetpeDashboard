import React from "react";

const Login = () => {
  return (
    <div>
      <h2>Connexion</h2>
      <form>
        <label>Email :</label>
        <input type="email" placeholder="Entrez votre email" />

        <label>Mot de passe :</label>
        <input type="password" placeholder="Entrez votre mot de passe" />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login; // Vérifie bien que cet export est présent
