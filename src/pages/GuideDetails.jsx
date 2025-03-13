import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./GuideDetails.css";

const GuideDetails = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/guides/${id}`)
      .then((response) => response.json())
      .then((data) => setGuide(data))
      .catch((error) => console.error("Erreur lors du chargement du guide :", error));

    fetch(`http://localhost:5000/experiences?guideId=${id}`)
      .then((response) => response.json())
      .then((data) => setExperiences(data))
      .catch((error) => console.error("Erreur lors du chargement des expériences :", error));
  }, [id]);

  if (!guide) return <p>Chargement des détails...</p>;

  return (
    <div className="guide-details-container">
      <h2 className="guide-title">DÉTAILS DU GUIDE</h2>

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
          <h3>Message du Guide</h3>
          <p>{guide.message}</p>
        </div>
      </div>

      {/* Documents d'identité */}
      <h3>Documents d'Identité</h3>
      <div className="documents-container">
        {guide.documents?.map((doc) => (
          <div key={doc.id} className="document-card">
            <img src={doc.url} alt={doc.type} className="document-image" />
            <p>{doc.type}</p>
          </div>
        ))}
      </div>

      {/* Expériences */}
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
          {experiences.map((experience) => (
            <tr key={experience.id}>
              <td>{experience.description}</td>
              <td>{experience.duration}</td>
              <td>{experience.price}</td>
              <td className={experience.status === "Acceptée" ? "status-accepted" : "status-rejected"}>
                {experience.status}
              </td>
              <td>
                <div className="experience-images">
                  {experience.images?.map((img, index) => (
                    <img key={index} src={img} alt={`Expérience ${experience.id}`} className="experience-img" />
                  ))}
                </div>
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
  );
};

export default GuideDetails;
