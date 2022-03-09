/* eslint-disable */
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { combineReducers} from '@reduxjs/toolkit';

import {
  watchStartGameSteps,
  watchRehydrate,
  showCell,
  step0,
  moveTo,
  step1,
  step2,
  step3,
  step4,
  step5
} from '@src/App/appSaga';

import { actions as appActions, reducer} from '@src/App/appSlice';
import { reducer as authReducer} from '@src/modules/Auth/authSlice';
import { addNewCellsToGameField, getNewCells } from '@src/utils';
import { IAppState } from '@src/App/model/IAppState';

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
        .withReducer(combineReducers({
          auth: authReducer,
        }), {
          auth: {
            userProfile: {
              login: 'user',
              loginTime: 123,
              password: 'pwd',
            },
          }
        })
        .put(appActions.updateHitParadeInfo({login: 'user', ts: 123, score: 0}))
        .put(appActions.waitOn())
        .provide([
          [matchers.call.fn(localStorage.getItem), persistedApp],
          [matchers.call.fn(JSON.parse), dataApp],
        ])
        .put(appActions.restoreGame(dataApp))
        .put(appActions.waitOff())
        .hasFinalState({
          auth: { userProfile: { login: 'user', loginTime: 123, password: 'pwd' } }
        })
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

  describe('watchStartGameSteps', () => {
    describe('showCell', () => {
      it('show unreachable cell', () => {
        return expectSaga(showCell, 80, {highlightedCells: {80: '#ff0000'}})
          .withReducer(combineReducers({
            app: reducer,
          }), {
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: 1,
            } as IAppState
          })
          .put(appActions.updateGame({
            gameFieldData: [
              0, 0, 0, 0, 0, 1, 1, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 1, 1,
            ],
            selectedCell: 80,
            highlightedCells: {80: '#ff0000'},
          }))
          .hasFinalState({
            app: {
              gameFieldData: [
                0, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
              ],
              selectedCell: 80,
              highlightedCells: {80: '#ff0000'},
            }
          })
          .run();
      });

      it('show selected cell', () => {
        return expectSaga(showCell, 1, {highlightedCells: undefined})
          .withReducer(combineReducers({
            app: reducer,
          }), {
            app: {
              gameFieldData: [
                0, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
              ],
              selectedCell: 80,
              highlightedCells: {80: '#ff0000'},
            }
          })
          .put(appActions.updateGame({
            gameFieldData: [
              0, 1, 0, 0, 0, 1, 1, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 1, 0,
            ],
            selectedCell: 1,
            highlightedCells: undefined
          }))
          .hasFinalState({
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: 1,
              highlightedCells: undefined
            }
          })
          .run();
      });
    });

    it('moveTo => cell 1 to 0', () => {
      return expectSaga(moveTo, [1, 0], [0, 0], 150)
        .withReducer(combineReducers({
          app: reducer,
        }), {
          app: {
            gameFieldData: [
              0, 1, 0, 0, 0, 1, 1, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 1, 0,
            ],
          }})
        .put(appActions.updateGame({
          gameFieldData: [
            1, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 1, 0,
          ],
          highlightedCells: { 0: '' }
        }))
        .hasFinalState({
          app: {
            gameFieldData: [
              1, 0, 0, 0, 0, 1, 1, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 1, 0,
            ],
            highlightedCells: { 0: '' }
          }})
        .run(500);
    });

    describe('steps:', () => {
      it('#0 => show unreachable cell and back to selected cell', () => {
        return expectSaga(step0, 1, 80, 250)
          .withReducer(combineReducers({
            app: reducer,
          }), {
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: 1,
            }
          })
          .hasFinalState({
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: 1,
              highlightedCells: undefined
            }
          })
          .run(500);
      });

      it('#1 => move cell from selected to target', () => {
        return expectSaga(step1, 0, [[1, 0], [0, 0]], 250)
          .withReducer(combineReducers({
            app: reducer,
          }), {
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
            }
          })
          .hasFinalState({
            app: {
              gameFieldData: [
                1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: undefined,
              highlightedCells: {0: ''}
            }
          })
          .run(500);
      });

      it('#2 => show outdated chains', () => {
        return expectSaga(step2, [[0, 0], [0, 9], [0, 18], [0, 27]], 250)
          .withReducer(combineReducers({
            app: reducer,
          }), {app: {} as IAppState})
          .hasFinalState({
            app: {
              highlightedCells: {0: '', 9: '', 18: '', 27: ''}
            }
          })
          .run(500);
      });

      it('#3 => remove outdated cells from game field', () => {
        return expectSaga(step3, [[0, 0], [0, 9], [0, 18], [0, 27]])
          .withReducer(combineReducers({
            app: reducer,
            auth: authReducer,
          }), {
            app: {
              gameFieldData: [
                1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              highlightedCells: {0: '#00ff00', 9: '#00ff00', 18: '#00ff00', 27: '#00ff00'},
              score: 100,
              hitParade: {
                111: { login: 'Игрок 1', ts: 111, score: 0 },
                222: { login: 'Игрок 2', ts: 222, score: 0 }
              }
            },
            auth: {
              userProfile: { loginTime: 111, login: 'user', password: 'pwd', token: '1-2-3' },
            }
          })
          .hasFinalState({
            app: {
              gameFieldData: [
                0, 0, 0, 0, 0, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              highlightedCells: undefined,
              score: 104,
              hitParade: {
                '111': { login: 'Игрок 1', ts: 111, score: 104 },
                '222': { login: 'Игрок 2', ts: 222, score: 0 }
              },
            },
            auth: {
              userProfile: {loginTime: 111, login: 'user', password: 'pwd', token: '1-2-3'},
            }
          })
          .run(500);
      });

      it('#4 => get new cells and show it on game field', () => {
        return expectSaga(step4, 250)
          .withReducer(combineReducers({
            app: reducer,
          }), {
            app: {
              gameFieldData: [
                0, 0, 0, 0, 0, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              userLevel: '1',
            }
          })
          .provide([
            [matchers.call(getNewCells, [
              0, 0, 0, 0, 0, 1, 1, 1, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 1, 0,
            ], '1'), [0, 1, 2]],
            [matchers.call(addNewCellsToGameField,
              [
                0, 0, 0, 0, 0, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              {0: '', 1: '', 2: ''}),
              [
                1, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ]
            ]
          ])
          .hasFinalState({
            app: {
              gameFieldData: [
                1, 1, 1, 0, 0, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              highlightedCells: {0: '', 1: '', 2: ''},
              userLevel: '1',
            }
          })
          .run(500);
      });

      it('#5 => tern off highlighted cells', () => {
        return expectSaga(step5)
          .withReducer(combineReducers({
            app: reducer,
          }), {
            app: {
              gameFieldData: [],
              highlightedCells: {0: '#ffff00', 1: '#ffff00', 2: '#ffff00'},
            } as IAppState
          })
          .hasFinalState({
            app: {
              gameFieldData: [],
              highlightedCells: undefined,
            }
          })
          .run();
      });
    });

    describe('start steps with:', () => {
      it('remove chains', () => {
        return expectSaga(watchStartGameSteps, {payload: 0, type: 'app/startGameSteps'})
          .withReducer(combineReducers({
            app: reducer,
            auth: authReducer,
          }), {
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: 1,
              userLevel: '1',
              score: 100,
            },
            auth: {
              userProfile: {loginTime: 123, login: 'user', password: 'pwd', token: '1-2-3'},
            }
          })
          .hasFinalState({
            app: {
              gameFieldData: [
                0, 0, 0, 0, 0, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: undefined,
              userLevel: '1',
              score: 104,
              highlightedCells: undefined,
              hitParade: undefined
            },
            auth: {
              userProfile: {loginTime: 123, login: 'user', password: 'pwd', token: '1-2-3'},
            }
          })
          .run(1000);
      });

      it('generate new cells', () => {
        return expectSaga(watchStartGameSteps, { payload: 2, type: 'app/startGameSteps' })
          .withReducer(combineReducers({
            app: reducer,
          }), {
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: 1,
              userLevel: '1',
              score: 100,
            }
          })
          .provide([
            [matchers.call(getNewCells, [
              0, 0, 1, 0, 0, 1, 1, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 1, 0,
            ], '1'), [10, 11, 12]],
            [matchers.call(addNewCellsToGameField,
              [
                0, 0, 1, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              {10: '', 11: '', 12: ''}),
              [
                0, 0, 1, 0, 0, 1, 1, 1, 1,
                1, 1, 1, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ]
            ]
          ])
          .hasFinalState({
            app: {
              gameFieldData: [
                0, 0, 1, 0, 0, 1, 1, 1, 1,
                1, 1, 1, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: undefined,
              userLevel: '1',
              score: 100,
              highlightedCells: undefined,
            }
          })
          .run(1000);
      });

      it('unreachable target cells', () => {
        return expectSaga(watchStartGameSteps, {payload: 80, type: 'app/startGameSteps'})
          .withReducer(combineReducers({
            app: reducer,
          }), {
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: 1,
              userLevel: '1',
              score: 100,
            }
          })
          .hasFinalState({
            app: {
              gameFieldData: [
                0, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0,
              ],
              selectedCell: 1,
              userLevel: '1',
              score: 100,
              highlightedCells: undefined,
            }
          })
          .run(1000);
      });
    });
  });
});
