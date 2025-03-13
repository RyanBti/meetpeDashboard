import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  // Récupérer les guides depuis db.json
  useEffect(() => {
    fetch("http://localhost:5000/guides")
      .then((response) => response.json())
      .then((data) => setGuides(data))
      .catch((error) => console.error("Erreur lors du chargement des guides :", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Meetpe Admin</h1>

      {/* Barre de recherche */}
      <div className="dashboard-table-container">
        <input type="text" placeholder="Rechercher un guide..." className="search-bar" />

        {/* Tableau des guides */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Ville</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.length > 0 ? (
                guides.map((guide) => (
                  <tr key={guide.id}>
                    <td>{guide.name}</td>
                    <td>{guide.email}</td>
                    <td>{guide.phone}</td>
                    <td>{guide.city}</td>
                    <td className="table-actions">
                      <button className="button-view" onClick={() => navigate(`/guide/${guide.id}`)}>Voir</button>
                      <button className="button-edit">Modifier</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Aucun guide trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
