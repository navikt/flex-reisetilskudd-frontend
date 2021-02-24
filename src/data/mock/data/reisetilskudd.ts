import { mockSykmelding } from './sykmeldinger'
import { RSReisetilskudd } from '../../../types/rs-types/rs-reisetilskudd'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

export const sendbarReisetilskudd: RSReisetilskudd = {
    'id': '3b6d3764-bc4d-4fe2-902d-5097b9e0ce93',
    'status': 'SENDBAR',
    'sykmeldingId': mockSykmelding.id,
    'fnr': '01010112345',
    'fom': '2021-02-01',
    'tom': '2021-02-18',
    'opprettet': '2021-02-19T10:25:59.232709Z',
    'endret': '2021-02-19T10:25:59.232720Z',
    'sendt': null,
    'avbrutt': null,
    'arbeidsgiverOrgnummer': '995816598',
    'arbeidsgiverNavn': '995816598 sitt orgnavn :)',
    'sporsmal': [
        {
            'id': '7d293cf9-6274-4d05-80f3-f7a6be337506',
            'tag': 'ANSVARSERKLARING',
            'overskrift': 'Vi stoler på deg',
            'sporsmalstekst': 'Jeg, <strong>Ola Nordmann</strong>, bekrefter at jeg vil gi riktige og fullstendige opplysninger.',
            'undertekst': 'Jeg vet at jeg kan miste retten til sykepenger hvis jeg ikke har gitt riktige opplysninger. Jeg vet også at jeg må betale tilbake hvis jeg har gitt feil opplysninger eller latt være å informere.',
            'svartype': 'CHECKBOX_PANEL',
            'min': null,
            'max': null,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': 'b59b2bea-1d4c-49e7-9e05-351aaf083232',
            'tag': 'TRANSPORT_TIL_DAGLIG',
            'overskrift': 'Transport til daglig',
            'sporsmalstekst': 'bruker du vanligvis bil eller offentlig transport til og fra arbeidsplassen?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': 'e9d8255d-4277-41c2-bc63-904029c71623',
                    'tag': 'TYPE_TRANSPORT',
                    'overskrift': null,
                    'sporsmalstekst': 'Hva slags type transport bruker du?',
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '0c0d7a32-db1c-41d9-ba2d-cb0e44db208d',
                            'tag': 'BIL_TIL_DAGLIG',
                            'overskrift': null,
                            'sporsmalstekst': 'Bil',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': 'c56ca825-5993-4a13-bba7-29d592944b20',
                                    'tag': 'KM_HJEM_JOBB',
                                    'overskrift': null,
                                    'sporsmalstekst': 'Hvor mange km er reisen med bil hjemmefra til jobb?',
                                    'undertekst': null,
                                    'svartype': 'KILOMETER',
                                    'min': '0',
                                    'max': null,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '96e7c69e-8af5-4b4d-ae10-1d3c19cc29e2',
                            'tag': 'OFFENTLIG_TRANSPORT_TIL_DAGLIG',
                            'overskrift': null,
                            'sporsmalstekst': 'Offentlig transport',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '5fb4961f-90d5-4893-9821-24b3a68cf3e1',
                                    'tag': 'OFFENTLIG_TRANSPORT_BELOP',
                                    'overskrift': null,
                                    'sporsmalstekst': 'Hvor mye betaler du vanligvis i måneden for offentlig transport?',
                                    'undertekst': null,
                                    'svartype': 'BELOP',
                                    'min': '0',
                                    'max': null,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'id': '7f8e5fd4-325b-4614-9eb3-39faa2bb511f',
            'tag': 'REISE_MED_BIL',
            'overskrift': 'Reise med bil',
            'sporsmalstekst': 'Reiser du med bil til og fra jobben mellom 1. - 18. februar 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': 'deaac8aa-11b9-4e60-86e2-b90af5cf8b04',
                    'tag': 'BIL_DATOER',
                    'overskrift': null,
                    'sporsmalstekst': 'Hvilke dager reiste du med bil',
                    'undertekst': null,
                    'svartype': 'DATOER',
                    'min': '2021-02-01',
                    'max': '2021-02-18',
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': 'c5e8e211-d8d1-404d-85a7-d6e073f1fd4b',
            'tag': 'KVITTERINGER',
            'overskrift': 'Kvitteringer',
            'sporsmalstekst': 'Last opp kvitteringer for reiser til og fra jobben mellom 1. - 18. februar 2021.',
            'undertekst': null,
            'svartype': 'KVITTERING',
            'min': null,
            'max': null,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '2723f1dc-a45e-44b1-bb0c-a7caa34a43f2',
            'tag': 'UTBETALING',
            'overskrift': 'Utbetaling',
            'sporsmalstekst': 'Legger arbeidsgiveren din ut for reisene?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        }
    ]
}

const apenReisetilskudd = jsonDeepCopy(sendbarReisetilskudd)
apenReisetilskudd.status = 'ÅPEN'
apenReisetilskudd.id = '7c44562e-68cc-478c-a49c-379bb150bdda'

const pabegyntReisetilskudd = jsonDeepCopy(sendbarReisetilskudd)
pabegyntReisetilskudd.status = 'PÅBEGYNT'
pabegyntReisetilskudd.id = '7829589c-989b-4a14-a4e2-37483b65d91f'

const sendbarMedEtSvar = jsonDeepCopy(sendbarReisetilskudd)
sendbarMedEtSvar.id = 'f473d4d1-3bf1-40c1-8647-94261f6bd30a'
sendbarMedEtSvar.sporsmal[0].svar.push({ id: 'agdfdfg', verdi: 'CHECKED', kvittering: null })

const fremtidig = jsonDeepCopy(sendbarReisetilskudd)
fremtidig.status = 'FREMTIDIG'
fremtidig.id = 'e3e3bb3d-2a70-4f67-bc90-8227d747eb4a'

export const reisetilskuddene: RSReisetilskudd[] = [
    sendbarReisetilskudd,
    apenReisetilskudd,
    pabegyntReisetilskudd,
    sendbarMedEtSvar,
    fremtidig
]
