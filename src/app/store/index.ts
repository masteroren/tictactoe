import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface GameState {
  gameEnabled: boolean;
  gameOver: boolean;
  turnOf: string;
  players: any;
}

export const gameState = createFeatureSelector<GameState>('game');
export const selectGameEnabled = createSelector(gameState, state => state.gameEnabled);
export const selectGameOver = createSelector(gameState, state => state.gameOver);
export const selectTurnOf = createSelector(gameState, state => state.turnOf);
export const selectPlayers = createSelector(gameState, state => state.players);
