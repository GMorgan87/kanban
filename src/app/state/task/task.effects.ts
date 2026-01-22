import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../core/services/data';
import { TaskActions } from './task.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private dataService = inject(DataService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.dataService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error: Error) =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
