import { createFeature, createSelector } from '@ngrx/store';
import { tasksReducer } from './task.reducers';
import { taskAdapter } from './task.state';

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
