import BannerTekster from '../components/diverse/banner/banner-tekster'
import KlikkbarTekster from '../components/diverse/klikkbar-tekster'
import DragAndDropTekster from '../components/filopplaster/drag-and-drop/drag-and-drop-tekster'
import FilListeTekster from '../components/filopplaster/fil-liste-tekster'
import KvitteringModalTekster from '../components/filopplaster/kvittering-modal/kvittering-modal-tekster'
import HovedpunkterTekster from '../components/oppsummering/hovedpunkter/hovedpunkter-tekster'
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster'
import OppsummeringSideTekster from '../components/oppsummering/soknad-info-utvid/soknad-info-utvid-tekster'
import SideNavTekster from '../components/side-nav/side-nav-tekster'
import OpplastingTekster from '../components/sporsmal/opplasting/opplasting-tekster'
import SporsmalTekster from '../components/sporsmal/sporsmal-tekster'
import SykmeldingTekster from '../components/sykmelding/sykmelding-tekster'
import OmReisetilskuddTekster from '../components/teasere/om-reisetilskudd/om-reisetilskudd-tekster'
import TotalBelopTekster from '../components/total-belop/total-belop-tekster'
import BekreftTekster from '../pages/bekreftelse/bekreft-tekster'
import TilskuddListeTekster from '../pages/tilskuddliste/tilskuddliste-tekster'
import TilskuddSideTekster from '../pages/tilskuddside/tilskuddside-tekster'
import TilskuddStartTekster from '../pages/tilskuddstart/tilskuddstart-tekster'
import { logger } from './logger'

const tekster = {
    ...BannerTekster.nb,
    ...TilskuddListeTekster.nb,
    ...TilskuddStartTekster.nb,
    ...TilskuddSideTekster.nb,
    ...SideNavTekster.nb,
    ...KlikkbarTekster.nb,
    ...DragAndDropTekster.nb,
    ...FilListeTekster.nb,
    ...KvitteringModalTekster.nb,
    ...TotalBelopTekster.nb,
    ...OmReisetilskuddTekster.nb,
    ...OppsummeringTekster.nb,
    ...SykmeldingTekster.nb,
    ...BekreftTekster.nb,
    ...OpplastingTekster.nb,
    ...OppsummeringSideTekster.nb,
    ...SporsmalTekster.nb,
    ...HovedpunkterTekster.nb,
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
