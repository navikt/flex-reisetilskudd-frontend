import 'dayjs/locale/nb'

import dayjs from 'dayjs'
import { Sporsmal } from '../types/types'

dayjs.locale('nb')

const SKILLETEGN_PERIODE = '–'
export const maaneder = [ 'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember' ]
export const mnd_stor_forbokstav = [ 'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember' ]

export const tilLesbarDatoUtenAarstall = (datoArg: any): string => {
    if (datoArg) {
        const dato = dayjsToDate(datoArg)!
        const dag = dato.getDate()
        const manedIndex = dato.getMonth()
        const maned = maaneder[manedIndex]
        return `${dag}. ${maned}`
    }
    return ''
}

export const tilLesbarDatoMedArstall = (datoArg: any) => {
    return datoArg
        ? `${tilLesbarDatoUtenAarstall(dayjsToDate(datoArg))} ${dayjsToDate(datoArg)!.getFullYear()}`
        : null
}

export const tilLesbarPeriodeMedArstall = (fomArg: any, tomArg: any, skille?: string) => {
    if (skille === undefined) {
        skille = SKILLETEGN_PERIODE
    }
    const fom = dayjsToDate(fomArg)
    const tom = dayjsToDate(tomArg)
    const erSammeAar = fom?.getFullYear() === tom?.getFullYear()
    const erSammeMaaned = fom?.getMonth() === tom?.getMonth()
    return erSammeAar && erSammeMaaned
        ? `${fom?.getDate()}. ${skille} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
            ? `${tilLesbarDatoUtenAarstall(fom)} ${skille} ${tilLesbarDatoMedArstall(tom)}`
            : `${tilLesbarDatoMedArstall(fom)} ${skille} ${tilLesbarDatoMedArstall(tom)}`
}

export const tilLesbarPeriodeUtenArstall = (fomArg: any, tomArg: any) => {
    const fom = dayjsToDate(fomArg)!
    const tom = dayjsToDate(tomArg)!
    const erSammeMaaned = fom.getMonth() === tom.getMonth()
    return erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
        : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
}

export const dayjsToDate = (dato?: string) => {
    return (dato !== undefined && dato !== null)
        ? dayjs(dato).toDate()
        : undefined
}

export const fraBackendTilDate = (datoArg: string) => {
    const datoer = datoArg.split('-').map((verdi => {
        if (verdi[0] === '0') return parseInt(verdi[1])
        return parseInt(verdi)
    }))
    return new Date(datoer[0], datoer[1] - 1, datoer[2])
}

export function getDuration(from: Date, to: Date) {
    return Math.round(Math.floor(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

export const ukeDatoListe = (min: string, max: string) => {
    const ukeListe = []
    let dato = dayjs(min)
    while (dato.toDate() <= dayjs(max).toDate()) {
        ukeListe.push(dato)
        dato = dato.add(1, 'day')
    }
    return ukeListe
}

export const sammeMnd = (sporsmal: Sporsmal): boolean => {
    const firstMonth = dayjs(sporsmal.min!).month()
    const lastMonth = dayjs(sporsmal.max!).month()
    return firstMonth === lastMonth
}

export const sammeAar = (sporsmal: Sporsmal): boolean => {
    const firstYear = dayjs(sporsmal.min!).year().toString()
    const lastYear = dayjs(sporsmal.max!).year().toString()
    return firstYear === lastYear
}
