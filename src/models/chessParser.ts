
export const FEN_DEFAULT_STATE = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

/**
 * Configuration and constants for FEN parsing logic.
 */
export const FEN_CONFIG = {
  DELIMITER: ' ',
  RANK_DELIMITER: '/',
  EMPTY_VALUE: '-',
  VALID_PIECES: /^[pnbrqk]$/i,
  VALID_CASTLING: /^[KQkq]+$|^-$/,
  VALID_EN_PASSANT: /^[a-h][36]$|^-$/, // Strictly allows only valid EP ranks (3 or 6) or '-'
  BOARD_SIZE: 8,
  FIELD_COUNT: 6,
} as const;

/**
 * Standardized error message templates.
 */
export const FEN_ERRORS = {
  STRUCTURE: `FEN must have exactly ${FEN_CONFIG.FIELD_COUNT} space-separated fields`,
  RANK_COUNT: `Board must have ${FEN_CONFIG.BOARD_SIZE} ranks`,
  INVALID_CHAR: (char: string, rank: number) => `Invalid character '${char}' in rank ${rank}`,
  RANK_SIZE: (rank: number, count: number) => `Rank ${rank} has ${count} squares instead of ${FEN_CONFIG.BOARD_SIZE}`,
  SIDE: "Side to move must be 'w' or 'b'",
  CASTLING: "Invalid castling rights",
  EN_PASSANT: "Invalid en passant square",
  HALF_MOVE: "Half-move clock must be a non-negative integer",
  FULL_MOVE: "Full-move number must be a positive integer",
} as const;

export type Piece = 'p' | 'n' | 'b' | 'r' | 'q' | 'k' | 'P' | 'N' | 'B' | 'R' | 'Q' | 'K';

export interface FENState {
  board: (Piece | null)[][];
  turn: 'w' | 'b';
  castling: string;
  enPassant: string;
  halfMoveClock: number;
  fullMoveNumber: number;
  parseErrors: string[];
  isValid: boolean; // True only if parseErrors is empty
}

/**
 * ChessParser handles the conversion and validation of FEN strings.
 */
export class ChessParser {
  static readonly CONFIG = FEN_CONFIG;
  static readonly ERRORS = FEN_ERRORS;

  /**
   * Main entry point to parse a FEN string.
   */
  public parse(fen: string): FENState {
    const parseErrors: string[] = [];
    const parts = fen.split(ChessParser.CONFIG.DELIMITER);

    if (parts.length !== ChessParser.CONFIG.FIELD_COUNT) {
      parseErrors.push(ChessParser.ERRORS.STRUCTURE);
      return {
        board: [],
        turn: 'w',
        castling: ChessParser.CONFIG.EMPTY_VALUE,
        enPassant: ChessParser.CONFIG.EMPTY_VALUE,
        halfMoveClock: 0,
        fullMoveNumber: 1,
        parseErrors: parseErrors,
        isValid: false
      };
    }

    const [boardStr, turn, castling, enPassant, halfMove, fullMove] = parts;

    const board = this.parseBoard(boardStr, parseErrors);
    const side = this.validateTurn(turn, parseErrors);
    const castlingRights = this.validateCastling(castling, parseErrors);
    const epSquare = this.validateEnPassant(enPassant, parseErrors);
    const hmClock = this.validateClock(halfMove, ChessParser.ERRORS.HALF_MOVE, parseErrors, 0);
    const fmNum = this.validateClock(fullMove, ChessParser.ERRORS.FULL_MOVE, parseErrors, 1);

    return {
      board,
      turn: side,
      castling: castlingRights,
      enPassant: epSquare,
      halfMoveClock: hmClock,
      fullMoveNumber: fmNum,
      parseErrors,
      isValid: parseErrors.length === 0
    };
  }

  private parseBoard(boardStr: string, errors: string[]): (Piece | null)[][] {
    const ranks = boardStr.split(ChessParser.CONFIG.RANK_DELIMITER);
    if (ranks.length !== ChessParser.CONFIG.BOARD_SIZE) {
      errors.push(ChessParser.ERRORS.RANK_COUNT);
    }

    return ranks.map((rank, i) => {
      const row: (Piece | null)[] = [];
      let squareCount = 0;
      const rankNum = ChessParser.CONFIG.BOARD_SIZE - i;

      for (const char of rank) {
        const emptyCount = parseInt(char);
        if (!isNaN(emptyCount)) {
          squareCount += emptyCount;
          for (let j = 0; j < emptyCount; j++) row.push(null);
        } else if (ChessParser.CONFIG.VALID_PIECES.test(char)) {
          squareCount += 1;
          row.push(char as Piece);
        } else {
          errors.push(ChessParser.ERRORS.INVALID_CHAR(char, rankNum));
        }
      }

      if (squareCount !== ChessParser.CONFIG.BOARD_SIZE) {
        errors.push(ChessParser.ERRORS.RANK_SIZE(rankNum, squareCount));
      }
      return row;
    });
  }

  private validateTurn(turn: string, errors: string[]): 'w' | 'b' {
    if (turn !== 'w' && turn !== 'b') {
      errors.push(ChessParser.ERRORS.SIDE);
      return 'w';
    }
    return turn;
  }

  private validateCastling(castling: string, errors: string[]): string {
    if (!ChessParser.CONFIG.VALID_CASTLING.test(castling)) {
      errors.push(ChessParser.ERRORS.CASTLING);
    }
    return castling;
  }

  private validateEnPassant(ep: string, errors: string[]): string {
    if (!ChessParser.CONFIG.VALID_EN_PASSANT.test(ep)) {
      errors.push(ChessParser.ERRORS.EN_PASSANT);
    }
    return ep;
  }

  private validateClock(value: string, errorMsg: string, errors: string[], fallback: number): number {
    const num = parseInt(value);
    if (isNaN(num) || (fallback === 1 ? num < 1 : num < 0)) {
      errors.push(errorMsg);
      return fallback;
    }
    return num;
  }
}
