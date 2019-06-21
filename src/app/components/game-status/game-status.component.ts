import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameState, selectGameEnabled, selectGameOver, selectPlayers, selectTurnOf} from '../../store';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {filter, map, take, tap} from 'rxjs/operators';
import {actionsTypes, StartGame} from '../../store/actions';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss']
})
export class GameStatusComponent implements OnInit {

  public players: any;
  public player: string;
  public gameOver$: Observable<boolean>;
  public gameEnabled$: Observable<boolean>;
  public turnOf$: Observable<string>;

  constructor(private store: Store<GameState>, private actionsSubject: ActionsSubject) {
  }

  ngOnInit() {
    this.store
      .pipe(
        select(selectPlayers),
        map(players => {
          if (!!players) {
            return {
              X: players.playerA,
              O: players.playerB,
            };
          }
        })
      )
      .subscribe(players => this.players = players);

    this.turnOf$ = this.store
      .pipe(
        select(selectTurnOf),
        tap(turnOf => {
          if (this.players) {
            this.player = this.players[turnOf];
          }
        })
      );

    this.gameOver$ = this.store
      .pipe(
        select(selectGameOver),
      );

    this.gameEnabled$ = this.store
      .pipe(
        select(selectGameEnabled),
      );
  }

}
