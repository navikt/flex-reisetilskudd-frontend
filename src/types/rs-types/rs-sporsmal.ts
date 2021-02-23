import { Sporsmal, Svar } from '../types'
import { RSSvar } from './rs-svar'
import { RSKvittering } from './rs-kvittering'

export interface RSSporsmal {
    id: string;
    tag: string;
    overskrift: string | null;
    sporsmalstekst: string | null;
    undertekst: string | null;
    svartype: string;
    min: string | null;
    max: string | null;
    kriterieForVisningAvUndersporsmal: string | null;
    svar: RSSvar[];
    undersporsmal: RSSporsmal[];
}

const rsSporsmalMapping = (sporsmal: Sporsmal): RSSporsmal => {
    const rsSporsmal = {} as RSSporsmal
    rsSporsmal.id = sporsmal.id
    rsSporsmal.tag = sporsmal.tag.toString() + tagIndexEllerBlank(sporsmal.tagIndex as any)
    rsSporsmal.overskrift = sporsmal.overskrift || null
    rsSporsmal.sporsmalstekst = sporsmal.sporsmalstekst === '' ? null : sporsmal.sporsmalstekst
    rsSporsmal.undertekst =  sporsmal.undertekst || null
    rsSporsmal.svartype = sporsmal.svartype
    rsSporsmal.min = sporsmal.min || null
    rsSporsmal.max = sporsmal.max || null
    rsSporsmal.kriterieForVisningAvUndersporsmal = sporsmal.kriterieForVisningAvUndersporsmal || null
    rsSporsmal.svar = svarToRS(sporsmal.svarliste.svar)
    if (sporsmal.undersporsmal) {
        rsSporsmal.undersporsmal = sporsmal.undersporsmal.map((uspm: Sporsmal) => {
            return rsSporsmalMapping(uspm)
        })
    } else {
        rsSporsmal.undersporsmal = []
    }
    return rsSporsmal
}

const tagIndexEllerBlank = (tagIndex: number) => {
    if (tagIndex) return `_${tagIndex}`
    return ''
}

const svarToRS = (svar: Svar[]) => {
    return  svar.map((svar) => {
        return {
            id: svar.id,
            verdi: svar.verdi,
            kvittering: (svar.kvittering) ? {
                blobId: svar.kvittering.blobId,
                datoForUtgift: svar.kvittering.datoForUtgift.toString(),
                belop: svar.kvittering.belop,
                typeUtgift: svar.kvittering.typeUtgift,
                opprettet: svar.kvittering.opprettet || null
            } as RSKvittering : null
        } as RSSvar
    })
}
