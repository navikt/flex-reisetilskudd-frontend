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

export interface SykmeldingOpplysningInterface {
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
