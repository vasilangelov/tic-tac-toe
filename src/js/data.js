import { GameOutcomes } from "./constants";
import { BOARD_SLOT_COUNT } from "./settings";

export function createEmptyBoard() {
  return new Array(BOARD_SLOT_COUNT).fill(null);
}

export function createEmptyGameState() {
  return {
    outcomes: {
      [GameOutcomes.WinnerX]: 0,
      [GameOutcomes.WinnerO]: 0,
      [GameOutcomes.Tie]: 0,
    },
    board: createEmptyBoard(),
  };
}
