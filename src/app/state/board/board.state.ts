import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Board } from '../../core/models/models';
import { createFeature, createSelector } from '@ngrx/store';
import { boardReducer } from './board.reducers';

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
  reducer: boardReducer,
  extraSelectors: ({ selectBoardsState, selectEntities, selectSelectedBoardId }) => ({
    ...boardAdapter.getSelectors(selectBoardsState),
    selectSelectedBoard: createSelector(
      selectEntities,
      selectSelectedBoardId,
      (entities, selectedId) => (selectedId ? entities[selectedId] : null)
    ),
  }),
});

export const {
  name,
  reducer,
  selectBoardsState,
  selectAll,
  selectEntities,
  selectSelectedBoardId,
  selectSelectedBoard,
  selectLoading,
  selectError,
} = boardsFeature;
