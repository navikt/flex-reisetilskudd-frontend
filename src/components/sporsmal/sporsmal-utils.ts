import { TagTyper } from '../../types/enums'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

export const erSisteSide = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1]
    const tag = sporsmal.tag
    return [ TagTyper.VAER_KLAR_OVER_AT, TagTyper.BEKREFT_OPPLYSNINGER ].indexOf(tag) > -1
}

export const hentNokkel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1]
    if (sporsmal === undefined) {
        return ''
    }
    const nokkel = fjernIndexFraTag(sporsmal.tag).toLowerCase()
    if (sidenummer === 1 && soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND) {
        return ''
    }
    return erSisteSide(soknad, sidenummer)
        ? 'sykepengesoknad.til-slutt.tittel'
        : `sykepengesoknad.${nokkel}.tittel`

}

export const pathUtenSteg = (pathname: string) => {
    const arr: string[] = pathname.split(SEPARATOR)
    arr.pop()
    return arr.join(SEPARATOR)
}

export const fjernIndexFraTag = (tag: TagTyper): TagTyper => {
    let stringtag: string = tag.toString()
    const separator = '_'
    const index = stringtag.lastIndexOf(separator)
    if (index === (stringtag.length - 2) || index === (stringtag.length - 1)) {
        stringtag = stringtag.slice(0, index)
    }
    return TagTyper[stringtag as keyof typeof TagTyper]
}

export const sporsmalIdListe = (sporsmal: Sporsmal[]) => {
    let svar: any = []
    sporsmal.forEach(spm => {
        svar.push(spm.id)
        const alleUndersporsmalId: any = sporsmalIdListe(spm.undersporsmal)
        svar = [ ...svar, ...alleUndersporsmalId ]
    })
    return svar
}

interface FeilmeldingProps {
    global: string;
    lokal: string;
}

export const hentFeilmelding = (sporsmal: Sporsmal): FeilmeldingProps => {
    const feilmelding: FeilmeldingProps = {
        global: tekst('soknad.feilmelding.' + sporsmal.tag),
        lokal: tekst('soknad.feilmelding.' + sporsmal.tag + '.lokal')
    }
    if (feilmelding.lokal === undefined) {
        feilmelding.lokal = hentGeneriskFeilmelding(sporsmal.svartype)!
    }
    return feilmelding
}

export const hentGeneriskFeilmelding = (svartype: RSSvartype) => {
    switch (svartype) {
        case RSSvartype.JA_NEI:
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_GRUPPE:
            return 'Du må velge et alternativ'
        default:
            return undefined
    }
}
