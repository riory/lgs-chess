import { Request, Response } from 'express';
import { ChessParser, FEN_DEFAULT_STATE } from '../models/chessParser.js';

export const show = (_req: Request, res: Response) => {
  const chessParser = new ChessParser();
  const state = chessParser.parse(FEN_DEFAULT_STATE);
  res.render('chess', {
    title: 'Chess Game',
    state: state,
  });
};
