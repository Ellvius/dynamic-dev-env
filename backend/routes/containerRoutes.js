import express from 'express';
import { startnewContainer } from '../controllers/containerController.js';

const router = express.Router();

router.get('/start-container', startnewContainer);
router.get('/', (req, res)=>{res.send('server running')});

export default router;
