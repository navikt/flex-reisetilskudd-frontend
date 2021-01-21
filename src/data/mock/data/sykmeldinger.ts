import { Sykmelding } from '../../../types/sykmelding'

export const mockSykmelding = new Sykmelding({
    'id': '3e3352a1-2b99-4cd6-8268-415842955d83',
    'mottattTidspunkt': '2020-12-31T22:00:00Z',
    'behandlingsutfall': {
        'status': 'MANUAL_PROCESSING',
        'ruleHits': []
    },
    'legekontorOrgnummer': '223456789',
    'arbeidsgiver': {
        'navn': 'LOMMEN BARNEHAVE',
        'stillingsprosent': 100
    },
    'sykmeldingsperioder': [
        {
            'fom': '2021-01-01',
            'tom': '2021-01-07',
            'gradert': null,
            'behandlingsdager': null,
            'innspillTilArbeidsgiver': null,
            'type': 'REISETILSKUDD',
            'aktivitetIkkeMulig': null,
            'reisetilskudd': true
        }
    ],
    'sykmeldingStatus': {
        'statusEvent': 'SENDT',
        'timestamp': '2021-01-08T10:58:12.001722Z',
        'arbeidsgiver': {
            'orgnummer': '974654458',
            'juridiskOrgnummer': '984661185',
            'orgNavn': 'POSTEN NORGE AS, BÆRUM'
        },
        'sporsmalOgSvarListe': [
            {
                'tekst': 'Jeg er sykmeldt fra',
                'shortName': 'ARBEIDSSITUASJON',
                'svar': {
                    'svarType': 'ARBEIDSSITUASJON',
                    'svar': 'ARBEIDSTAKER'
                }
            }
        ]
    },
    'medisinskVurdering': {
        'hovedDiagnose': {
            'kode': 'L87',
            'system': 'ICPC-2',
            'tekst': 'TENDINITT INA'
        },
        'biDiagnoser': [
            {
                'kode': 'L87',
                'system': 'ICPC-2',
                'tekst': 'GANGLION SENE'
            }
        ],
        'annenFraversArsak': null,
        'svangerskap': false,
        'yrkesskade': false,
        'yrkesskadeDato': '2021-01-01'
    },
    'skjermesForPasient': false,
    'prognose': {
        'arbeidsforEtterPeriode': true,
        'hensynArbeidsplassen': 'Må ta det pent',
        'erIArbeid': {
            'egetArbeidPaSikt': true,
            'annetArbeidPaSikt': true,
            'arbeidFOM': '2021-01-01',
            'vurderingsdato': '2021-01-01'
        },
        'erIkkeIArbeid': null
    },
    'utdypendeOpplysninger': {
        '6.2': {
            '6.2.1': {
                'sporsmal': 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.',
                'svar': 'Langvarig korsryggsmerter. Ømhet og smerte',
                'restriksjoner': [
                    'SKJERMET_FOR_ARBEIDSGIVER'
                ]
            },
            '6.2.2': {
                'sporsmal': 'Hvordan påvirker sykdommen arbeidsevnen',
                'svar': 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: ecea8286-40f7-48a3-9583-a173bf03aad9',
                'restriksjoner': [
                    'SKJERMET_FOR_ARBEIDSGIVER'
                ]
            },
            '6.2.3': {
                'sporsmal': 'Har behandlingen frem til nå bedret arbeidsevnen?',
                'svar': 'Nei',
                'restriksjoner': [
                    'SKJERMET_FOR_ARBEIDSGIVER'
                ]
            },
            '6.2.4': {
                'sporsmal': 'Beskriv Pågående og planlagt henvisning, utredning og/eller behandling',
                'svar': 'Henvist til fysio',
                'restriksjoner': [
                    'SKJERMET_FOR_ARBEIDSGIVER'
                ]
            }
        }
    },
    'tiltakArbeidsplassen': 'Fortsett som sist.',
    'tiltakNAV': 'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
    'andreTiltak': null,
    'meldingTilNAV': null,
    'meldingTilArbeidsgiver': null,
    'kontaktMedPasient': {
        'kontaktDato': null,
        'begrunnelseIkkeKontakt': null
    },
    'behandletTidspunkt': '2020-12-31T23:00:00Z',
    'behandler': {
        'fornavn': 'Frida',
        'mellomnavn': 'Perma',
        'etternavn': 'Frost',
        'aktoerId': '1804968790639',
        'fnr': '01117302624',
        'hpr': null,
        'her': null,
        'adresse': {
            'gate': 'Kirkegårdsveien 3',
            'postnummer': 1348,
            'kommune': 'Rykkinn',
            'postboks': null,
            'land': 'Country'
        },
        'tlf': 'tel:94431152'
    },
    'syketilfelleStartDato': '2021-01-01',
    'navnFastlege': 'Victor Frankenstein',
    'egenmeldt': false,
    'papirsykmelding': false,
    'harRedusertArbeidsgiverperiode': false,
    'merknader': null
})

export const sykmeldinger: Sykmelding[] = [
    mockSykmelding,
]
