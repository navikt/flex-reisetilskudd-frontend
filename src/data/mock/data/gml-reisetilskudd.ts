import mockKvitteringer from './kvitteringer'
import { mockSykmelding } from './sykmeldinger'

export const avbruttReisetilskudd = {
    fnr: '01010112345',
    fom: '2020-08-03',
    tom: '2020-08-13',
    status: 'AVBRUTT',
    avbrutt: '2020-11-03',

    orgNavn: 'Mock Arbeid AS',
    orgNummer: '123123123',
    utbetalingTilArbeidsgiver: false,

    går: false,
    sykler: false,
    kollektivtransport: 0,
    egenBil: 0,

    reisetilskuddId: '28fa10b8-c9af-4a7a-a0b2-90caed65ab4c',
    sykmeldingId: mockSykmelding.id,

    kvitteringer: [],
}

export const fremtidigReisetilskudd = {
    fnr: '01010112345',
    fom: '2029-05-13',
    tom: '2029-05-28',
    status: 'FREMTIDIG',

    orgNavn: 'Mock Vaskeri Vaskerelven',
    orgNummer: '9237419',
    utbetalingTilArbeidsgiver: true,

    går: true,
    sykler: false,
    kollektivtransport: 0,
    egenBil: 13,

    reisetilskuddId: '28fas0b8-c9af-4a7a-a0b2-90caed65ab4c',
    sykmeldingId: mockSykmelding.id,

    kvitteringer: [],
}

export const sendtReisetilskudd = {
    fnr: '01010112345',
    fom: '2020-05-13',
    tom: '2020-05-28',
    status: 'SENDT',
    sendt: '2020-11-03',

    orgNavn: 'Mock Vaskeri Vaskerelven',
    orgNummer: '9237419',
    utbetalingTilArbeidsgiver: true,

    går: true,
    sykler: false,
    kollektivtransport: 0,
    egenBil: 13,

    reisetilskuddId: '28fas0b8-c9af-4a7a-a0b2-90caed65ab4c',
    sykmeldingId: mockSykmelding.id,

    kvitteringer: mockKvitteringer,
}

export const sendbarReisetilskudd = {
    fnr: '01010112345',
    fom: '2020-05-13',
    tom: '2020-05-19',
    status: 'SENDBAR',

    orgNavn: 'Mock Med undefined verdi på utbetalingTilArbeidsgiver',
    orgNummer: '9237419',
    utbetalingTilArbeidsgiver: undefined,

    går: false,
    sykler: false,
    kollektivtransport: 0,
    egenBil: 0,

    reisetilskuddId: '28fas0b8-c9af-4a7a-a0b2-029j3fj26',
    sykmeldingId: mockSykmelding.id,

    kvitteringer: [],
}

export const åpenReisetilskudd = {
    fnr: '01010112345',
    fom: '2022-05-13',
    tom: '2022-05-31',
    status: 'ÅPEN',

    orgNavn: 'Mock Med undefined verdi på utbetalingTilArbeidsgiver',
    orgNummer: '9237419',
    utbetalingTilArbeidsgiver: undefined,

    går: true,
    sykler: true,
    kollektivtransport: 0,
    egenBil: 0,

    reisetilskuddId: 'ijfj2f-c9af-4a7a-a0b2-a381c13',
    sykmeldingId: mockSykmelding.id,

    kvitteringer: [],
}

const mockReisetilskudd = [
    avbruttReisetilskudd,
    sendtReisetilskudd,
    sendbarReisetilskudd,
    åpenReisetilskudd,
    fremtidigReisetilskudd,
]

export default mockReisetilskudd
