import { useEffect, useState } from "react";
import "./App.css";
import { fetchApiHealth } from "./api/client";
import { HealthResponse } from "./types/api";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ServiciosPage from "./pages/ServiciosPage";
import TerapiasPage from "./pages/TerapiasPage";
import ProgramasPage from "./pages/ProgramasPage";
import ProductosPage from "./pages/ProductosPage";
import ExperienciasPage from "./pages/ExperienciasPage";

export default function App() {
  const [apiHealth, setApiHealth] = useState<HealthResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiHealth()
      .then((data) => setApiHealth(data))
      .catch(() =>
        setApiError(
          "Backend API not reachable yet (start backend on port 4000)",
        ),
      );
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/terapias" element={<TerapiasPage />} />
        <Route path="/programas" element={<ProgramasPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/experiencias" element={<ExperienciasPage />} />
      </Routes>
      <div className="text-center">
        {apiHealth
          ? `Backend Status: ${apiHealth.status.toUpperCase()} (${apiHealth.service})`
          : apiError || "Checking backend API connection..."}
      </div>
    </>
  );
}
