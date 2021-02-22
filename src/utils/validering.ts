import { dayjsToDate } from './dato'

const validerDato = (values: any, min?: Date, max?: Date) => {
    const formDato = values['dato_input']
    // Enkel null sjekk
    if (formDato === undefined || formDato === '') return 'Du må velge dato'

    const valgtDato = dayjsToDate(formDato)
    // Formattering er riktig når dato er skrevet inn manuelt
    if (isNaN(valgtDato?.getTime() || NaN)) return 'Datoen følger ikke formatet dd.mm.åååå'
    // Grenseverdier
    if (min && valgtDato! < min) return 'Datoen kan ikke være før ' + min
    if (max && valgtDato! > max) return 'Datoen kan ikke være etter ' + max

    return true
}

export default validerDato
