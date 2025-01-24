import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import app from './app.js'; 
import { buildImages } from './services/dockerImage.js';
import { dockerfileDirs } from './utils/dockerFilePath.js';

dotenv.config();
const port = process.env.PORT || 5000;
buildImages(dockerfileDirs);

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
