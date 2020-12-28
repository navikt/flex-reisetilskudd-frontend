export interface RSReisetilskudd {
    reisetilskuddId: string;
    sykmeldingId: string;
    fnr: string;
    status: string;
    sendt?: string;
    avbrutt?: string;
    // TODO: oppfølgende: boolean

    fom?: string;
    tom?: string;

    orgNummer?: string;
    orgNavn?: string;
    utbetalingTilArbeidsgiver?: boolean;

    går: boolean;
    sykler: boolean;
    kollektivtransport: number;
    egenBil: number;

    kvitteringer: RSKvittering[];
}

export interface RSKvittering {
    reisetilskuddId: string,
    kvitteringId?: string,
    navn?: string,
    storrelse?: number,
    belop?: number,
    fom?: string,
    tom?: string,
    transportmiddel?: string,
}
