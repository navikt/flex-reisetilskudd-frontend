import { IVedlegg } from './vedlegg';

export interface IPeriode {
  id: string;
  vedlegg: Array<IVedlegg>;
  transportMiddel?:
  Transportmiddel.taxi |
  Transportmiddel.kollektiv |
  Transportmiddel.egenBil;
  fraDato?: Date;
  tilDato?: Date;
}

export enum Transportmiddel {
  taxi = 'Taxi',
  kollektiv = 'Kollektivtransport',
  egenBil = 'Egen bil'
}
