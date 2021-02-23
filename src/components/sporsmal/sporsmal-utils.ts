import { TagTyper } from '../../types/enums'
import { Sporsmal, Svartype } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'

export const pathUtenSteg = (pathname: string) => {
    const arr: string[] = pathname.split(SEPARATOR)
    arr.pop()
    return arr.join(SEPARATOR)
}

interface Pair {
    key: any,
    value: any
}

export const splittTagOgIndex = (tag: string): Pair => {
    let stringtag: string = tag
    let idx = undefined
    const startOfIndex = stringtag.lastIndexOf('_')
    if (startOfIndex === (stringtag.length - 2) || startOfIndex === (stringtag.length - 1)) {
        stringtag = tag.slice(0, startOfIndex)
        idx = tag.slice(startOfIndex + 1)
    }

    return {
        key: TagTyper[stringtag as keyof typeof TagTyper],
        value: idx ? parseInt(idx) : undefined
    } as Pair
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

export const hentGeneriskFeilmelding = (svartype: Svartype) => {
    switch (svartype) {
        case Svartype.JA_NEI:
        case Svartype.CHECKBOX:
        case Svartype.CHECKBOX_GRUPPE:
            return 'Du må velge et alternativ'
        default:
            return undefined
    }
}
