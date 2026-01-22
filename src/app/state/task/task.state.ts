import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../../core/models/models';
import { createFeature, createSelector } from '@ngrx/store';
import { tasksReducer } from './task.reducers';

export interface TasksState extends EntityState<Task> {
  loading: boolean;
  error: string | null;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TasksState = taskAdapter.getInitialState({
  loading: false,
  error: null,
});

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: tasksReducer,

  extraSelectors: ({ selectTasksState, selectEntities }) => ({
    ...taskAdapter.getSelectors(selectTasksState),
    selectTasksByColumn: (columnId: string) => createSelector(
      taskAdapter.getSelectors(selectTasksState).selectAll,
      (tasks) => tasks.filter(task => task.columnId === columnId)
    )
  })
});

export const {
  name,
  reducer,
  selectTasksState,
  selectEntities,
  selectAll,
  selectLoading,
  selectError,
  selectTasksByColumn,
} = tasksFeature;
