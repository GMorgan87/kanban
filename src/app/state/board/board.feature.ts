import { createFeature, createSelector } from '@ngrx/store';
import { boardReducer } from './board.reducers';
import { boardAdapter } from './board.state';

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
