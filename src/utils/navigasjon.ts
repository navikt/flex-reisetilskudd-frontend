import { getAntallSider } from './constants'
import { SEPARATOR } from './constants'

export const pathUtenSteg = (pathname: string): string => {
    const arr: string[] = pathname.split(SEPARATOR)
    arr.pop()
    return arr.join(SEPARATOR)
}

export const pathTilSide = (idx: number, history: any): string => (
    pathUtenSteg(history.location.pathname) + SEPARATOR + (idx)
)

export const gåTilNesteSide = (history: any, aktivtSteg: number): void => {
    if (aktivtSteg + 1 <= getAntallSider() && aktivtSteg + 1 > 1) {
        history.push(pathTilSide(aktivtSteg + 1, history))
    }
}
