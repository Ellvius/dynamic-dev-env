import express from 'express';
import { startnewContainer } from '../controllers/containerController.js';

const containerRoutes = express.Router();

containerRoutes.get('/start-container', startnewContainer);
// containerRoutes.get('/', initializeContainers);

export default containerRoutes;