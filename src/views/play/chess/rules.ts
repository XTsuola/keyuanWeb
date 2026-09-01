import { type Board, COLS, ROWS, canCapture, emptyHints, isEmpty, isRed, posKey } from "./board";

const RED_PALACE = new Set([73, 74, 75, 83, 84, 85, 93, 94, 95]);
const BLACK_PALACE = new Set([3, 4, 5, 13, 14, 15, 23, 24, 25]);

function inBounds(row: number, col: number) {
  return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

function mark(hints: number[][], row: number, col: number, piece: number, board: Board) {
  if (!inBounds(row, col)) return;
  if (canCapture(piece, board[row][col])) hints[row][col] = 1;
}

/** 车：直线滑动，遇子可吃对方并停 */
function markRook(hints: number[][], row: number, col: number, piece: number, board: Board) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dr, dc] of dirs) {
    let r = row + dr;
    let c = col + dc;
    while (inBounds(r, c)) {
      const cell = board[r][c];
      if (isEmpty(cell)) {
        hints[r][c] = 1;
      } else {
        if (canCapture(piece, cell)) hints[r][c] = 1;
        break;
      }
      r += dr;
      c += dc;
    }
  }
}

/** 炮：空走不翻山；隔一子可打对方 */
function markCannon(hints: number[][], row: number, col: number, piece: number, board: Board) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dr, dc] of dirs) {
    let r = row + dr;
    let c = col + dc;
    let jumped = false;
    while (inBounds(r, c)) {
      const cell = board[r][c];
      if (!jumped) {
        if (isEmpty(cell)) {
          hints[r][c] = 1;
        } else {
          jumped = true;
        }
      } else if (!isEmpty(cell)) {
        if (canCapture(piece, cell)) hints[r][c] = 1;
        break;
      }
      r += dr;
      c += dc;
    }
  }
}

/** 马：日字，别腿 */
function markHorse(hints: number[][], row: number, col: number, piece: number, board: Board) {
  const leaps: Array<{ block: [number, number]; land: [number, number] }> = [
    { block: [0, 1], land: [-1, 2] },
    { block: [0, 1], land: [1, 2] },
    { block: [0, -1], land: [-1, -2] },
    { block: [0, -1], land: [1, -2] },
    { block: [-1, 0], land: [-2, -1] },
    { block: [-1, 0], land: [-2, 1] },
    { block: [1, 0], land: [2, -1] },
    { block: [1, 0], land: [2, 1] },
  ];
  for (const { block, land } of leaps) {
    const br = row + block[0];
    const bc = col + block[1];
    if (!inBounds(br, bc) || !isEmpty(board[br][bc])) continue;
    mark(hints, row + land[0], col + land[1], piece, board);
  }
}

/** 相/象：田字，塞象眼，不过河 */
function markElephant(
  hints: number[][],
  row: number,
  col: number,
  piece: number,
  board: Board,
  redSide: boolean
) {
  const leaps: Array<[number, number]> = [
    [-2, 2],
    [-2, -2],
    [2, -2],
    [2, 2],
  ];
  for (const [dr, dc] of leaps) {
    const r = row + dr;
    const c = col + dc;
    if (!inBounds(r, c)) continue;
    if (redSide && r < 5) continue;
    if (!redSide && r > 4) continue;
    const eyeR = row + dr / 2;
    const eyeC = col + dc / 2;
    if (!isEmpty(board[eyeR][eyeC])) continue;
    mark(hints, r, c, piece, board);
  }
}

/** 仕/士：斜一步，不出九宫 */
function markAdvisor(
  hints: number[][],
  row: number,
  col: number,
  piece: number,
  board: Board,
  palace: Set<number>
) {
  const leaps: Array<[number, number]> = [
    [-1, 1],
    [-1, -1],
    [1, -1],
    [1, 1],
  ];
  for (const [dr, dc] of leaps) {
    const r = row + dr;
    const c = col + dc;
    if (!palace.has(posKey(r, c))) continue;
    mark(hints, r, c, piece, board);
  }
}

/** 帅/将：正交一步不出九宫；对面无子可飞将 */
function markKing(
  hints: number[][],
  row: number,
  col: number,
  piece: number,
  board: Board,
  palace: Set<number>,
  flyingTarget: number,
  flyDir: 1 | -1
) {
  const steps: Array<[number, number]> = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dr, dc] of steps) {
    const r = row + dr;
    const c = col + dc;
    if (!palace.has(posKey(r, c))) continue;
    mark(hints, r, c, piece, board);
  }
  for (let r = row + flyDir; r >= 0 && r < ROWS; r += flyDir) {
    const cell = board[r][col];
    if (isEmpty(cell)) continue;
    if (cell === flyingTarget) hints[r][col] = 1;
    break;
  }
}

/** 兵/卒：未过河只前进；过河可左右 */
function markPawn(hints: number[][], row: number, col: number, piece: number, board: Board) {
  const red = isRed(piece);
  const forward = red ? -1 : 1;
  mark(hints, row + forward, col, piece, board);
  const crossed = red ? row <= 4 : row >= 5;
  if (!crossed) return;
  mark(hints, row, col - 1, piece, board);
  mark(hints, row, col + 1, piece, board);
}

/** 计算选中棋子可落点：1 可走 */
export function getMoves(row: number, col: number, board: Board): number[][] {
  const hints = emptyHints();
  const piece = board[row]?.[col] ?? 0;
  if (!piece) return hints;
  switch (piece) {
    case 1:
    case 11:
      markPawn(hints, row, col, piece, board);
      break;
    case 2:
    case 12:
      markCannon(hints, row, col, piece, board);
      break;
    case 3:
    case 13:
      markRook(hints, row, col, piece, board);
      break;
    case 4:
    case 14:
      markHorse(hints, row, col, piece, board);
      break;
    case 5:
      markElephant(hints, row, col, piece, board, true);
      break;
    case 15:
      markElephant(hints, row, col, piece, board, false);
      break;
    case 6:
      markAdvisor(hints, row, col, piece, board, RED_PALACE);
      break;
    case 16:
      markAdvisor(hints, row, col, piece, board, BLACK_PALACE);
      break;
    case 7:
      markKing(hints, row, col, piece, board, RED_PALACE, 17, -1);
      break;
    case 17:
      markKing(hints, row, col, piece, board, BLACK_PALACE, 7, 1);
      break;
  }
  return hints;
}
