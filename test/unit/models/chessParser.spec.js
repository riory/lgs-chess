"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chessParser_1 = require("../../../src/models/chessParser");
describe("ChessParser", () => {
    let parser;
    beforeEach(() => {
        parser = new chessParser_1.ChessParser();
    });
    describe("Standard chess positions", () => {
        it("should parse initial position correctly", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(true);
            (0, chai_1.expect)(result.turn).to.equal("w");
            (0, chai_1.expect)(result.castling).to.equal("KQkq");
            (0, chai_1.expect)(result.enPassant).to.equal("-");
        });
        it("should parse black to move", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(true);
            (0, chai_1.expect)(result.turn).to.equal("b");
        });
        it("should parse position with en passant", () => {
            const fen = "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPPBPPP/RNBQKBNR b KQkq e3 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(true);
            (0, chai_1.expect)(result.enPassant).to.equal("e3");
        });
        it("should parse with half-move and full-move numbers", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 50 4";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(true);
            (0, chai_1.expect)(result.halfMoveClock).to.equal(50);
            (0, chai_1.expect)(result.fullMoveNumber).to.equal(4);
        });
    });
    describe("Board parsing", () => {
        it("should parse default state", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.board[0]).to.deep.equal(["r", "n", "b", "q", "k", "b", "n", "r"]);
            (0, chai_1.expect)(result.board[1].every(cell => cell === 'p')).to.equal(true);
            (0, chai_1.expect)(result.board[2].every(cell => cell === null)).to.equal(true);
            (0, chai_1.expect)(result.board[3].every(cell => cell === null)).to.equal(true);
            (0, chai_1.expect)(result.board[4].every(cell => cell === null)).to.equal(true);
            (0, chai_1.expect)(result.board[5].every(cell => cell === null)).to.equal(true);
            (0, chai_1.expect)(result.board[6].every(cell => cell === 'P')).to.equal(true);
            (0, chai_1.expect)(result.board[7]).to.deep.equal(["R", "N", "B", "Q", "K", "B", "N", "R"]);
        });
        it("should parse mixed empty spaces and pieces", () => {
            const fen = "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.board[0]).to.deep.equal(['r', null, null, null, "k", null, null, "r"]);
        });
    });
    describe("Validation errors", () => {
        it("should detect invalid FEN structure (wrong field count)", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
        it("should detect invalid side to move", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR x KQkq - 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
        it("should detect invalid castling rights", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KXkq - 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
        it("should detect invalid en passant square", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e2 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
        it("should detect invalid half-move clock", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - abc 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
        it("should detect invalid full-move number", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 xyz";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
        it("should detect invalid character in board", () => {
            const fen = "rnbqkbnr/pppppppx/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
        it("should detect wrong rank count", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPP/RNBQKBNR w KQkq - 0 1";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
        it("should detect invalid full move number (less than 1)", () => {
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
    });
    describe("Edge cases", () => {
        it("should return default values for invalid FEN", () => {
            const fen = "invalid";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.turn).to.equal("w");
            (0, chai_1.expect)(result.castling).to.equal("-");
            (0, chai_1.expect)(result.enPassant).to.equal("-");
            (0, chai_1.expect)(result.halfMoveClock).to.equal(0);
            (0, chai_1.expect)(result.fullMoveNumber).to.equal(1);
        });
        it("should handle empty FEN string", () => {
            const fen = "";
            const result = parser.parse(fen);
            (0, chai_1.expect)(result.isValid).to.equal(false);
        });
    });
    describe("Configuration", () => {
        it("should expose CONFIG constant", () => {
            (0, chai_1.expect)(chessParser_1.ChessParser.CONFIG.DELIMITER).to.equal(" ");
            (0, chai_1.expect)(chessParser_1.ChessParser.CONFIG.BOARD_SIZE).to.equal(8);
            (0, chai_1.expect)(chessParser_1.ChessParser.CONFIG.FIELD_COUNT).to.equal(6);
        });
        it("should expose ERRORS constant", () => {
            (0, chai_1.expect)(chessParser_1.ChessParser.ERRORS.STRUCTURE).to.be.a("string");
            (0, chai_1.expect)(chessParser_1.ChessParser.ERRORS.INVALID_CHAR).to.be.a("function");
        });
    });
});
