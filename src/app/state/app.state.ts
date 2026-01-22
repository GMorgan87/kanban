import { BoardsState } from './board/board.state';
import { TasksState } from './task/task.state';

export interface AppState {
  boards: BoardsState;
  tasks: TasksState;
}
