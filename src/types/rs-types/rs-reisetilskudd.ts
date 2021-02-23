import { RSSporsmal } from './rs-sporsmal'

export interface RSReisetilskudd {
    id: string;
    status: string;
    sykmeldingId: string;
    fnr: string;
    fom: string;
    tom: string;
    opprettet: string;
    endret: string;
    sendt: string | null;
    avbrutt: string | null;
    arbeidsgiverOrgnummer: string | null;
    arbeidsgiverNavn: string | null;
    sporsmal: RSSporsmal[]
}
