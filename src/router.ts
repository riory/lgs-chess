import express from 'express';
import { ChessRouter } from './controllers/Chess'; './controllers/Chess';

const router = express.Router();


router.get('/', (req, res) => {
   const chessRouter = new ChessRouter();
  chessRouter.getRoute(req, res);
});

export default router;
