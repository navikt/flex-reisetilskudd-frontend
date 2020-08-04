export interface KvitteringInterface {
  reisetilskuddId: string;
  kvitteringId: string;
  navn: string;
  storrelse: number;
  belop: number;
  fom: Date;
  transportmiddel?: string;
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
