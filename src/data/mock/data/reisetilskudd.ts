const reisetilskudd = [
    {
        id: '845d54c8-57b1-4e0f-99b4-c67fdc2e38bb',
        status: 'SENDBAR',
        sykmeldingId: '83377300-d59e-4bca-a070-c99e102d8dca',
        fnr: '12345678901',
        fom: '2021-02-05',
        tom: '2021-02-09',
        sendt: null,
        avbrutt: null,
        arbeidsgiverOrgnummer: null,
        arbeidsgiverNavn: null,
        sporsmal: [
            {
                id: 'd80ba0e1-e3ce-496b-ad31-fde219eb5554',
                tag: 'ANSVARSERKLARING',
                overskrift: 'Vi stoler på deg',
                sporsmalstekst: 'Jeg bekrefter at jeg vil gi riktige og fullstendige opplysninger.',
                undertekst: 'Jeg vet at jeg kan miste retten til sykepenger hvis jeg ikke har gitt riktige opplysninger. Jeg vet også at jeg må betale tilbake hvis jeg har gitt feil opplysninger eller latt være å informere.',
                svartype: 'CHECKBOX_PANEL',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: []
            },
            {
                id: 'a14b1a2e-aa78-47fc-9e3d-c74ea6913cc8',
                tag: 'TRANSPORT_TIL_DAGLIG',
                overskrift: 'Transport til daglig',
                sporsmalstekst: 'Bruker du vanligvis bil eller offentlig transport til og fra arbeidsplassen?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '0e515737-74a1-4ead-849f-5568dce16f46',
                        tag: 'TYPE_TRANSPORT',
                        overskrift: null,
                        sporsmalstekst: 'Hva slags type transport bruker du?',
                        undertekst: null,
                        svartype: 'CHECKBOX_GRUPPE',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [
                            {
                                id: '085a6156-8371-4722-a6c5-cc4fabb2b898',
                                tag: 'OFFENTLIG_TRANSPORT_TIL_DAGLIG',
                                overskrift: null,
                                sporsmalstekst: 'Offentlig transport',
                                undertekst: null,
                                svartype: 'CHECKBOX',
                                min: null,
                                max: null,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [],
                                undersporsmal: [
                                    {
                                        id: '46a7a94e-3838-45bf-b156-caa269c2fddd',
                                        tag: 'OFFENTLIG_TRANSPORT_BELOP',
                                        overskrift: null,
                                        sporsmalstekst: 'Hvor mye betaler du vanligvis i måneden for offentlig transport?',
                                        undertekst: null,
                                        svartype: 'BELOP',
                                        min: null,
                                        max: null,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: []
                                    }
                                ]
                            },
                            {
                                id: '1cbf683e-ea11-4915-af99-b279a3b6b297',
                                tag: 'BIL_TIL_DAGLIG',
                                overskrift: null,
                                sporsmalstekst: 'Bil',
                                undertekst: null,
                                svartype: 'CHECKBOX',
                                min: null,
                                max: null,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [],
                                undersporsmal: [
                                    {
                                        id: 'a04beb56-b333-4b52-913d-ff9ab71596c5',
                                        tag: 'KM_HJEM_JOBB',
                                        overskrift: null,
                                        sporsmalstekst: 'Hvor mange km er reisen med bil hjemmefra til jobb?',
                                        undertekst: null,
                                        svartype: 'KILOMETER',
                                        min: null,
                                        max: null,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'cf325de6-e701-4567-9cd0-0d32807a4f70',
                tag: 'REISE_MED_BIL',
                overskrift: 'Reise med bil',
                sporsmalstekst: 'Reiser du med bil til og fra jobben mellom 5. - 9. februar 2021?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: 'f6eda3fd-eb7a-47fc-aca6-99d667a698f7',
                        tag: 'BIL_DATOER',
                        overskrift: null,
                        sporsmalstekst: 'Hvilke dager reiste du med bil',
                        undertekst: null,
                        svartype: 'DATOER',
                        min: '2021-01-15',
                        max: '2021-02-09',
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: []
                    }
                ]
            },
            {
                id: '8a703e9e-2f19-477b-8ac1-b41158654f9a',
                tag: 'KVITTERINGER',
                overskrift: 'Kvitteringer',
                sporsmalstekst: 'Last opp kvitteringer for reiser til og fra jobben mellom 5. - 9. februar 2021.',
                undertekst: null,
                svartype: 'KVITTERING',
                min: '2021-02-05',
                max: '2021-02-09',
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: []
            },
            {
                id: '94fe5d6e-5b01-431e-af95-89528d09d985',
                tag: 'UTBETALING',
                overskrift: 'Utbetaling',
                sporsmalstekst: 'Legger arbeidsgiveren din ut for reisene?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: []
            }
        ]
    }
]

export default reisetilskudd
