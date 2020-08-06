import { ReisetilskuddInterface } from '../../models/reisetilskudd';

const mockReisetilskudd : ReisetilskuddInterface[] = [
  {
    fnr: '01010112345',
    fom: '2020-08-03',
    tom: '2020-08-03',

    orgNavn: 'Mock Arbeid AS',
    orgNummer: '123123123',

    utbetalingTilArbeidsgiver: false,

    går: true,
    sykler: true,
    kollektivtransport: 42,
    egenBil: 0,

    reisetilskuddId: '28fa10b8-c9af-4a7a-a0b2-90caed65ab4c',
    sykmeldingId: '72ea12dd-eabc-49ed-910f-5ecd50e7dd5c',

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
    sykmeldingId: '72ea1sdd-eabc-49ed-910f-5ecd50e7dd5c',

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
    sykmeldingId: '72ea1sdd-eabc-910f-5ecd50e7dd5c',

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
    sykmeldingId: '72ea1sdd-eabc-910f-5ecd50e7dd5c',
  },
];

export default mockReisetilskudd;
