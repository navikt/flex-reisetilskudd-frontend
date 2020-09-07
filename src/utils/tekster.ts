import DineReisetilskuddTekster from '../components/dine-reisetilskudd/dine-reisetilskudd-tekster'
import DragAndDropTekster from '../components/filopplaster/drag-and-drop/drag-and-drop-tekster'
import FilMedInfoTekster from '../components/filopplaster/fil-med-info/fil-med-info-tekster'
import FilTekster from '../components/filopplaster/fil/fil-tekster'
import FilopplasterModal from '../components/filopplaster/filopplaster-modal/filopplaster-modal-tekster'
import KlikkbarTekster from '../components/klikkbar/klikkbar-tekster'
import TotalBelopTekster from '../components/kvittering/total-belop/total-belop-tekster'
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster'
import SporsmalTekster from '../components/sporsmal-svar/sporsmal-tekster'
import StegTekster from '../components/steg/steg-tekster'
import SykmeldingTekster from '../components/sykmelding-opplysninger/sykmelding-tekster'
import BekreftelsesTekster from '../pages/bekreftelses-side/bekreftelses-tekster'
import TransportmiddelTekster from '../pages/dagens-transportmiddel/transportmiddel-tekster'
import KvitteringsTekster from '../pages/kvitterings-opplasting/kvitterings-tekster'
import OppsummeringSideTekster from '../pages/oppsummering-side/oppsummering-tekster'
import ReisetilskuddListeTekster from '../pages/reisetilskudd-liste/reisetilskudd-liste-tekster'
import ReisetilskuddSideTekster from '../pages/reisetilskudd-side/reisetilskudd-side-tekster'
import UtbetalingTekster from '../pages/utbetaling-side/utbetaling-tekster'
import { logger } from './logger'

const tekster = {
    ...ReisetilskuddListeTekster.nb,
    ...ReisetilskuddSideTekster.nb,
    ...StegTekster.nb,
    ...KlikkbarTekster.nb,
    ...DineReisetilskuddTekster.nb,
    ...DragAndDropTekster.nb,
    ...FilTekster.nb,
    ...FilMedInfoTekster.nb,
    ...FilopplasterModal.nb,
    ...TotalBelopTekster.nb,
    ...OppsummeringTekster.nb,
    ...SykmeldingTekster.nb,
    ...BekreftelsesTekster.nb,
    ...TransportmiddelTekster.nb,
    ...KvitteringsTekster.nb,
    ...OppsummeringSideTekster.nb,
    ...UtbetalingTekster.nb,
    ...SporsmalTekster.nb,
}

export const tekst = (tekst: string): string => {
    const verdi = tekster[tekst]
    // Generiskfeilmelding har ingen tekst
    if (!verdi === undefined && !tekst.includes('soknad.feilmelding')) {
        // eslint-disable-next-line no-console
        console.log(`Mangler teksten [ ${tekst} ]`)
        logger.error(`Mangler teksten [ ${tekst} ]`)
        return undefined as any
    }
    if (verdi === undefined) {
        return tekst
    }
    return verdi
}

export const getLedetekst = (text: string, data: any): string => {
    if (text === undefined || data === undefined) {
        return ''
    }
    let newtext = text
    Object.keys(data).forEach((key) => {
        const regex = new RegExp(key, 'g')
        newtext = newtext.replace(regex, data[key])
    })
    return newtext
}
