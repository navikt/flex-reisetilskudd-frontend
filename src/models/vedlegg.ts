export interface KvitteringInterface {
  id: string;
  navn: string;
  størrelse: number;
  beløp?: number;
  dato?: Date;
  dokumentId?: string;
  transportMiddel?:
  Transportmiddel.taxi |
  Transportmiddel.kollektiv |
  Transportmiddel.egenBil;
}

export interface OpplastetVedleggInterface {
  dokumentId: string;
}

export enum Transportmiddel {
  taxi = 'Taxi',
  kollektiv = 'Kollektivtransport',
  egenBil = 'Egen bil'
}
