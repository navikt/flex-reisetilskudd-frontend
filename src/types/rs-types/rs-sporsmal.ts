import { Sporsmal, Svar } from '../types'
import { RSSvar } from './rs-svar'
import { RSKvittering } from './rs-kvittering'

export interface RSSporsmal {
    id: string;
    tag: string;
    overskrift: string | null;
    sporsmalstekst: string | null;
    undertekst: string | null;
    hjelpetekst: {
        tittel: string | null,
        brodtekst: string | null,
    } | null,
    svartype: string;
    min: string | null;
    max: string | null;
    kriterieForVisningAvUndersporsmal: string | null;
    svar: RSSvar[];
    undersporsmal: RSSporsmal[];
}

export const sporsmalToRS = (sporsmal: Sporsmal): RSSporsmal => {
    // eslint-disable-next-line no-console
    console.log(sporsmal)
    return {
        id: sporsmal.id,
        tag: sporsmal.tag.toString() + tagIndexEllerBlank(sporsmal.tagIndex as any),
        overskrift: sporsmal.overskrift || null,
        sporsmalstekst: sporsmal.sporsmalstekst === '' ? null : sporsmal.sporsmalstekst,
        undertekst: sporsmal.undertekst || null,
        hjelpetekst: sporsmal.hjelpetekst,
        svartype: sporsmal.svartype,
        min: sporsmal.min || null,
        max: sporsmal.max || null,
        kriterieForVisningAvUndersporsmal: sporsmal.kriterieForVisningAvUndersporsmal || null,
        svar: svarToRS(sporsmal.svarliste.svar),
        undersporsmal: (sporsmal.undersporsmal) ?
            sporsmal.undersporsmal.map((uspm: Sporsmal) => {
                return sporsmalToRS(uspm)
            }) : []
    } as RSSporsmal
}

const tagIndexEllerBlank = (tagIndex: number) => {
    if (tagIndex) return `_${tagIndex}`
    return ''
}

const svarToRS = (svar: Svar[]) => {
    return  svar.map((svar) => {
        return {
            id: svar.id,
            verdi: svar.verdi || null,
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
