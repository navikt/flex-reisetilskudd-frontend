import { Sykmelding } from '../../../types/sykmelding'

// TODO: Oppdater med "ekte" sykmelding
export const mockSykmelding : Sykmelding = {
    'id': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'mottakendeArbeidsgiver': {
        'navn': 'POSTEN NORGE AS, BÆRUM',
        'virksomhetsnummer': '974654458'
    },
    'diagnose': {
        'hoveddiagnose': {
            'diagnose': 'TENDINITT INA',
            'diagnosekode': 'L87',
            'diagnosesystem': 'ICPC-2'
        },
        'bidiagnoser': [
            {
                'diagnose': 'GANGLION SENE',
                'diagnosekode': 'L87',
                'diagnosesystem': 'ICPC-2'
            }
        ],
    },
    'mulighetForArbeid': {
        'perioder': [
            {
                'fom': '2020-04-01',
                'tom': '2020-04-24',
                'reisetilskudd': true,
            }
        ],
        'aktivitetIkkeMulig433': [
            'Annet'
        ],
    },
    'bekreftelse': {
        'sykmelder': 'Frida Perma Frost',
    }
}

export const sykmeldinger: Sykmelding[] = [
    mockSykmelding,
]
