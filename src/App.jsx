import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import GuideDetails from "./pages/GuideDetails";
import GuidesList from "./pages/GuidesList";
import ExperienceDetails from "./pages/ExperienceDetails"; // ✅ Import de la nouvelle page
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <SidebarProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/guides" element={<GuidesList />} />
              <Route path="/guide/:id" element={<GuideDetails />} />
              <Route path="/experience/:id" element={<ExperienceDetails />} /> {/* ✅ Nouvelle route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SidebarProvider>
  );
};

export default App;
