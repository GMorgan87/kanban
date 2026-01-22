import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Board } from '../../core/models/models';

export const BoardActions = createActionGroup({
  source: 'Board',
  events: {
    'Load Boards': emptyProps(),
    'Load Boards Success': props<{ boards: Board[] }>(),
    'Load Boards Failure': props<{ error: string }>(),
    'Select Board': props<{ id: string }>(),
  },
});
