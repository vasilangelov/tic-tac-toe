import { GameOutcomes } from "./js/constants";
import { createEmptyBoard, createEmptyGameState } from "./js/data";
import { applyTurn, getGameOutcome } from "./js/services";
import { BOARD_SLOT_COUNT } from "./js/settings";
import { createBoard, updateBoard } from "./js/ui";

window.addEventListener("DOMContentLoaded", () => {
  // Initialize Data Layer
  let gameState = createEmptyGameState();

  // Initialize UI
  document.body.appendChild(createBoard());

  // Setup Actions
  window.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const slotIndex = Number(event.target.dataset.slotIndex);

    if (slotIndex < 0 || slotIndex >= BOARD_SLOT_COUNT) {
      return;
    }

    gameState.board = applyTurn(slotIndex, gameState.board);

    const gameOutcome = getGameOutcome(gameState.board);

    if (gameOutcome !== GameOutcomes.Ongoing) {
      gameState.outcomes[gameOutcome]++;

      const scoreElement = document.getElementById(gameOutcome);
      scoreElement.textContent = gameState.outcomes[gameOutcome];

      gameState.board = createEmptyBoard();
    }

    updateBoard(gameState.board);
  });
});
