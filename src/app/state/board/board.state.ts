import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Board } from '../../core/models/models';

export interface BoardsState extends EntityState<Board> {
  selectedBoardId: string | null;
  loading: boolean;
  error: string | null;
}

export const boardAdapter: EntityAdapter<Board> = createEntityAdapter<Board>();

export const initialState: BoardsState = boardAdapter.getInitialState({
  selectedBoardId: null,
  loading: false,
  error: null,
});
