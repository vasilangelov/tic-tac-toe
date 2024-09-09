import { GameOutcomes, Players } from "./constants";
import { BOARD_SIZE, BOARD_SLOT_COUNT } from "./settings";

/**
 *
 * @param {(Players[keyof Players] | null)[]} board
 * @returns {Players[keyof Players]}
 */
export function getActivePlayer(board) {
  return board.filter((slot) => slot !== null).length % 2 === 0
    ? Players.X
    : Players.O;
}

/**
 *
 * @param {number} slotIndex
 * @param {(Players[keyof Players] | null)[]} board
 * @returns {(Players[keyof Players] | null)[]}
 */
export function applyTurn(slotIndex, board) {
  if (slotIndex >= BOARD_SLOT_COUNT || board[slotIndex] !== null) {
    // We could either throw an error, or do nothing.
    return board;
  }

  const activePlayer = getActivePlayer(board);

  const newBoard = [...board];
  newBoard[slotIndex] = activePlayer;

  return newBoard;
}

/**
 *
 * @param {(Players[keyof Players] | null)[]} board
 * @param {Players[keyof Players]} player
 * @returns {boolean}
 */
export function isPlayerWinner(board, player) {
  // Check values horizontally
  for (let row = 0; row < BOARD_SIZE; row++) {
    let isWinState = true;

    for (let column = 0; column < BOARD_SIZE; column++) {
      if (board[row * BOARD_SIZE + column] !== player) {
        isWinState = false;

        break;
      }
    }

    if (isWinState) {
      return true;
    }
  }

  // Check values vertically
  for (let column = 0; column < BOARD_SIZE; column++) {
    let isWinState = true;

    for (let row = 0; row < BOARD_SIZE; row++) {
      if (board[row * BOARD_SIZE + column] !== player) {
        isWinState = false;

        break;
      }
    }

    if (isWinState) {
      return true;
    }
  }

  // Check values diagonally
  let isLeftDiagonalFilled = true;
  let isRightDiagonalFilled = true;

  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[i * BOARD_SIZE + i] !== player) {
      isLeftDiagonalFilled = false;
    }

    if (board[i * BOARD_SIZE + i] !== player) {
      isRightDiagonalFilled = false;
    }

    if (!isLeftDiagonalFilled && !isRightDiagonalFilled) {
      break;
    }
  }

  return isLeftDiagonalFilled || isRightDiagonalFilled;
}

/**
 *
 * @param {(Players[keyof Players] | null)[]} board
 * @returns {GameOutcomes[keyof GameOutcomes]}
 */
export function getGameOutcome(board) {
  if (isPlayerWinner(board, Players.X)) {
    return GameOutcomes.WinnerX;
  }

  if (isPlayerWinner(board, Players.O)) {
    return GameOutcomes.WinnerO;
  }

  if (board.every((slot) => slot !== null)) {
    return GameOutcomes.Tie;
  }

  return GameOutcomes.Ongoing;
}
