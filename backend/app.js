import express from "express";
import cors from 'cors';
import { buildImages } from './services/dockerImage.js';
import { dockerfileDirs } from './utils/dockerFilePath.js';
import containerRoutes from "./routes/containerRoutes.js";
import usersRoute from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

await buildImages(dockerfileDirs);

app.use('/', containerRoutes);
app.use("/users", usersRoute);

export default app;