import { Players } from "./constants";
import { BOARD_SIZE, BOARD_SLOT_COUNT } from "./settings";

export function createBoard() {
  const boardElement = document.createElement("div");

  boardElement.className = "board";

  for (let row = 0; row < BOARD_SIZE; row++) {
    const boardRowElement = document.createElement("div");

    boardRowElement.className = "board__row";

    boardElement.appendChild(boardRowElement);

    for (let column = 0; column < BOARD_SIZE; column++) {
      const slotElement = document.createElement("button");

      slotElement.className = "board__slot";

      slotElement.dataset.slotIndex = row * BOARD_SIZE + column;

      boardRowElement.appendChild(slotElement);
    }
  }

  return boardElement;
}

export function updateBoard(board) {
  document.querySelectorAll("[data-slot-index]").forEach((slot) => {
    const slotIndex = Number(slot.dataset.slotIndex);

    if (
      Number.isNaN(slotIndex) ||
      slotIndex < 0 ||
      slotIndex >= BOARD_SLOT_COUNT
    ) {
      return;
    }

    if (board[slotIndex] === Players.X) {
      slot.textContent = "X";

      return;
    }

    if (board[slotIndex] === Players.O) {
      slot.textContent = "O";

      return;
    }

    slot.textContent = "";
  });
}
