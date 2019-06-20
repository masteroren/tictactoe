import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameState, selectGameEnabled} from '../../store';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit{

  @Input() gameButtons;
  @Input() gameOver;
  @Input() boardConfig;
  @Output() turn = new EventEmitter();

  public gameEnabled$: Observable<boolean>;

  constructor(private store: Store<GameState>) {
  }

  ngOnInit(): void {
    this.gameEnabled$ = this.store
      .pipe(
        select(selectGameEnabled),
      );
  }
}
