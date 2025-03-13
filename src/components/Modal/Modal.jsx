import React from "react";
import "./Modal.css";

const Modal = ({ user, closeModal }) => {
  if (!user) return null; // Évite l'affichage d'un modal vide

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Détails du Guide</h2>

        {/* Section Informations personnelles */}
        <div className="modal-section">
          <h3>🧑‍💼 Personal Information</h3>
          <p><strong>Nom et prénom :</strong> {user.name}</p>
          <p><strong>Téléphone :</strong> {user.phone}</p>
          <p><strong>Email :</strong> {user.email}</p>
        </div>

        {/* Section Adresse */}
        <div className="modal-section">
          <h3>📍 Address</h3>
          <p><strong>Rue :</strong> {user.address || "Non renseigné"}</p>
          <p><strong>Code Postal :</strong> {user.zip || "Non renseigné"}</p>
          <p><strong>Ville :</strong> {user.city || "Non renseigné"}</p>
          <p><strong>Pays :</strong> {user.country || "Non renseigné"}</p>
        </div>

        {/* Section Coordonnées bancaires */}
        <div className="modal-section">
          <h3>🏦 Coordonnées Bancaires</h3>
          <p><strong>IBAN :</strong> {user.iban || "Pas trouvé"}</p>
          <p><strong>BIC :</strong> {user.bic || "Pas trouvé"}</p>
          <p><strong>Nom du Titulaire :</strong> {user.accountHolder || "Pas trouvé"}</p>
        </div>

        {/* Section Information de l'appareil */}
        <div className="modal-section">
          <h3>📱 Device Information</h3>
          <p><strong>Modèle :</strong> {user.deviceModel || "Non renseigné"}</p>
          <p><strong>Marque :</strong> {user.deviceBrand || "Non renseigné"}</p>
          <p><strong>OS :</strong> {user.osVersion || "Non renseigné"}</p>
          <p><strong>Version de l'App :</strong> {user.appVersion || "Non renseigné"}</p>
        </div>

        {/* Section Documents */}
        <div className="modal-section">
          <h3>🆔 Identity Documents</h3>
          <div className="identity-docs">
            <img src={user.idFront || "placeholder.png"} alt="Pièce Identité" />
            <img src={user.idBack || "placeholder.png"} alt="Pièce Identité Verso" />
            <img src={user.kbis || "placeholder.png"} alt="KBIS" />
          </div>
        </div>

        <button className="close-btn" onClick={closeModal}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;
