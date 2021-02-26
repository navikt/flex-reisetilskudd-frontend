import { SvarEnums } from '../../types/enums'
import { Sporsmal, Svar, Svartype } from '../../types/types'
import { empty } from '../../utils/constants'

const hentVerdier = (sporsmal: Sporsmal, verdier: Record<string, any>) => {
    let verdi = verdier[sporsmal.id]
    if (verdi === undefined) {
        verdi = Object.entries(verdier)
            .filter(([ key ]) => key.startsWith(sporsmal.id))
            .map(([ key ]) => verdier[key])
            .filter((verdi) => verdi !== empty && verdi !== false)
        if (verdi.length > 0) return verdi
        else return undefined
    }
    return verdi
}

const tomtSvar = (sporsmal: Sporsmal) => {
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: []
    }
}

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, any>): void => {
    const verdi = hentVerdier(sporsmal, verdier)
    if (verdi === undefined || verdi === false) {
        tomtSvar(sporsmal)
    }
    else {
        switch (sporsmal.svartype) {
            case Svartype.CHECKBOX_PANEL:
            case Svartype.CHECKBOX:
                checkboxSvar(sporsmal)
                break
            case Svartype.CHECKBOX_GRUPPE:
                tomtSvar(sporsmal)
                break
            case Svartype.DATOER:
                datoerSvar(sporsmal, verdi)
                break
            // TODO: Kvittering
            default:
                sporsmal.svarliste = {
                    sporsmalId: sporsmal.id,
                    svar: [ { verdi: verdi.toString() } ]
                }
        }
    }

    sporsmal.undersporsmal.forEach((spm) => {
        settSvar(spm, verdier)
    })
}

const checkboxSvar = (sporsmal: Sporsmal) => {
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: [ {
            verdi: SvarEnums.CHECKED
        } ]
    }
}

const datoerSvar = (sporsmal: Sporsmal, verdi: any) => {
    const svar: Svar[] = []
    if (verdi !== undefined) {
        verdi.toString().split(',').map( (dag: string) =>
            svar.push({
                verdi: dag
            })
        )
    }
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: svar
    }
}
