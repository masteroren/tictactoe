import {Action} from '@ngrx/store';

export enum actionsTypes {
  START_GAME = '[Game] start game',
  CLEAR_BOARD = '[Game] clear board',
  GAME_OVER = '[Game] game over',
  TURN_OF = '[Game] turn played',
}

export class StartGame implements Action {
  readonly type = actionsTypes.START_GAME;

  constructor(public payload: any) {
  }
}

export class ClearBoard implements Action {
  readonly type = actionsTypes.CLEAR_BOARD;
}

export class GameOver implements Action {
  readonly type = actionsTypes.GAME_OVER;

  constructor(public payload: any) {
  }
}

export class TurnOf implements Action {
  readonly type = actionsTypes.TURN_OF;

  constructor(public payload: any) {
  }
}

export type gameActions =
  StartGame |
  ClearBoard |
  GameOver |
  TurnOf;
