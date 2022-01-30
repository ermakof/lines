import { IAppState } from '@src/App/model/IAppState';
import createGameField from '@src/utils/createGameField';

const INIT_GAME_LEVEL = '1';
const INIT_GAME_FIELD_SIZE = 9;
const INIT_GAME_FIELD_PERCENT_FILLED = 0;

interface ISettings {
  size: number;
  percent: number;
  chain: number;
}
interface IProps {
  [key: string]: ISettings;
}
export const GAME_LEVEL_SETTINGS: IProps = {
  '1': { size: 4, percent: 10, chain: 2 },
  '2': { size: 6, percent: 20, chain: 3 },
  '3': { size: 9, percent: 30, chain: 4 },
};

const initialState: IAppState = {
  userLevel: INIT_GAME_LEVEL,
  gameFieldSize: GAME_LEVEL_SETTINGS[INIT_GAME_LEVEL].size,
  gameFieldPercentFilled: INIT_GAME_FIELD_PERCENT_FILLED,
  gameFieldData: createGameField(INIT_GAME_FIELD_SIZE ** 2, INIT_GAME_FIELD_PERCENT_FILLED),
  outdatedCells: undefined,
  score: 0,
  selectedCell: undefined,
  isLoading: false,
  minChainLength: GAME_LEVEL_SETTINGS[INIT_GAME_LEVEL].chain,
};

export default initialState;
