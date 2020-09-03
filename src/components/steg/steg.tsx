import './steg.less'

import Stegindikator from 'nav-frontend-stegindikator'
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { AktivtStegProps } from '../../types/navigasjon'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'

export const pathUtenSteg = (pathname: string): string => {
    const arr: string[] = pathname.split(SEPARATOR)
    arr.pop()
    return arr.join(SEPARATOR)
}

const Steg = ({ aktivtSteg }: AktivtStegProps) => {
    const genererteSteg: StegindikatorStegProps[] = [
        { label: tekst('steg.utbetaling'), index: 0 },
        { label: tekst('steg.transportmiddel'), index: 1 },
        { label: tekst('steg.reisetilskudd'), index: 2 },
        { label: tekst('steg.oppsummering'), index: 3 },
    ]
    const history = useHistory()

    function goTo(idx: number) {
        history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (idx))
    }

    return (
        <Stegindikator
            steg={genererteSteg}
            onChange={(id) => goTo(id + 1)}
            aktivtSteg={aktivtSteg - 1}
            visLabel
            autoResponsiv
        />
    )
}

export default Steg
