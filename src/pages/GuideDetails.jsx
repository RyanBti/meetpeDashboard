import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./GuideDetails.css";

const GuideDetails = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/guides/${id}`)
      .then((response) => response.json())
      .then((data) => setGuide(data))
      .catch((error) => console.error("Erreur lors du chargement du guide :", error));
  }, [id]);

  if (!guide) return <p>Chargement des détails...</p>;

  return (
    <div className="guide-details-container">
      <h2 className="guide-title">Détails du Guide</h2>

      {/* Grille d'informations */}
      <div className="info-grid">
        <div className="info-card">
          <h3>Informations Personnelles</h3>
          <p><strong>Nom :</strong> {guide.name}</p>
          <p><strong>Email :</strong> {guide.email}</p>
          <p><strong>Téléphone :</strong> {guide.phone}</p>
        </div>

        <div className="info-card">
          <h3>Adresse</h3>
          <p><strong>Rue :</strong> {guide.address}</p>
          <p><strong>Ville :</strong> {guide.city}</p>
          <p><strong>Code Postal :</strong> {guide.zip}</p>
          <p><strong>Pays :</strong> {guide.country}</p>
        </div>

        <div className="info-card">
          <h3>Coordonnées Bancaires</h3>
          <p><strong>IBAN :</strong> {guide.iban}</p>
          <p><strong>BIC :</strong> {guide.bic}</p>
          <p><strong>Nom du Titulaire :</strong> {guide.accountHolder}</p>
        </div>
      </div>

      {/* Section des documents */}
      <div className="documents-section">
        <h3>Documents d'Identité</h3>
        <div className="document-list">
          {guide.documents?.map((doc) => (
            <div key={doc.id} className="document-card">
              <p>{doc.type}</p>
              <img src={doc.url} alt={doc.type} width="100%" />
            </div>
          ))}
        </div>
      </div>

      {/* Expériences Proposées */}
      <div className="experiences-section">
        <h3>Expériences Proposées</h3>
        <table className="experiences-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Durée</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guide.experiences?.map((experience) => (
              <tr key={experience.id}>
                <td>{experience.description}</td>
                <td>{experience.duration}</td>
                <td>{experience.price}</td>
                <td className={experience.status === "Acceptée" ? "status-accepted" : "status-rejected"}>
                  {experience.status}
                </td>
                <td>
                  <Link to={`/experience/${experience.id}`} className="details-btn">
                    Voir Détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuideDetails;
