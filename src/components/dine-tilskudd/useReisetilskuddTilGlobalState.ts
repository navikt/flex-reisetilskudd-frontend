import { useAppStore } from '../../data/stores/app-store'
import { Reisetilskudd } from '../../types'
import { validerTall } from '../../utils/skjemavalidering'
import { utbetalingSpørsmålVerdier } from '../sporsmal-svar/sporsmal-konstanter'

const useReisetilskuddTilGlobalState = (): (reisetilskudd: Reisetilskudd) => void => {
    const {
        setActiveMegArbeidsgiver,
        setDagensTransportMiddelGårChecked,
        setDagensTransportMiddelSyklerChecked,
        setDagensTransportMiddelEgenBilChecked,
        setDagensTransportMiddelKollektivChecked,
        setMånedligeUtgifterState,
        setAntallKilometerState,
        setAktivtReisetilskuddId,
        setKvitteringer,
    } = useAppStore()

    return (valgtReisetilskudd: Reisetilskudd) => {
        setAktivtReisetilskuddId(valgtReisetilskudd.reisetilskuddId)

        if (valgtReisetilskudd.utbetalingTilArbeidsgiver === true) {
            setActiveMegArbeidsgiver(utbetalingSpørsmålVerdier.ARBEIDSGIVER)
        } else if (valgtReisetilskudd.utbetalingTilArbeidsgiver === false) {
            setActiveMegArbeidsgiver(utbetalingSpørsmålVerdier.MEG)
        } else if (valgtReisetilskudd.utbetalingTilArbeidsgiver === undefined) {
            setActiveMegArbeidsgiver('')
        }

        if (valgtReisetilskudd.går) {
            setDagensTransportMiddelGårChecked(valgtReisetilskudd.går)
        } else {
            setDagensTransportMiddelGårChecked(false)
        }

        if (valgtReisetilskudd.sykler) {
            setDagensTransportMiddelSyklerChecked(valgtReisetilskudd.sykler)
        } else {
            setDagensTransportMiddelSyklerChecked(false)
        }

        if (valgtReisetilskudd.egenBil && validerTall(valgtReisetilskudd.egenBil)) {
            setDagensTransportMiddelEgenBilChecked(true)
            setAntallKilometerState(valgtReisetilskudd.egenBil.toString())
        } else {
            setDagensTransportMiddelEgenBilChecked(false)
            setAntallKilometerState('')
        }

        if (valgtReisetilskudd.kollektivtransport && validerTall(valgtReisetilskudd.kollektivtransport)) {
            setMånedligeUtgifterState(valgtReisetilskudd.kollektivtransport.toString())
            setDagensTransportMiddelKollektivChecked(true)
        } else {
            setDagensTransportMiddelKollektivChecked(false)
            setMånedligeUtgifterState('')
        }

        if (valgtReisetilskudd.kvitteringer !== undefined) {
            setKvitteringer(valgtReisetilskudd.kvitteringer)
        }
    }
}

export default useReisetilskuddTilGlobalState
