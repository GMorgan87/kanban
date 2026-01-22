import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { boardsFeature } from './state/board/board.feature';
import { tasksFeature } from './state/task/task.feature';
import { BoardEffects } from './state/board/board.effects';
import { TaskEffects } from './state/task/task.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      [boardsFeature.name]: boardsFeature.reducer,
      [tasksFeature.name]: tasksFeature.reducer,
    }),
    provideEffects(BoardEffects, TaskEffects),
  ],
};
