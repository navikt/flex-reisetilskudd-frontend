import './transport.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import VidereKnapp from '../../components/klikkbar/videre-knapp'
import CheckboxSvar from '../../components/sporsmal-svar/checkbox-svar/checkbox-svar'
import InputSporsmal from '../../components/sporsmal-svar/input-sporsmal/input-sporsmal'
import {
    antallKilometerSpørsmål,
    månedligeUtgifterSpørsmål,
    transportalternativer,
    transportalternativerKollektivt,
} from '../../components/sporsmal-svar/sporsmal-konstanter'
import Vis from '../../components/vis'
import { put } from '../../data/fetcher/fetcher'
import { useAppStore } from '../../data/stores/app-store'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { gåTilNesteSide } from '../../utils/navigasjon'
import { validerKroner, validerNumerisk } from '../../utils/skjemavalidering'
import { tekst } from '../../utils/tekster'

interface TransportmiddelInterface {
    id: string;
    går?: boolean;
    sykler?: boolean;
    egenBil?: number;
    kollektivtransport?: number;
}

const Transport = () => {

    const {
        dagensTransportMiddelEgenBilChecked,
        dagensTransportMiddelSyklerChecked,
        dagensTransportMiddelGårChecked,
        dagensTransportMiddelKollektivChecked,
        månedligeUtgifterState, setMånedligeUtgifterState,
        antallKilometerState, setAntallKilometerState,
        dagensTransportmiddelValidert, setDagensTransportmiddelValidert,
    } = useAppStore()

    const [ visningsFeilmeldinger, setVisningsFeilmeldinger ] = useState<FeiloppsummeringFeil[]>([])
    const [ skalViseFeil, setSkalViseFeil ] = useState<boolean>(false)
    const [ skalViseKilometerFeil, setSkalViseKilometerFeil ] = useState<boolean>(false)
    const [ skalViseMånedligeUtgifterFeil, setSkalViseMånedligeUtgifterFeil ] = useState<boolean>(false)

    const { stegnr, id } = useParams<RouteParams>()
    const soknadssideIDTall = Number(stegnr)

    const history = useHistory()

    const validerAntallKilometerInput = (): FeiloppsummeringFeil[] => {
        if (dagensTransportMiddelEgenBilChecked) {
            if (!validerNumerisk(antallKilometerState)) {
                return [ {
                    skjemaelementId: antallKilometerSpørsmål.id,
                    feilmelding: tekst('transportmiddel.feil-kilometer'),
                } ]
            }
        }
        /* Gyldig verdi skrevet inn,
        * skal ikke validere dette feltet igjen før brukeren trykker for å gå videre:
        */
        setSkalViseKilometerFeil(false)
        return []
    }

    const validerMånedligeUtgifter = (nyesteVerdi: string | null = null): FeiloppsummeringFeil[] => {
        if (dagensTransportMiddelKollektivChecked
            && !validerKroner(nyesteVerdi || månedligeUtgifterState)
        ) {
            return [ { skjemaelementId: månedligeUtgifterSpørsmål.id, feilmelding: 'Du må oppgi gyldig kroneverdi' } ]
        }
        /* Gyldig verdi skrevet inn,
        * skal ikke validere dette feltet igjen før brukeren trykker for å gå videre:
        */
        setSkalViseMånedligeUtgifterFeil(false)
        return []
    }

    const validerCheckboxer = (): FeiloppsummeringFeil[] => {
        if (
            !dagensTransportMiddelEgenBilChecked
            && !dagensTransportMiddelSyklerChecked
            && !dagensTransportMiddelGårChecked
            && !dagensTransportMiddelKollektivChecked
        ) {
            return [
                {
                    skjemaelementId: transportalternativer.svaralternativer[0].id,
                    feilmelding: tekst('transportmiddel.minst-et'),
                },
            ]
        }
        return []
    }

    const handleKilometerChange = (nyInput: string) => {
        setAntallKilometerState(nyInput)
    }

    const handleMånedligeUtgifterChange = (nyInput: string) => {
        setMånedligeUtgifterState(nyInput)
    }

    const fåFeilmeldingTilInput = (
        hvilkenInput: string,
    ): string | undefined => visningsFeilmeldinger.find(
        (element) => element.skjemaelementId === hvilkenInput,
    )?.feilmelding

    useEffect(() => {
        const valideringsFeil: FeiloppsummeringFeil[] = []
        const checkBoxFeil = validerCheckboxer()
        const kilometerFeil = validerAntallKilometerInput()
        const månedligeUtgifterFeil = validerMånedligeUtgifter()

        valideringsFeil.push(...checkBoxFeil)
        valideringsFeil.push(...kilometerFeil)
        valideringsFeil.push(...månedligeUtgifterFeil)

        if (skalViseFeil) {
            const visningsFeil: FeiloppsummeringFeil[] = []
            visningsFeil.push(...checkBoxFeil)

            if (skalViseKilometerFeil) {
                visningsFeil.push(...kilometerFeil)
            }
            if (skalViseMånedligeUtgifterFeil) {
                visningsFeil.push(...månedligeUtgifterFeil)
            }

            setVisningsFeilmeldinger(visningsFeil)
        }

        if (valideringsFeil.length < 1) {
            setDagensTransportmiddelValidert(true)
            setSkalViseFeil(false)
        } else {
            setDagensTransportmiddelValidert(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        skalViseFeil,
        skalViseKilometerFeil,
        skalViseMånedligeUtgifterFeil,
        dagensTransportMiddelEgenBilChecked,
        dagensTransportMiddelSyklerChecked,
        dagensTransportMiddelGårChecked,
        dagensTransportMiddelKollektivChecked,
        månedligeUtgifterState,
        antallKilometerState,
    ])

    useEffect(() => {
        // Skal ikke vise feilmelding for et felt som nettopp er åpnet
        setSkalViseKilometerFeil(false)
    }, [
        dagensTransportMiddelEgenBilChecked,
    ])

    useEffect(() => {
        // Skal ikke vise feilmelding for et felt som nettopp er åpnet
        setSkalViseMånedligeUtgifterFeil(false)
    }, [
        dagensTransportMiddelKollektivChecked,
    ])

    const handleVidereKlikk = () => {
        put<TransportmiddelInterface>(`${env.apiUrl}/api/v1/reisetilskudd/${id}`, {
            reisetilskuddId: id,
            går: dagensTransportMiddelGårChecked,
            sykler: dagensTransportMiddelSyklerChecked,
            egenBil: parseFloat(antallKilometerState),
            kollektivtransport: parseFloat(månedligeUtgifterState),
        }).then(() => {
            setSkalViseMånedligeUtgifterFeil(true)
            setSkalViseKilometerFeil(true)
            setSkalViseFeil(true)
            if (dagensTransportmiddelValidert) {
                gåTilNesteSide(history, soknadssideIDTall)
            }
        }).catch((error) => {
            logger.error('Feil ved oppdatering av skjema', error)
        })
    }

    return (
        <div className="dagens-transportmiddel">
            <Systemtittel>
                {tekst('transportmiddel.daglig')}
            </Systemtittel>
            <div className="transportmiddel-tekst">
                <Normaltekst className="transportmiddel-spørsmål"
                    id="transportmiddel-spørsmål"
                    aria-describedby="min-hjelpetekst-kollektivtransport"
                >
                    {tekst('transportmiddel.hvilke')}
                </Normaltekst>
                <Hjelpetekst className="kollektivtransport-hjelpetekst"
                    id="min-hjelpetekst-kollektivtransport"
                    aria-describedby="transportmiddel-spørsmål"
                >
                    {tekst('transportmiddel.hjelpetekst')}
                </Hjelpetekst>
            </div>

            {CheckboxSvar(transportalternativer)}

            <Vis hvis={dagensTransportMiddelEgenBilChecked === true}>
                {InputSporsmal({
                    ...{
                        onChange: handleKilometerChange,
                        value: antallKilometerState,
                        feil: fåFeilmeldingTilInput(antallKilometerSpørsmål.id),
                    },
                    ...antallKilometerSpørsmål,
                },
                )}
            </Vis>
            <div className="transportalternativerKollektivt">
                {CheckboxSvar(transportalternativerKollektivt)}
                <Vis hvis={dagensTransportMiddelKollektivChecked === true}>
                    {InputSporsmal({
                        ...{
                            onChange: handleMånedligeUtgifterChange,
                            value: månedligeUtgifterState,
                            feil: fåFeilmeldingTilInput(månedligeUtgifterSpørsmål.id),
                        },
                        ...månedligeUtgifterSpørsmål,
                    },
                    )}
                </Vis>
            </div>

            <Vis hvis={skalViseFeil && visningsFeilmeldinger.length > 0}>
                <Feiloppsummering tittel={tekst('transportmiddel.feiloppsummering')} feil={visningsFeilmeldinger} />
            </Vis>

            <VidereKnapp aktivtSteg={soknadssideIDTall} onClick={handleVidereKlikk} />
        </div>
    )
}

export default Transport
