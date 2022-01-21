import actionType from './actionType';

const setSelectedCell = (selectedCell?: number) => ({
  type: actionType.SET_SELECTED,
  payload: { selectedCell },
});

export { setSelectedCell };
