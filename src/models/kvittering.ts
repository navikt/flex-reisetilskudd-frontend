export interface KvitteringInterface {
  id: string;
  navn: string;
  størrelse: number;
  beløp?: number;
  dato?: Date;
  dokumentId?: string;
  transportmiddel?:
  Transportmiddel.TAXI |
  Transportmiddel.KOLLEKTIV |
  Transportmiddel.EGEN_BIL;
}

export interface OpplastetKvitteringInterface {
  dokumentId: string;
}

export enum Transportmiddel {
  SPØRSMÅLS_KEY = 'vedlegg-transportmiddel-spørsmål',
  TAXI = 'Taxi',
  KOLLEKTIV = 'Kollektivtransport',
  EGEN_BIL = 'Egen bil'
}

export type TransportmiddelAlternativer = Transportmiddel.EGEN_BIL | Transportmiddel.KOLLEKTIV
| Transportmiddel.TAXI | undefined;
