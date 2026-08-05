/** 0空 1-7红方 11-17黑方 */
export type Board = number[][];

export const ROWS = 10;
export const COLS = 9;

export const PieceName: Record<number, string> = {
  1: "兵",
  2: "炮",
  3: "車",
  4: "馬",
  5: "相",
  6: "仕",
  7: "帥",
  11: "卒",
  12: "炮",
  13: "車",
  14: "馬",
  15: "象",
  16: "士",
  17: "将",
};

/** 标准开局棋盘：黑上红下 */
export const INITIAL_BOARD: Board = [
  [13, 14, 15, 16, 17, 16, 15, 14, 13],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 12, 0, 0, 0, 0, 0, 12, 0],
  [11, 0, 11, 0, 11, 0, 11, 0, 11],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 4, 5, 6, 7, 6, 5, 4, 3],
];

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

export function emptyHints(): number[][] {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0));
}

export function isRed(piece: number) {
  return piece > 0 && piece < 10;
}

export function isBlack(piece: number) {
  return piece > 10;
}

export function isEmpty(piece: number) {
  return piece === 0;
}

export function canCapture(self: number, target: number) {
  if (isEmpty(target)) return true;
  return isRed(self) !== isRed(target);
}

export function posKey(row: number, col: number) {
  return row * 10 + col;
}
