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

  moveTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.moveTask),
      switchMap(({ taskId, columnId, previousColumnId }) =>
        this.dataService.moveTask(taskId, columnId).pipe(
          map((task) => TaskActions.moveTaskSuccess({ task })),
          catchError((error: Error) =>
            of(TaskActions.moveTaskFailure({
              taskId,
              previousColumnId,
              error: error.message
            }))
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({ id, updates }) =>
        this.dataService.updateTask(id, updates).pipe(
          map((task) => TaskActions.updateTaskSuccess({ id, task })),
          catchError((error: Error) =>
            of(TaskActions.updateTaskFailure({
              id,
              error: error.message
            }))
          )
        )
      )
    )
  );

}
