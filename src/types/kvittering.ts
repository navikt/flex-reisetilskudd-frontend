export interface Kvittering {
    reisetilskuddId: string;
    kvitteringId: string;
    navn: string;
    storrelse: number;
    belop: number;
    fom: Date;
    tom?: Date;
    transportmiddel?: string;
}

export interface OpplastetKvittering {
    id: string;
}

export enum Transportmiddel {
    SPØRSMÅLS_KEY = 'kvittering-transportmiddel-spørsmål',
    TAXI = 'Taxi',
    KOLLEKTIVT = 'Kollektivtransport',
    EGEN_BIL = 'Egen bil'
}

export type TransportmiddelAlternativer = Transportmiddel.EGEN_BIL | Transportmiddel.KOLLEKTIVT
| Transportmiddel.TAXI | undefined;
