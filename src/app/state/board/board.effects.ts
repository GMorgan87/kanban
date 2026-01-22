import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../core/services/data';
import { BoardActions } from './board.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class BoardEffects {
  private actions$ = inject(Actions);
  private dataService = inject(DataService);

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      switchMap(() =>
        this.dataService.getBoards().pipe(
          map((boards) => BoardActions.loadBoardsSuccess({ boards })),
          catchError((error: Error) =>
            of(BoardActions.loadBoardsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
