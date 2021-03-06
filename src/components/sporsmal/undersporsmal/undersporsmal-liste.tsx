import React from 'react'

import { Sporsmal } from '../../../types/types'
import SporsmalSwitch from '../sporsmal-switch'
import Vis from '../../diverse/vis'

interface UndersporsmalListeProps {
    oversporsmal: Sporsmal;
    oversporsmalSvar?: string;
}

const UndersporsmalListe = ({ oversporsmal, oversporsmalSvar }: UndersporsmalListeProps) => {
    return (
        <>
            {oversporsmal.undersporsmal.map((underspm: Sporsmal, idx: number) => {
                return (
                    <Vis hvis={
                        !oversporsmal.kriterieForVisningAvUndersporsmal ||
                        oversporsmal.kriterieForVisningAvUndersporsmal === oversporsmalSvar
                    } key={idx}>
                        <SporsmalSwitch sporsmal={underspm} />
                    </Vis>
                )
            }).filter((underspm: any) => underspm !== null)}
        </>
    )
}

export default UndersporsmalListe
