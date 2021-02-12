import { SvarEnums } from '../../types/enums'
import { Sporsmal } from '../../types/types'
import { RSSvar } from '../../types/rs-types/rs-svar'

export const hentSvar = (sporsmal: Sporsmal): any => {
    const svarliste = sporsmal.svarliste
    const svar = svarliste.svar[0] as RSSvar

    if (sporsmal.svartype.toString().startsWith('RADIO_GRUPPE')) {
        const besvartSporsmal = sporsmal.undersporsmal.find((spm: Sporsmal) => {
            const svr = spm.svarliste.svar[0] as RSSvar
            return svr && svr.verdi === SvarEnums.CHECKED
        })
        return besvartSporsmal ? besvartSporsmal.sporsmalstekst : undefined
    }

    if (svar === undefined) {
        return sporsmal.svartype.toString().startsWith('PERIODE') ? [] : ''
    }

    return svar.verdi
}

export const hentPerioder = (sporsmal: Sporsmal) => {
    const perioder: number[] = []
    sporsmal.svarliste.svar.forEach((svar: any, idx: number) =>
        perioder.push(idx)
    )
    return perioder
}

export const hentFormState = (sporsmal: Sporsmal) => {
    return hentSvarliste(sporsmal)
}

const hentSvarliste = (sporsmal: Sporsmal) => {
    let svar: any = {}

    if (sporsmal.svarliste.svar[0] !== undefined) {
        const svr = sporsmal.svarliste.svar[0] as RSSvar
        svar[sporsmal.id] = svr.verdi
    }
    sporsmal.undersporsmal.forEach((spm) => {
        const alleUndersporsmalSvar: any = hentSvarliste(spm)
        svar = { ...svar, ...alleUndersporsmalSvar }
    })
    return svar
}
