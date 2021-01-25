import { RSKvittering, RSReisetilskudd } from './rs-types/rsReisetilskudd'
import { dayjsToDate } from '../utils/dato'

export interface ArbeidsgiverInterface {
    navn: string,
    orgNr: string,
}

export interface Brodsmule {
    sti: string;
    tittel: string;
    mobilTittel?: string;
    erKlikkbar?: boolean;
}

export enum Transport {
    OFFENTLIG = 'OFFENTLIG',
    EGEN_BIL = 'EGEN BIL',
}

export enum Transportmiddel {
    SPORSMAL_KEY = 'kvittering-transportmiddel-spørsmål',
    TAXI = 'Taxi',
    KOLLEKTIVT = 'Kollektivtransport',
    EGEN_BIL = 'Egen bil'
}

export enum ReisetilskuddStatus {
    FREMTIDIG = 'FREMTIDIG',
    ÅPEN = 'ÅPEN',
    SENDBAR = 'SENDBAR',
    SENDT = 'SENDT',
    AVBRUTT = 'AVBRUTT'
}

export class Reisetilskudd {
    id: string;
    sykmeldingId: string;
    fnr: string;
    status: keyof typeof ReisetilskuddStatus;
    sendt?: Date;
    avbrutt?: Date;

    fom?: string;
    tom?: string;

    orgNummer?: string;
    orgNavn?: string;
    utbetalingTilArbeidsgiver?: boolean;

    offentlig: number;
    egenBil: number;

    kvitteringer: Kvittering[];

    constructor(
        rsReisetilskudd: RSReisetilskudd
    ) {
        this.id = rsReisetilskudd.reisetilskuddId
        this.sykmeldingId = rsReisetilskudd.sykmeldingId
        this.fnr = rsReisetilskudd.fnr
        this.status = rsReisetilskudd.status as keyof typeof ReisetilskuddStatus
        this.sendt = dayjsToDate(rsReisetilskudd.sendt)
        this.avbrutt = dayjsToDate(rsReisetilskudd.avbrutt)

        this.fom = rsReisetilskudd.fom
        this.tom = rsReisetilskudd.tom

        this.orgNummer = rsReisetilskudd.orgNummer
        this.orgNavn = rsReisetilskudd.orgNavn
        this.utbetalingTilArbeidsgiver = rsReisetilskudd.utbetalingTilArbeidsgiver

        this.offentlig = rsReisetilskudd.kollektivtransport
        this.egenBil = rsReisetilskudd.egenBil

        this.kvitteringer = rsReisetilskudd.kvitteringer.map((rsKvittering: any) => {
            return new Kvittering(rsKvittering)
        })
    }
}

export class Kvittering {
    kvitteringId?: string;
    blobId?: string;
    navn?: string;
    storrelse?: number;
    belop?: number;
    datoForReise?: Date;
    transportmiddel?: keyof typeof Transportmiddel;

    constructor(
        rsKvittering?: RSKvittering
    ) {
        this.kvitteringId = rsKvittering?.kvitteringId
        this.blobId = rsKvittering?.blobId
        this.navn = rsKvittering?.navn
        this.storrelse = rsKvittering?.storrelse
        this.belop = rsKvittering?.belop
        this.datoForReise = dayjsToDate(rsKvittering?.datoForReise)
        this.transportmiddel = rsKvittering?.transportmiddel as keyof typeof Transportmiddel
    }


}
