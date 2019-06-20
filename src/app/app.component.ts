import {Component, OnInit} from '@angular/core';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {GameState, selectGameOver, selectTurnOf} from './store';
import {actionsTypes, GameOver, TurnOf} from './store/actions';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TicTacToe';

  public boardConfig = {
    1: {value: '', winOptions: [[2, 3], [4, 7], [5, 9]]},
    2: {value: '', winOptions: [[1, 3], [5, 8]]},
    3: {value: '', winOptions: [[1, 2], [5, 7], [6, 9]]},
    4: {value: '', winOptions: [[1, 7], [5, 6]]},
    5: {value: '', winOptions: [[2, 8], [4, 6], [1, 9], [3, 7]]},
    6: {value: '', winOptions: [[3, 9], [4, 5]]},
    7: {value: '', winOptions: [[1, 4], [3, 5], [8, 9]]},
    8: {value: '', winOptions: [[2, 5], [7, 9]]},
    9: {value: '', winOptions: [[1, 5], [3, 6], [7, 8]]},
  };
  public gameButtons = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  public gameOver$: Observable<boolean>;

  constructor(private store: Store<GameState>, private actionsSubject: ActionsSubject) {
  }

  ngOnInit(): void {
    this.gameOver$ = this.store
      .pipe(
        select(selectGameOver),
      );

    this.actionsSubject
      .subscribe(action => {
        if (action.type === actionsTypes.CLEAR_BOARD) {
          for (const key of Object.keys(this.boardConfig)) {
            this.boardConfig[key].value = '';
            this.boardConfig[key].win = false;
          }
        }
      });
  }

  onTurn(gameBtn) {
    if (this.boardConfig[gameBtn].value === '') {
      this.store
        .pipe(
          select(selectTurnOf),
          take(1),
        )
        .subscribe(turnOf => {
          this.boardConfig[gameBtn].value = turnOf;
          this.checkWIn(gameBtn, turnOf);
        });
    }
  }

  checkWIn(gameBtn, turnOf) {
    if (this.boardConfig[gameBtn].winOptions) {
      let hasWin = false;
      this.boardConfig[gameBtn].winOptions.every(winOption => {
        hasWin = this.boardConfig[winOption[0]].value === this.boardConfig[gameBtn].value &&
          this.boardConfig[winOption[1]].value === this.boardConfig[gameBtn].value;
        if (hasWin) {
          this.boardConfig[gameBtn].win = true;
          this.boardConfig[winOption[0]].win = true;
          this.boardConfig[winOption[1]].win = true;
        }
        return !hasWin;
      });

      if (hasWin) {
        this.store.dispatch(new GameOver({gameOver: true}));
      } else {
        const nextTurnOf = turnOf === 'X' ? 'O' : 'X';
        this.store.dispatch(new TurnOf({turnOf: nextTurnOf}));
      }
    }
  }
}
