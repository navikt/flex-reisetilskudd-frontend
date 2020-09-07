import 'nav-frontend-skjema-style'

import { CheckboksPanelGruppe } from 'nav-frontend-skjema'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { CheckboxProps } from '../../../types/sporsmal'
import { transportalternativerVerdier } from '../sporsmal-konstanter'

const CheckboxSvar = ({ tittel, svaralternativer, id, }: CheckboxProps) => {
    const {
        dagensTransportMiddelEgenBilChecked, setDagensTransportMiddelEgenBilChecked,
        dagensTransportMiddelSyklerChecked, setDagensTransportMiddelSyklerChecked,
        dagensTransportMiddelGårChecked, setDagensTransportMiddelGårChecked,
        dagensTransportMiddelKollektivChecked, setDagensTransportMiddelKollektivChecked,
        setMånedligeUtgifterState,
        setAntallKilometerState,
    } = useAppStore()

    const skrivEndringTilGlobalState = (nyValgt: string) => {
        if (nyValgt === transportalternativerVerdier.EGEN_BIL) {
            setDagensTransportMiddelEgenBilChecked(!dagensTransportMiddelEgenBilChecked)
            setAntallKilometerState('')
        } else if (nyValgt === transportalternativerVerdier.SYKLER) {
            setDagensTransportMiddelSyklerChecked(!dagensTransportMiddelSyklerChecked)
        } else if (nyValgt === transportalternativerVerdier.GÅR) {
            setDagensTransportMiddelGårChecked(!dagensTransportMiddelGårChecked)
        } else if (nyValgt === transportalternativerVerdier.KOLLEKTIVTRANSPORT) {
            setDagensTransportMiddelKollektivChecked(!dagensTransportMiddelKollektivChecked)
            setMånedligeUtgifterState('')
        }
    }

    const erChecked = (alternativ: string) => {
        if (alternativ === transportalternativerVerdier.EGEN_BIL) {
            return dagensTransportMiddelEgenBilChecked
        }
        if (alternativ === transportalternativerVerdier.SYKLER) {
            return dagensTransportMiddelSyklerChecked
        }
        if (alternativ === transportalternativerVerdier.GÅR) {
            return dagensTransportMiddelGårChecked
        }
        if (alternativ === transportalternativerVerdier.KOLLEKTIVTRANSPORT) {
            return dagensTransportMiddelKollektivChecked
        }
        return false
    }

    const checkboxesProps = svaralternativer.map(
        (alternativ) => ({ ...alternativ, ...{ checked: erChecked(alternativ.value) } }),
    )

    return (
        <div id={id}>
            <CheckboksPanelGruppe
                legend={tittel}
                checkboxes={checkboxesProps}
                onChange={(_, nyVerdi) => {
                    skrivEndringTilGlobalState(nyVerdi)
                }}
            />
        </div>
    )
}

export default CheckboxSvar
