import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { ChessParser, FEN_DEFAULT_STATE } from '../models/chessParser';
const chessParser = new ChessParser();


export class ChessRouter {
  public getRoute(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) {
    const state = chessParser.parse(FEN_DEFAULT_STATE);
    res.render("chess", {
      title: "Chess Game",
      state: state
    });
  }
};
