import { RSSporsmal } from './rs-sporsmal'

export interface RSReisetilskudd {
    id: string;
    status: string;
    sykmeldingId: string;
    fnr: string;
    fom?: string;
    tom?: string;
    sendt?: string;
    avbrutt?: string;
    arbeidsgiverOrgnummer: string;
    arbeidsgiverNavn: string;
    sporsmal: RSSporsmal[]
}
