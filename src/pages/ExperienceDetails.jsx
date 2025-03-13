import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ExperienceDetails.css";

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/experiences/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setExperience(data);
        setSelectedStatus(data.status || "");
      })
      .catch((error) =>
        console.error("Erreur lors du chargement de l'expérience :", error)
      );
  }, [id]);

  // 🔄 Mettre à jour le statut
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    fetch(`http://localhost:5000/experiences/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la mise à jour");
        return response.json();
      })
      .then(() => {
        setExperience((prev) => ({ ...prev, status: newStatus }));
      })
      .catch((error) => console.error("Erreur de mise à jour :", error));
  };

  // 🗑️ Supprimer l'expérience
  const handleDelete = () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) return;

    fetch(`http://localhost:5000/experiences/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la suppression");
        return response.json();
      })
      .then(() => {
        alert("Expérience supprimée avec succès !");
        navigate("/guides");
      })
      .catch((error) => console.error("Erreur de suppression :", error));
  };

  if (!experience) return <p>Chargement de l'expérience...</p>;

  return (
    <div className="experience-details-container">
      <h2 className="experience-title">{experience.title}</h2>

      {/* Affichage des images */}
      <div className="experience-images">
        {experience.images?.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} className="experience-image" />
        ))}
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Description</h3>
          <p>{experience.description}</p>
        </div>

        <div className="info-card">
          <h3>Informations</h3>
          <p><strong>Durée :</strong> {experience.duration}</p>
          <p><strong>Prix :</strong> {experience.price}</p>
          <p className={`status-${selectedStatus.toLowerCase()}`}>
            <strong>Statut :</strong> {selectedStatus}
          </p>

          {/* Sélection du statut */}
          <select value={selectedStatus} onChange={handleStatusChange} className="status-dropdown">
            <option value="Acceptée">Acceptée</option>
            <option value="En attente">En attente</option>
            <option value="Rejetée">Rejetée</option>
          </select>
          
          {/* Bouton de suppression */}
          <button className="delete-btn" onClick={handleDelete}>
            Supprimer l'expérience
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
