import BannerTekster from '../components/banner/banner-tekster'
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
import BekreftTekster from '../pages/bekreftelse/bekreft-tekster'
import OpplastingTekster from '../pages/opplasting/opplasting-tekster'
import OppsummeringSideTekster from '../pages/oppsummering/oppsummering-tekster'
import ReisetilskuddTekster from '../pages/reisetilskudd/tilskudd-tekster'
import Transport from '../pages/transport/transport-tekster'
import UtbetalingTekster from '../pages/utbetaling/utbetaling-tekster'
import { logger } from './logger'

const tekster = {
    ...BannerTekster.nb,
    ...ReisetilskuddTekster.nb,
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
    ...BekreftTekster.nb,
    ...Transport.nb,
    ...OpplastingTekster.nb,
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
