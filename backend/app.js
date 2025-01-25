import express from "express";
import cors from 'cors';
import { buildImages } from './services/dockerImage.js';
import { dockerfileDirs } from './utils/dockerFilePath.js';
import containerRoutes from "./routes/containerRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

await buildImages(dockerfileDirs);

app.use('/', containerRoutes);

export default app;