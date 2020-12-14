import { Periode } from '../types/types'

export const tidligsteFom = (perioder: Periode[]) => {
    if (perioder.length === 0) {
        return undefined
    }

    return perioder.map((p) => {
        return p.fom
    }).sort((p1, p2) => {
        if (p1 > p2) {
            return 1
        } else if (p1 < p2) {
            return -1
        }
        return 0
    })[0]
}

export const senesteTom = (perioder: Periode[]) => {
    if (perioder.length === 0) {
        return undefined
    }
    return perioder.map((p) => {
        return p.tom
    }).sort((p1, p2) => {
        if (p1 < p2) {
            return 1
        } else if (p1 > p2) {
            return -1
        }
        return 0
    })[0]
}
