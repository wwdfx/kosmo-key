import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import healthRouter from './routes/health.routes.js';
import coursesRouter from './routes/courses.routes.js';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api', coursesRouter);

app.listen(env.PORT, () => {
  console.log(`[kosmo-key-backend] API listening on http://localhost:${env.PORT}`);
});
