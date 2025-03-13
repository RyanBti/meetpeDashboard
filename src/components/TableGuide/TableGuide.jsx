import React, { useState } from "react";
import "./table.css";

const guides = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Actif" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactif" },
];

const TableGuides = () => {
  const [search, setSearch] = useState("");

  const filteredGuides = guides.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="🔎 Rechercher un guide..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="custom-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuides.map((guide) => (
            <tr key={guide.id}>
              <td>{guide.name}</td>
              <td>{guide.email}</td>
              <td>{guide.status}</td>
              <td>
                <button className="btn-view">Voir</button>
                <button className="btn-edit">Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableGuides;
