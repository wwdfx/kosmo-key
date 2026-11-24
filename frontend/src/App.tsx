import { useEffect, useState } from 'react';
import './App.css';
import { fetchApiHealth } from './api/client';
import { HealthResponse } from './types/api';

/**
 * Clean starter component for the Trainee Frontend Developer.
 *
 * TODO (Frontend Trainee):
 * Replace this starter screen with the Kosmo Key Figma implementation:
 * - Header & Navigation (SERVICIOS, TERAPIAS, CONÓCENOS, PRODUCTOS, SANCTUARY)
 * - Hero section ("THE SOURCE", "Vuelve al lugar donde todo comienza", "ACCESO PRIORITARIO")
 * - Coaching courses e-commerce catalog & shopping cart connected to `/api/courses`
 *
 * See `frontend/README.md` and the root `README.md` for full instructions and Figma specs.
 */
export default function App() {
  const [apiHealth, setApiHealth] = useState<HealthResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiHealth()
      .then((data) => setApiHealth(data))
      .catch(() => setApiError('Backend API not reachable yet (start backend on port 4000)'));
  }, []);

  return (
    <main className="starter-container">
      <section className="starter-card">
        <span className="starter-badge">Kosmo Key · Frontend Starter</span>
        <h1>Ready for Frontend Development</h1>
        <p>
          Edit <code>frontend/src/App.tsx</code> and build your components inside{' '}
          <code>frontend/src/components/</code> following the Kosmo Key Figma design.
        </p>
        <div className="starter-status">
          {apiHealth
            ? `Backend Status: ${apiHealth.status.toUpperCase()} (${apiHealth.service})`
            : apiError || 'Checking backend API connection...'}
        </div>
      </section>
    </main>
  );
}
