import { Reisetilskudd, Sporsmal } from '../types/types'
import { TagTyper } from '../types/enums'

export const flattenSporsmal = (sporsmal: Sporsmal[]) => {
    let flatArr: Sporsmal[] = []
    for (let i = 0; i < sporsmal.length; i++) {
        flatArr.push(sporsmal[i])
        flatArr = flatArr.concat(flattenSporsmal(sporsmal[i].undersporsmal))
    }
    return flatArr
}

export const hentSporsmal = (tilskudd: Reisetilskudd, tag: TagTyper): Sporsmal | undefined => {
    return flattenSporsmal(tilskudd.sporsmal).find(spm => spm.tag === tag)
}

export const hentUndersporsmal = (sporsmal: Sporsmal, tag: TagTyper): Sporsmal | undefined => {
    return flattenSporsmal(sporsmal.undersporsmal).find(spm => spm.tag === tag)
}

export const finnHovedSporsmal = ( tilskudd: Reisetilskudd, sporsmal: Sporsmal ): Sporsmal | undefined => {
    if (sporsmal.erHovedsporsmal) {
        return sporsmal
    }
    return tilskudd.sporsmal.find(spm =>
        flattenSporsmal(spm.undersporsmal).map(underspm => underspm.id).includes(sporsmal.id))
}
