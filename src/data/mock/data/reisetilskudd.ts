import { Reisetilskudd } from '../../../types/reisetilskudd'

const mockReisetilskudd : Reisetilskudd[] = [
    {
        fnr: '01010112345',
        fom: '2020-08-03',
        tom: '2020-08-03',

        orgNavn: 'Mock Arbeid AS',
        orgNummer: '123123123',

        utbetalingTilArbeidsgiver: false,

        går: false,
        sykler: false,
        kollektivtransport: 0,
        egenBil: 0,

        reisetilskuddId: '28fa10b8-c9af-4a7a-a0b2-90caed65ab4c',
        sykmeldingId: '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',

        kvitteringer: [],
    },
    {
        fnr: '01010112345',
        fom: '2020-05-13',
        orgNavn: 'Mock Vaskeri Vaskerelven',
        orgNummer: '9237419',

        utbetalingTilArbeidsgiver: true,

        går: true,
        sykler: false,
        kollektivtransport: 0,
        egenBil: 13,

        reisetilskuddId: '28fas0b8-c9af-4a7a-a0b2-90caed65ab4c',
        sykmeldingId: '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',

        kvitteringer: [],
    },
    {
        fnr: '01010112345',
        fom: '2020-05-13',
        orgNavn: 'Mock Med undefined verdi på utbetalingTilArbeidsgiver',
        orgNummer: '9237419',

        utbetalingTilArbeidsgiver: undefined,

        går: true,
        sykler: true,
        kollektivtransport: 2,
        egenBil: 1,

        reisetilskuddId: '1ajsdlkajlsdkjalksjdlkajd',
        sykmeldingId: '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',

        kvitteringer: [],
    },
    {
        fnr: '01010112345',
        fom: '2020-05-13',
        orgNavn: 'Mock Med undefined verdi på utbetalingTilArbeidsgiver',
        orgNummer: '9237419',

        utbetalingTilArbeidsgiver: undefined,

        går: true,
        sykler: true,
        kollektivtransport: 2,
        egenBil: 1,

        reisetilskuddId: '1ajsdlkajlsdkjalksjdlkajd',
        sykmeldingId: '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',

        kvitteringer: [],
    },
]

export default mockReisetilskudd
