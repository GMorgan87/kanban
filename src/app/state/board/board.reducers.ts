import { createReducer, on } from '@ngrx/store';
import { BoardActions } from './board.actions';
import { boardAdapter, initialState } from './board.state';

export const boardReducer = createReducer(
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
);
