import { Vedlegg } from './vedlegg';

export interface PeriodeInterface {
  id: string;
  vedlegg: Array<Vedlegg>;
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
