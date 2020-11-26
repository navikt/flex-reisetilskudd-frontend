import { SEPARATOR } from './constants'

export const pathUtenSteg = (pathname: string): string => {
    const arr: string[] = pathname.split(SEPARATOR)
    arr.pop()
    return arr.join(SEPARATOR)
}

export const pathTilSide = (idx: number, history: any): string => (
    pathUtenSteg(history.location.pathname) + SEPARATOR + (idx)
)
