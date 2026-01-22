import { EntityState } from '@ngrx/entity';
import { Board, Task } from '../core/models/models';

export interface AppState {
  boards: BoardsState;
  tasks: TasksState;
}

export interface BoardsState extends EntityState<Board> {
  selectedBoardId: string | null;
  loading: boolean;
  error: string | null;
}

export interface TasksState extends EntityState<Task> {
  loading: boolean;
  error: string | null;
}
