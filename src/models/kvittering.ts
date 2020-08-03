export interface KvitteringInterface {
  reisetilskuddId: string;
  navn: string;
  størrelse: number;
  beløp: number;
  fom: Date;
  kvitteringId: string;
  transportmiddel?:
  Transportmiddel.TAXI |
  Transportmiddel.KOLLEKTIV |
  Transportmiddel.EGEN_BIL;
}

export interface OpplastetKvitteringInterface {
  id: string;
}

export enum Transportmiddel {
  SPØRSMÅLS_KEY = 'kvittering-transportmiddel-spørsmål',
  TAXI = 'Taxi',
  KOLLEKTIV = 'Kollektivtransport',
  EGEN_BIL = 'Egen bil'
}

export type TransportmiddelAlternativer = Transportmiddel.EGEN_BIL | Transportmiddel.KOLLEKTIV
| Transportmiddel.TAXI | undefined;
