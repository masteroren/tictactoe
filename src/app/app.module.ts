import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GamePanelComponent} from './components/game-panel/game-panel.component';
import {GameBoardComponent} from './components/game-board/game-board.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GameStatusComponent} from './components/game-status/game-status.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {gameReducer} from './store/reducer';

@NgModule({
  declarations: [
    AppComponent,
    GamePanelComponent,
    GameBoardComponent,
    GameStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({game: gameReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
