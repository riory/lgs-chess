"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessRouter = void 0;
const chessParser_1 = require("../models/chessParser");
const chessParser = new chessParser_1.ChessParser();
class ChessRouter {
    getRoute(req, res) {
        const state = chessParser.parse(chessParser_1.FEN_DEFAULT_STATE);
        res.render("chess", {
            title: "Chess Game",
            state: state
        });
    }
}
exports.ChessRouter = ChessRouter;
;
