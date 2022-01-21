export enum ICellInfo {
  alive = 1,
  dead = 0,
}

export interface CellArray {
  size: number;
  data: ICellInfo[];
}
