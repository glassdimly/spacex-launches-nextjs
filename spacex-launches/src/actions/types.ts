export interface Launch {
  date: string;
  rocketName: string;
  details: string;
  url: string;
  img: string;
  id: number;
  landSuccess: boolean;
  reusedCore: boolean;
  withReddit: boolean;
}

export interface Params {
  [key: string]: string | number | boolean;
}

// @TODO proper TS def for unadapted launches
export interface RawLaunch {
  [key: string]: any;
}

export type FilterFunc = (launch: Launch) => boolean;

export interface CheckBoxFilter {
  id: string;
  name: string;
  filterFunc: FilterFunc;
}
