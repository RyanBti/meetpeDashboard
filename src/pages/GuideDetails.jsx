import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./GuideDetails.css";

const GuideDetails = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Charger les détails du guide
    fetch(`http://localhost:5000/guides/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur API Guide: 404");
        }
        return response.json();
      })
      .then((data) => {
        console.log("📌 Guide récupéré :", data);
        setGuide(data);
      })
      .catch((error) => console.error("❌ Erreur lors du chargement du guide :", error));

    // Charger les expériences liées au guide
    fetch(`http://localhost:5000/experiences?guideId=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur API Expériences: 404");
        }
        return response.json();
      })
      .then((data) => {
        console.log("🔍 Expériences récupérées :", data);
        setExperiences(data);
      })
      .catch((error) => console.error("❌ Erreur lors du chargement des expériences :", error));
  }, [id]);

  if (!guide) return <p className="loading-message">Chargement des détails...</p>;

  return (
    <div className="guide-details-container">
      <h2 className="title">Détails du Guide</h2>

      {/* Grille d'infos principales */}
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

      {/* Expériences Proposées */}
      <div className="experiences-section">
        <h3>Expériences Proposées</h3>
        <table className="experiences-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Durée</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.length > 0 ? (
              experiences.map((experience) => (
                <tr key={experience.id}>
                  <td>{experience.title}</td>
                  <td>{experience.description}</td>
                  <td>{experience.duration}</td>
                  <td>{experience.price}</td>
                  <td className={`status-${experience.status.toLowerCase()}`}>
                    {experience.status}
                  </td>
                  <td>
                    <Link to={`/experience/${experience.id}`} className="details-btn">
                      Voir Détails
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-experience">Aucune expérience disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuideDetails;
