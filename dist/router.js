"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Chess_1 = require("./controllers/Chess");
'./controllers/Chess';
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const chessRouter = new Chess_1.ChessRouter();
    chessRouter.getRoute(req, res);
});
exports.default = router;
