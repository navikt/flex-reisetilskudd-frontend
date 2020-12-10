import 'dayjs/locale/nb'

import dayjs from 'dayjs'
dayjs.locale('nb')

const SKILLETEGN_PERIODE = '–'
const maaneder = [ 'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember' ]

export enum DatoFormat {
    TALL = 'DD.MM.YYYY', // eslint-disable-line
    NATURLIG_KORT = 'D. MMMM', // eslint-disable-line
    NATURLIG_LANG = 'D. MMMM YYYY', // eslint-disable-line
    NATURLIG_FULL = 'dddd D. MMMM YYYY', // eslint-disable-line
    FLATPICKR = 'YYYY-MM-DD', // eslint-disable-line
}

export enum TidsFormat {
    VANLIG = 'HH:mm', // eslint-disable-line
    TIMER = 'HH', // eslint-disable-line
    MINUTTER = 'mm' // eslint-disable-line
}

export const getIDag = (format?: string): string => dayjs().format(format || DatoFormat.TALL)

export const getNåTid = (format?: string): string => dayjs().format(format || TidsFormat.VANLIG)

export const formatertDato = (date: Date | string, format?: string): string => (
    dayjs(date).format(format || DatoFormat.TALL)
)

export const tilLesbarDatoUtenAarstall = (datoArg: any): string => {
    if (datoArg) {
        const dato =  dayjsToDate(datoArg)!
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
    skille === undefined ? skille = SKILLETEGN_PERIODE : skille
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

export const dayjsToDate = (dato: string) => {
    return dato !== null ? dayjs(dato).toDate() : null
}
