import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameState, selectGameOver, selectPlayers, selectTurnOf} from '../../store';
import {select, Store} from '@ngrx/store';
import {filter, map, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss']
})
export class GameStatusComponent implements OnInit {

  public players: any;
  public player: string;
  public gameOver$: Observable<boolean>;
  public turnOf$: Observable<string>;

  constructor(private store: Store<GameState>) {
  }

  ngOnInit() {
    this.store
      .pipe(
        select(selectPlayers),
        filter(players => !!players),
        map(players => {
          return {
            X: players.playerA,
            O: players.playerB,
          };
        })
      )
      .subscribe(players => this.players = players);

    this.gameOver$ = this.store
      .pipe(
        select(selectGameOver),
      );

    this.turnOf$ = this.store
      .pipe(
        select(selectTurnOf),
        tap(turnOf => {
          if (this.players) {
            this.player = this.players[turnOf];
          }
        })
      );
  }

}
