import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../../core/models/models';
import { createFeature, createReducer } from '@ngrx/store';

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
  reducer: createReducer(
    initialState,
  ),
});

export const {
  name,
  reducer,
  selectTasksState,
  selectEntities,
  selectLoading,
  selectError,
} = tasksFeature;
