export interface IPeriode {
  id: string;
  transportMiddel? : Transportmiddel
  fraDato?: Date;
  tilDato?: Date;
}

export enum Transportmiddel {
  taxi = 'Taxi',
  kollektiv = 'Kollektivtransport',
  egenBil = 'Egen bil'
}
