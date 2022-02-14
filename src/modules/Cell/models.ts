export type TPoss = [number, number];

export enum ICellInfo {
  empty = 0,
  red = 1,
  yellow = 2,
  green = 3,
}

export interface CellArray {
  size: number;
  data: ICellInfo[];
}
