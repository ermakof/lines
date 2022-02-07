/* eslint-disable */
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { watchMoveToCell, watchRehydrate } from '@src/App/appSaga';

import { actions as appActions } from '@src/App/appSlice';
import {getOutdatedCells, moveToCell, updateGameField} from "@src/utils";
import getOutdatedChains from "../../utils/getOutdatedChains";

describe('appSaga test plan', () => {
  describe('watchRehydrate', () => {
    it('Rehydrate success', () => {
      expect.assertions(0);
      const persistedApp =
        '{"userLevel":"1","gameFieldPercentFilled":10,"gameFieldData":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],"isLoading":true}';
      const dataApp = {
        userLevel: '1',
        gameFieldPercentFilled: 10,
        gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        isLoading: false,
      };
      return expectSaga(watchRehydrate)
        .put(appActions.waitOn())
        .provide([
          [matchers.call.fn(localStorage.getItem), persistedApp],
          [matchers.call.fn(JSON.parse), dataApp],
        ])
        .put(appActions.restoreGame(dataApp))
        .put(appActions.waitOff())
        .run();
    });

    it('Rehydrate fail', () => {
      expect.assertions(0);
      return expectSaga(watchRehydrate)
        .put(appActions.waitOn())
        .provide([[matchers.call.fn(localStorage.getItem), undefined]])
        .put(appActions.waitOff())
        .run();
    });
  });

  describe('watchMoveToCell', () => {
    it('move to cell success', () => {
      const state = {
        app: {
          gameFieldData: [
            0, 1, 0, 0, 0, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          selectedCell: 1,
          score: 100,
          userLevel: '1',
        }
      };
      const changedGameFieldData = [
        1, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const filteredGameFieldData = [
        0, 0, 0, 0, 0, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const outdatedChains = [[0, 8, 16, 24]];
      const outdatedCells = {0: true, 8: true, 16: true, 24: true};
      return expectSaga(watchMoveToCell, { payload: 0 })
        .withState(state)
        .provide([
          [
            matchers.call(
              moveToCell,
              state.app.gameFieldData,
              state.app.selectedCell,
              1
            ),
            changedGameFieldData,
          ],
          [
            matchers.call(
              getOutdatedChains,
              0,
              '1',
              changedGameFieldData
            ),
            outdatedChains
          ],
          [
            matchers.call(
              getOutdatedCells,
              outdatedChains,
            ),
            outdatedCells
          ],
          [
            matchers.call(
              updateGameField,
              changedGameFieldData,
              outdatedChains,
            ),
            filteredGameFieldData
          ]
        ])
        .put({type: 'app/updateGame', payload: { gameFieldData: changedGameFieldData }})
        .put({type: 'app/updateGame', payload: { outdatedCells: {0: true, 8: true, 16: true, 24: true}}})
        .put({
          type: 'app/updateGame',
          payload: {
            gameFieldData: filteredGameFieldData,
            outdatedCells: undefined,
            selectedCell: undefined,
            score: 104,
          }
        })
        .run(600);
    });
  });
});
