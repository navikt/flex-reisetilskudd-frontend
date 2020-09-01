import './brodsmoler.less'

import Stegindikator from 'nav-frontend-stegindikator'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { sideTitler } from '../../constants/side-titler'
import { AktivtStegProps } from '../../models/navigasjon'
import { SEPARATOR } from '../../utils/constants'

export const pathUtenSteg = (pathname: string): string => {
    const arr: string[] = pathname.split(SEPARATOR)
    arr.pop()
    return arr.join(SEPARATOR)
}

const Brodsmuler = ({ aktivtSteg }: AktivtStegProps) => {
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
            autoResponsiv
        />
    )
}

export default Brodsmuler
