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

export interface InputProps {
    id: string;
    tittel: string;
    inputMode: 'numeric';
    bredde: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
    value?: number | string | undefined;
    onChange?: (s: string) => void;
    feil?: string;
}

export enum SykmeldingOpplysningEnum {
    ID = 'id',
    FRA_DATO = 'fraDato',
    TIL_DATO = 'tilDato',
    DIAGNOSE = 'diagnose',
    BI_DIAGNOSER = 'bidiagnoser',
    DIAGNOSEKODE = 'diagnosekode',
    REISETILSKUDD = 'reisetilskudd',
    BESKRIV_HENSYN = 'beskrivHensyn',
    ARBEIDSGIVER = 'arbeidsgiver',
    SYKMELDER = 'sykmelder',
    AKTIVITET_IKKE_MULIG_434 = 'aktivitetIkkeMulig434',
}

export interface SykmeldingOpplysning {
    [SykmeldingOpplysningEnum.ID]: string;
    [SykmeldingOpplysningEnum.FRA_DATO]: string;
    [SykmeldingOpplysningEnum.TIL_DATO]: string;
    [SykmeldingOpplysningEnum.DIAGNOSE]: string;
    [SykmeldingOpplysningEnum.BI_DIAGNOSER]: string;
    [SykmeldingOpplysningEnum.DIAGNOSEKODE]: string;
    [SykmeldingOpplysningEnum.REISETILSKUDD]: string;
    [SykmeldingOpplysningEnum.BESKRIV_HENSYN]: string;
    [SykmeldingOpplysningEnum.ARBEIDSGIVER]: string;
    [SykmeldingOpplysningEnum.SYKMELDER]: string;
    [SykmeldingOpplysningEnum.AKTIVITET_IKKE_MULIG_434]: string;
}

export interface Periode {
    fom: string,
    tom: string,
    reisetilskudd: boolean,
}

export interface Diagnose {
    diagnose: string,
    diagnosekode: string,
    diagnosesystem: string,
}

export interface Sykmelding {
    id: string,
    mulighetForArbeid: {
        perioder: Periode[],
        aktivitetIkkeMulig433: string[],
    },
    diagnose: {
        hoveddiagnose: Diagnose,
        bidiagnoser: Diagnose[],
    },
    mottakendeArbeidsgiver: {
        navn: string,
        virksomhetsnummer: string
    },
    bekreftelse: {
        sykmelder: string,
    }
}
