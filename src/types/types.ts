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

export interface OpplastetKvittering {
    reisetilskuddId: string;
}

export enum Transport {
    GÅR = 'GÅR', // eslint-disable-line
    SYKLER = 'SYKLER', // eslint-disable-line
    KOLLEKTIVTRANSPORT = 'KOLLEKTIVTRANSPORT', // eslint-disable-line
    EGEN_BIL = 'EGEN BIL', // eslint-disable-line
}

export enum Transportmiddel {
    SPØRSMÅLS_KEY = 'kvittering-transportmiddel-spørsmål', // eslint-disable-line
    TAXI = 'Taxi', // eslint-disable-line
    KOLLEKTIVT = 'Kollektivtransport', // eslint-disable-line
    EGEN_BIL = 'Egen bil' // eslint-disable-line
}

export class Reisetilskudd {
    reisetilskuddId: string;
    sykmeldingId: string;
    fnr: string;
    sendt?: string;
    avbrutt: boolean;

    fom?: string;
    tom?: string;

    orgNummer?: string;
    orgNavn?: string;
    utbetalingTilArbeidsgiver?: boolean;

    går: boolean;
    sykler: boolean;
    kollektivtransport: number;
    egenBil: number;

    kvitteringer: Kvittering[];

    constructor(
        rsReisetilskudd: RSReisetilskudd
    ) {
        this.reisetilskuddId = rsReisetilskudd.reisetilskuddId
        this.sykmeldingId = rsReisetilskudd.sykmeldingId
        this.fnr = rsReisetilskudd.fnr
        this.sendt = rsReisetilskudd.sendt
        this.avbrutt = rsReisetilskudd.avbrutt

        this.fom = rsReisetilskudd.fom
        this.tom = rsReisetilskudd.tom

        this.orgNummer = rsReisetilskudd.orgNummer
        this.orgNavn = rsReisetilskudd.orgNavn
        this.utbetalingTilArbeidsgiver = rsReisetilskudd.utbetalingTilArbeidsgiver

        this.går = rsReisetilskudd.går
        this.sykler = rsReisetilskudd.sykler
        this.kollektivtransport = rsReisetilskudd.kollektivtransport
        this.egenBil = rsReisetilskudd.egenBil

        this.kvitteringer = rsReisetilskudd.kvitteringer.map((rsKvittering: any) => {
            return new Kvittering(rsKvittering)
        })
    }
}

export class Kvittering {
    reisetilskuddId: string;
    kvitteringId?: string;
    navn?: string;
    storrelse?: number;
    belop?: number;
    fom?: Date;
    tom?: Date;
    transportmiddel?: keyof typeof Transportmiddel;

    constructor(
        rsKvittering: RSKvittering
    ) {
        this.reisetilskuddId = rsKvittering.reisetilskuddId
        this.kvitteringId = rsKvittering.kvitteringId
        this.navn = rsKvittering.navn
        this.storrelse = Number(rsKvittering.storrelse)
        this.belop = Number(rsKvittering.belop)
        this.fom = dayjsToDate(rsKvittering.fom)
        this.tom = dayjsToDate(rsKvittering.tom)
        this.transportmiddel = rsKvittering.transportmiddel as keyof typeof Transportmiddel
    }
}

export type Transportmidler = Transportmiddel.EGEN_BIL | Transportmiddel.KOLLEKTIVT | Transportmiddel.TAXI | undefined;

export type AktivtStegProps = {
    aktivtSteg: number,
    skalGåTilNesteSideNå?: boolean,
    onClick?: () => void,
}

export interface Svaralternativ {
    id: string,
    label: string,
    value: string,
}

export interface RadioSporsmalProps {
    id: string,
    tittel: string,
    name: string,
    spørsmålstekst: string,
    hjelpetekst?: string,
    svaralternativer: Svaralternativ[],
    feil?: string;
}

export interface CheckboxProps {
    id: string;
    tittel: string;
    svaralternativer: Svaralternativ[];
    validerSkjema?: (hvilkenCheckbox?: string | null, nyVerdi?: string | null) => void; // eslint-disable-line
}

export interface InputProps {
    id: string;
    tittel: string;
    inputMode: 'numeric';
    bredde: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
    value?: number | string | undefined;
    onChange?: (s: string) => void; // eslint-disable-line
    feil?: string;
}

export enum SykmeldingOpplysningEnum {
    ID = 'id', // eslint-disable-line
    FRA_DATO = 'fraDato', // eslint-disable-line
    TIL_DATO = 'tilDato', // eslint-disable-line
    DIAGNOSE = 'diagnose', // eslint-disable-line
    BI_DIAGNOSER = 'bidiagnoser', // eslint-disable-line
    DIAGNOSEKODE = 'diagnosekode', // eslint-disable-line
    REISETILSKUDD = 'reisetilskudd', // eslint-disable-line
    BESKRIV_HENSYN = 'beskrivHensyn', // eslint-disable-line
    ARBEIDSGIVER = 'arbeidsgiver', // eslint-disable-line
    SYKMELDER = 'sykmelder', // eslint-disable-line
    AKTIVITET_IKKE_MULIG_434 = 'aktivitetIkkeMulig434', // eslint-disable-line
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
