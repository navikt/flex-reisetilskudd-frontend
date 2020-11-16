import BannerTekster from '../components/diverse/banner/banner-tekster'
import KlikkbarTekster from '../components/diverse/klikkbar/klikkbar-tekster'
import DragAndDropTekster from '../components/filopplaster/drag-and-drop/drag-and-drop-tekster'
import FilMedInfoTekster from '../components/filopplaster/fil-med-info/fil-med-info-tekster'
import FilTekster from '../components/filopplaster/fil/fil-tekster'
import FilopplasterModal from '../components/filopplaster/filopplaster-modal/filopplaster-modal-tekster'
import TotalBelopTekster from '../components/kvittering/total-belop/total-belop-tekster'
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster'
import OpplastingTekster from '../components/sporsmal/opplasting/opplasting-tekster'
import SporsmalTekster from '../components/sporsmal/sporsmal-tekster'
import StegTekster from '../components/steg/steg-tekster'
import SykmeldingTekster from '../components/sykmelding/sykmelding-tekster'
import BekreftTekster from '../pages/bekreftelse/bekreft-tekster'
import OppsummeringSideTekster from '../pages/oppsummering/oppsummering-tekster'
import ReisetilskuddTekster from '../pages/reisetilskudd/tilskudd-tekster'
import { logger } from './logger'

const tekster = {
    ...BannerTekster.nb,
    ...ReisetilskuddTekster.nb,
    ...StegTekster.nb,
    ...KlikkbarTekster.nb,
    ...DragAndDropTekster.nb,
    ...FilTekster.nb,
    ...FilMedInfoTekster.nb,
    ...FilopplasterModal.nb,
    ...TotalBelopTekster.nb,
    ...OppsummeringTekster.nb,
    ...SykmeldingTekster.nb,
    ...BekreftTekster.nb,
    ...OpplastingTekster.nb,
    ...OppsummeringSideTekster.nb,
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
