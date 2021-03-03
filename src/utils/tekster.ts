import BannerTekster from '../components/diverse/banner/banner-tekster'
import DragAndDropTekster from '../components/filopplaster/drag-and-drop/drag-and-drop-tekster'
import FilListeTekster from '../components/filopplaster/fil-liste-tekster'
import KvitteringModalTekster from '../components/filopplaster/kvittering-modal/kvittering-modal-tekster'
import HovedpunkterTekster from '../components/oppsummering/hovedpunkter/hovedpunkter-tekster'
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster'
import OppsummeringSideTekster from '../components/oppsummering/soknad-info-utvid/soknad-info-utvid-tekster'
import SideNavTekster from '../components/side-nav/side-nav-tekster'
import KvitteringTekster from '../components/sporsmal/kvittering/kvittering-tekster'
import SporsmalTekster from '../components/sporsmal/sporsmal-tekster'
import SykmeldingTekster from '../components/sykmelding/sykmelding-tekster'
import OmReisetilskuddTekster from '../components/teasere/om-reisetilskudd/om-reisetilskudd-tekster'
import BekreftTekster from '../pages/bekreftelse/bekreft-tekster'
import TilskuddListeTekster from '../pages/tilskuddliste/tilskuddliste-tekster'
import TilskuddSideTekster from '../pages/tilskuddside/tilskuddside-tekster'
import TilskuddStartTekster from '../components/tilskuddstart/tilskuddstart-tekster'
import AvbrytKnappTekster from '../components/avbryt/avbryt-knapp-tekster'
import AvbruttSideTekster from '../pages/avbrutt/avbrutt-side-tekster'

import { logger } from './logger'

const UkjenteBrukteTekstKeysSomMaFikses = {
    'utbetaling.feil-alternativ': 'utbetaling.feil-alternativ TODO',
    'klikkbar.videre-knapp.tekst': 'klikkbar.videre-knapp.tekst TODO',
}

const tekster = {
    ...BannerTekster,
    ...TilskuddListeTekster,
    ...TilskuddStartTekster,
    ...TilskuddSideTekster,
    ...SideNavTekster,
    ...DragAndDropTekster,
    ...FilListeTekster,
    ...KvitteringModalTekster,
    ...OmReisetilskuddTekster,
    ...OppsummeringTekster,
    ...SykmeldingTekster,
    ...BekreftTekster,
    ...KvitteringTekster,
    ...OppsummeringSideTekster,
    ...SporsmalTekster,
    ...HovedpunkterTekster,
    ...AvbrytKnappTekster,
    ...AvbruttSideTekster,
    ...UkjenteBrukteTekstKeysSomMaFikses,
}
type TekstKeys =
    keyof typeof BannerTekster
    | keyof typeof TilskuddListeTekster
    | keyof typeof TilskuddStartTekster
    | keyof typeof TilskuddSideTekster
    | keyof typeof SideNavTekster
    | keyof typeof DragAndDropTekster
    | keyof typeof FilListeTekster
    | keyof typeof KvitteringModalTekster
    | keyof typeof OmReisetilskuddTekster
    | keyof typeof OppsummeringTekster
    | keyof typeof SykmeldingTekster
    | keyof typeof BekreftTekster
    | keyof typeof KvitteringTekster
    | keyof typeof OppsummeringSideTekster
    | keyof typeof SporsmalTekster
    | keyof typeof HovedpunkterTekster
    | keyof typeof AvbrytKnappTekster
    | keyof typeof AvbruttSideTekster
    | keyof typeof UkjenteBrukteTekstKeysSomMaFikses;


export const tekst = (tekst: TekstKeys): string => {
    const verdi = tekster[tekst]
    // Generiskfeilmelding har ingen tekst
    if (!verdi === undefined && !tekst.toString().includes('soknad.feilmelding')) {
        logger.error(`Mangler teksten [ ${tekst.toString()} ]`)
        return undefined as any
    }
    if (verdi === undefined) {
        return tekst.toString()
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
