import { useEffect, useState } from "react";
import "./App.css";
import { fetchApiHealth } from "./api/client";
import { HealthResponse } from "./types/api";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Terapias from "./pages/Terapias";
import Programas from "./pages/Programas";
import Productos from "./pages/Productos";
import Experiencias from "./pages/Experiencias";

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
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/terapias" element={<Terapias />} />
        <Route path="/programas" element={<Programas />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/experiencias" element={<Experiencias />} />
      </Routes>
    </>
  );
}
