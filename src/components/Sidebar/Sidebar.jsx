import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; // ✅ Importation de NavLink
import { FaUsers, FaChartLine, FaBars, FaSignOutAlt } from "react-icons/fa";
import { SidebarContext } from "../../context/SidebarContext"; // ✅ Import correct
import "./Sidebar.css";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      {/* Bouton de Toggle Sidebar */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Navigation */}
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaChartLine />
            {isSidebarOpen && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/guides" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUsers />
            {isSidebarOpen && <span>Guides</span>}
          </NavLink>
        </li>
      </ul>

      {/* Bouton Déconnexion */}
      <button className="logout-btn">
        <FaSignOutAlt />
        {isSidebarOpen && <span>Déconnexion</span>}
      </button>
    </div>
  );
};

export default Sidebar;
