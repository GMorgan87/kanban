import { createReducer, on } from '@ngrx/store';
import { taskAdapter, initialState } from './task.state';
import { TaskActions } from './task.actions';

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, { ...state, loading: false })
  ),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TaskActions.moveTask, (state, { taskId, columnId }) => {
    const task = state.entities[taskId];
    if (!task) return state;
    return taskAdapter.updateOne(
      { id: taskId, changes: { columnId, updatedAt: new Date().toISOString() } },
      state
    );
  }),
  on(TaskActions.moveTaskFailure, (state, { taskId, previousColumnId }) => {
    const task = state.entities[taskId];
    if (!task) return state;
    return taskAdapter.updateOne(
      { id: taskId, changes: { columnId: previousColumnId } },
      state
    );
  }),
  on(TaskActions.updateTask, (state, { id, updates }) => {
    const task = state.entities[id];
    if (!task) return state;
    return taskAdapter.updateOne(
      { id, changes: { ...task, ...updates } },
      state
    );
  }),
  on(TaskActions.updateTaskSuccess, (state, { id, task }) => {
    return taskAdapter.updateOne(
      { id, changes: task },
      state
    );
  }),
  on(TaskActions.updateTaskFailure, (state, { id, error })=> {
    return {
      ...state,
      error
    };
  })
);
