import { SvarEnums } from '../../types/enums'
import { Sporsmal, Svartype } from '../../types/types'
import { empty } from '../../utils/constants'

const hentVerdier = (sporsmal: Sporsmal, verdier: Record<string, any>) => {
    let verdi = verdier[sporsmal.id]
    if (verdi === undefined) {
        verdi = Object.entries(verdier)
            .filter(([ key ]) => key.startsWith(sporsmal.id))
            .map(([ key ]) => verdier[key])
            .filter((verdi) => verdi !== empty)
    }
    return verdi
}

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, any>): void => {
    const verdi = hentVerdier(sporsmal, verdier)
    if (verdi === undefined) {
        return
    }
    switch (sporsmal.svartype) {
        case Svartype.CHECKBOX_PANEL:
        case Svartype.CHECKBOX:
            checkboxSvar(sporsmal, verdi)
            break
        case Svartype.CHECKBOX_GRUPPE:
            // Skal ikke ha svarverdi
            break
        // TODO: Kvittering
        default:
            sporsmal.svarliste = {
                sporsmalId: sporsmal.id,
                svar: [ { verdi: verdi ? verdi.toString() : '' } ]
            }
    }

    sporsmal.undersporsmal.forEach((spm) => {
        settSvar(spm, verdier)
    })
}

const checkboxSvar = (sporsmal: Sporsmal, verdi: any) => {
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: [ { verdi: (verdi === SvarEnums.CHECKED || verdi === true) ? SvarEnums.CHECKED : '' } ]
    }
}
