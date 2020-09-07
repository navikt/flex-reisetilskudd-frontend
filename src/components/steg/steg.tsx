import './steg.less'

import Stegindikator from 'nav-frontend-stegindikator'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { AktivtStegProps } from '../../types/navigasjon'
import { SEPARATOR } from '../../utils/constants'
import { sideTitler } from '../../utils/constants'

export const pathUtenSteg = (pathname: string): string => {
    const arr: string[] = pathname.split(SEPARATOR)
    arr.pop()
    return arr.join(SEPARATOR)
}

const Steg = ({ aktivtSteg }: AktivtStegProps) => {

    const genererteSteg = Object.entries(sideTitler).map(
        ([ , verdi ], index) => ({ label: `${verdi}`, index })
    )

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
        />
    )
}

export default Steg
