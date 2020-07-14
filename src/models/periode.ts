export interface IPeriode {
  id: string;
  fraDato: Date;
  tilDato: Date;
  transportMiddel : Transportmiddel
}

export enum Transportmiddel {
  taxi = 'Taxi',
  kollektiv = 'Kollektivtransport',
  egenBil = 'Egen bil'
}
