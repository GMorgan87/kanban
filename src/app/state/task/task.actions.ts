import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../core/models/models';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
    'Select Task': props<{ id: string }>(),
    'Move Task': props<{ taskId: string; columnId: string; previousColumnId: string }>(),
    'Move Task Success': props<{ task: Task }>(),
    'Move Task Failure': props<{ taskId: string; previousColumnId: string; error: string }>(),
    'Update Task': props<{ id: string, updates: Partial<Task> }>(),
    'Update Task Success': props<{ id: string, task: Task }>(),
    'Update Task Failure': props<{ id: string, error: string }>(),
  },
});
