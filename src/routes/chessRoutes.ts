import { Router } from 'express';
import { show } from '../controllers/chess.js';

const router = Router();

router.get('/', show);

export default router;
