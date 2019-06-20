import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameState, selectGameEnabled} from '../../store';
import {select, Store} from '@ngrx/store';
import {ClearBoard, StartGame} from '../../store/actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss']
})
export class GamePanelComponent implements OnInit {

  public form: FormGroup;
  public gameEnabled$: Observable<boolean>;

  constructor(private store: Store<GameState>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      playerA: ['', Validators.required],
      playerB: ['', Validators.required],
    });

    this.gameEnabled$ = this.store
      .pipe(
        select(selectGameEnabled),
      );
  }

  onStartGame() {
    this.store.dispatch(new StartGame({
      gameEnabled: true,
      players: this.form.getRawValue(),
    }));
  }

  onClearBoard() {
    this.form.reset();
    this.store.dispatch(new ClearBoard());
  }
}
