import './radio-sporsmal.less'

import { Feiloppsummering, FeiloppsummeringFeil, RadioPanelGruppe } from 'nav-frontend-skjema'
import { Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import VidereKnapp from '../../components/klikkbar/videre-knapp'
import { utbetalingSpørsmål, utbetalingSpørsmålVerdier } from '../../components/sporsmal-svar/sporsmal-konstanter'
import Vis from '../../components/vis'
import { put } from '../../data/fetcher/fetcher'
import { useAppStore } from '../../data/stores/app-store'
import { ArbeidsgiverInterface } from '../../types/arbeidsgiver'
import { Svaralternativ } from '../../types/sporsmal'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { gåTilNesteSide } from '../../utils/navigasjon'
import { tekst } from '../../utils/tekster'
import { arbeidsgiverNavnPlaceHolder, arbeidsgiverOrgNrPlaceHolder } from './constants'

interface UtbetalingInterface {
    reisetilskuddId: string
    utbetalingTilArbeidsgiver?: boolean
}

const UtbetalingSide = () => {
    const { activeMegArbeidsgiver, setActiveMegArbeidsgiver } = useAppStore()
    const [ utbetalingspørsmålValidert, setUtbetalingspørsmålValidert ] = useState<boolean>()
    const [ visningsfeilmeldinger, setVisningsfeilmeldinger ] = useState<FeiloppsummeringFeil[]>([])
    const [ skalViseFeil, setSkalViseFeil ] = useState<boolean>(false)

    const { soknadssideID, reisetilskuddID } = useParams<RouteParams>()
    const soknadssideIDTall = Number(soknadssideID)
    const getArbeidsgiver = (): ArbeidsgiverInterface => ({
        navn: 'Arbeids- og velferdsetaten',
        orgNr: '392392482849',
    })

    const history = useHistory()

    const leggInnArbeidsGiverIString = (tekstStreng: string) => tekstStreng.replace(
        arbeidsgiverNavnPlaceHolder, getArbeidsgiver().navn,
    ).replace(
        arbeidsgiverOrgNrPlaceHolder, getArbeidsgiver().orgNr,
    )

    const byttUtSpørsmålsTekster = (svaralternativer: Svaralternativ[]): Svaralternativ[] => (
        [ ...svaralternativer ].map((svaralternativ: Svaralternativ) => (
            { ...svaralternativ, label: leggInnArbeidsGiverIString(svaralternativ.label) }
        )))

    const validerUtbetaling = (): FeiloppsummeringFeil[] => {
        if (activeMegArbeidsgiver === '') {
            return [
                {
                    skjemaelementId: utbetalingSpørsmål.svaralternativer[0].id,
                    feilmelding: tekst('utbetaling.feil-alternativ'),
                },
            ]
        }
        return []
    }

    useEffect(() => {
        const valideringsfeil: FeiloppsummeringFeil[] = []
        const utbetalingFeil = validerUtbetaling()

        valideringsfeil.push(...utbetalingFeil)
        setVisningsfeilmeldinger(valideringsfeil)

        if (valideringsfeil.length < 1) {
            setUtbetalingspørsmålValidert(true)
        } else {
            setUtbetalingspørsmålValidert(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ activeMegArbeidsgiver, skalViseFeil ])

    const handleVidereKlikk = () => {
        if (utbetalingspørsmålValidert) {
            put<UtbetalingInterface>(`${env.apiUrl}/api/v1/reisetilskudd/${reisetilskuddID}`, {
                reisetilskuddId: reisetilskuddID,
                utbetalingTilArbeidsgiver: activeMegArbeidsgiver === utbetalingSpørsmålVerdier.ARBEIDSGIVER,
            }).then(() => {
                gåTilNesteSide(history, soknadssideIDTall)
            }).catch((error) => {
                logger.error('Feil ved oppdatering av skjema', error)
            })
        } else {
            setSkalViseFeil(true)
        }
    }

    const skrivEndringTilGlobalState = (nyValgt: string) => {
        if (name === utbetalingSpørsmålVerdier.NAME) {
            setActiveMegArbeidsgiver(nyValgt)
        }
    }

    return (
        <form className="horisontal-radio" onSubmit={e => e.preventDefault()}>
            <Systemtittel className="utbetaling-tittel">
                {utbetalingSpørsmål.tittel}
            </Systemtittel>
            <RadioPanelGruppe
                name={utbetalingSpørsmål.name}
                description={leggInnArbeidsGiverIString(utbetalingSpørsmål.spørsmålstekst)}
                radios={byttUtSpørsmålsTekster(utbetalingSpørsmål.svaralternativer)}
                checked={activeMegArbeidsgiver}
                onChange={(_, nyVerdi) => {
                    skrivEndringTilGlobalState(nyVerdi)
                }}
            />
            <Vis hvis={skalViseFeil && visningsfeilmeldinger.length > 0}>
                <Feiloppsummering tittel={tekst('utbetaling.videre')} feil={visningsfeilmeldinger} />
            </Vis>
            <VidereKnapp aktivtSteg={soknadssideIDTall} onClick={handleVidereKlikk} />
        </form>
    )
}

export default UtbetalingSide
