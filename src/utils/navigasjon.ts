import { SEPARATOR } from './constants';
import { getAntallSider } from '../constants/sideTitler';

export const pathUtenSteg = (pathname: string) : string => {
  const arr: string[] = pathname.split(SEPARATOR);
  arr.pop();
  return arr.join(SEPARATOR);
};

// eslint-disable-next-line max-len
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
export const pathTilSide = (idx: number, history: any) : string => (
  pathUtenSteg(history.location.pathname) + SEPARATOR + (idx)
);

// eslint-disable-next-line max-len
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
export const gåTilNesteSide = (history : any, aktivtSteg : number) : void => {
  if (
    aktivtSteg + 1 <= getAntallSider()
    && aktivtSteg + 1 > 1
  ) {
    history.push(pathTilSide(aktivtSteg + 1, history));
  }
};
