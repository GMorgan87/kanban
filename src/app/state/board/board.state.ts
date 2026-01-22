import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Board } from '../../core/models/models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { BoardActions } from './board.actions';

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

export const boardsFeature = createFeature({
  name: 'boards',
  reducer: createReducer(
    initialState,
    on(BoardActions.loadBoards, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(BoardActions.loadBoardsSuccess, (state, { boards }) =>
      boardAdapter.setAll(boards, { ...state, loading: false })
    ),
    on(BoardActions.loadBoardsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(BoardActions.selectBoard, (state, { id }) => ({
      ...state,
      selectedBoardId: id,
    }))
  ),
  extraSelectors: ({ selectBoardsState }) => ({
    ...boardAdapter.getSelectors(selectBoardsState),
  }),
});

export const {
  name,
  reducer,
  selectBoardsState,
  selectAll,
  selectEntities,
  selectSelectedBoardId,
  selectLoading,
  selectError,
} = boardsFeature;
