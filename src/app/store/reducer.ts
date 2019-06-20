import {GameState} from './index';
import {actionsTypes, gameActions} from './actions';

const initialState: GameState = {
  gameEnabled: false,
  gameOver: false,
  turnOf: 'X',
  players: null,
};

export function gameReducer(state: GameState = initialState, action: gameActions): GameState {
  switch (action.type) {
    case actionsTypes.START_GAME:
      return Object.assign({}, state, action.payload);
    case actionsTypes.CLEAR_BOARD:
      return Object.assign({...initialState});
    case actionsTypes.GAME_OVER:
      return Object.assign({}, state, action.payload);
    case actionsTypes.TURN_OF:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
