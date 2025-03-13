import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./GuideDetails.css";

const GuideDetails = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [status, setStatus] = useState("En attente");

  useEffect(() => {
    fetch(`http://localhost:5000/guides/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGuide(data);
        setStatus(data.status || "En attente");
      })
      .catch((error) =>
        console.error("Erreur lors du chargement du guide :", error)
      );

    fetch(`http://localhost:5000/experiences?guideId=${id}`)
      .then((response) => response.json())
      .then((data) => setExperiences(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des expériences :", error)
      );
  }, [id]);

  if (!guide) return <p>Chargement des détails...</p>;

  // 🔄 Fonction pour changer et sauvegarder le statut
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    fetch(`http://localhost:5000/guides/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur lors de la mise à jour du statut");
        return response.json();
      })
      .catch((error) => console.error("Erreur de mise à jour :", error));
  };

  return (
    <div className="guide-details-container">
      <h2 className="guide-title">DÉTAILS DU GUIDE</h2>

      <div className="info-grid">
        {/* 📌 Informations personnelles */}
        <div className="info-card">
          <h3>Informations Personnelles</h3>
          <p><strong>Nom :</strong> {guide.name}</p>
          <p><strong>Email :</strong> {guide.email}</p>
          <p><strong>Téléphone :</strong> {guide.phone}</p>
        </div>

        {/* 📌 Adresse */}
        <div className="info-card">
          <h3>Adresse</h3>
          <p><strong>Rue :</strong> {guide.address}</p>
          <p><strong>Ville :</strong> {guide.city}</p>
          <p><strong>Code Postal :</strong> {guide.zip}</p>
          <p><strong>Pays :</strong> {guide.country}</p>
        </div>

        {/* 📌 Message du guide */}
        <div className="info-card">
          <h3>Mot du Guide</h3>
          <p>{guide.message ? guide.message.substring(0, 180) : "Aucun message disponible."}</p>
        </div>
      </div>

      {/* 🔄 Statut Modifiable */}
      <div className="status-container">
        <button
          className={`status-button ${status === "Accepté" ? "status-accepted" : ""}`}
          onClick={() => handleStatusChange("Accepté")}
        >
          Acceptée
        </button>
        <button
          className={`status-button ${status === "En attente" ? "status-pending" : ""}`}
          onClick={() => handleStatusChange("En attente")}
        >
          En attente
        </button>
        <button
          className={`status-button ${status === "Rejeté" ? "status-rejected" : ""}`}
          onClick={() => handleStatusChange("Rejeté")}
        >
          Rejeté
        </button>
      </div>

      {/* 📜 Documents */}
      <div className="documents-section">
        <h3>Documents d'Identité</h3>
        <div className="documents-container">
          {guide.documents?.length > 0 ? (
            guide.documents.map((doc) => (
              <div key={doc.id} className="document-card">
                <img src={doc.url} alt={doc.type} className="document-image" />
                <p>{doc.type}</p>
              </div>
            ))
          ) : (
            <p>Aucun document disponible.</p>
          )}
        </div>
      </div>

      {/* 🎭 Expériences */}
      <h3>Expériences Proposées</h3>
      <table className="experiences-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Durée</th>
            <th>Prix</th>
            <th>Statut</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {experiences.length > 0 ? (
            experiences.map((experience) => (
              <tr key={experience.id}>
                <td>{experience.description}</td>
                <td>{experience.duration}</td>
                <td>{experience.price}</td>
                <td>
                  <span
                    className={`status-button ${
                      experience.status === "Acceptée"
                        ? "status-accepted"
                        : experience.status === "En attente"
                        ? "status-pending"
                        : "status-rejected"
                    }`}
                  >
                    {experience.status}
                  </span>
                </td>
                <td>
                  <div className="experience-images">
                    {experience.images?.length > 0
                      ? experience.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Expérience ${experience.id}`}
                            className="experience-img"
                          />
                        ))
                      : "Aucune image"}
                  </div>
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
              <td colSpan="6">Aucune expérience disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GuideDetails;
