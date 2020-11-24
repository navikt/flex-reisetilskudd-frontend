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

export interface Kvittering {
    reisetilskuddId: string;
    kvitteringId: string;
    navn: string;
    storrelse: number;
    belop?: number;
    fom: Date;
    tom?: Date;
    transportmiddel?: string;
}

export interface OpplastetKvittering {
    id: string;
}

export enum Transport {
    GÅR = 'GÅR',
    SYKLER = 'SYKLER',
    KOLLEKTIVTRANSPORT = 'KOLLEKTIVTRANSPORT',
    EGEN_BIL = 'EGEN BIL',
}

export enum Transportmiddel {
    SPØRSMÅLS_KEY = 'kvittering-transportmiddel-spørsmål',
    TAXI = 'Taxi',
    KOLLEKTIVT = 'Kollektivtransport',
    EGEN_BIL = 'Egen bil'
}

export type Transportmidler = Transportmiddel.EGEN_BIL | Transportmiddel.KOLLEKTIVT | Transportmiddel.TAXI | undefined;

export type AktivtStegProps = {
    aktivtSteg: number,
    skalGåTilNesteSideNå?: boolean,
    onClick?: () => void,
}

export interface Reisetilskudd {
    id: string,
    sykmeldingId: string,
    fnr: string,

    fom?: string,
    tom?: string,

    orgNummer?: string,
    orgNavn?: string,
    utbetalingTilArbeidsgiver?: boolean,

    går: boolean,
    sykler: boolean,
    kollektivtransport: number,
    egenBil: number,

    kvitteringer: Kvittering[]
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
    validerSkjema?: (hvilkenCheckbox?: string | null, nyVerdi?: string | null) => void;
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
