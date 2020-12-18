import './tilskudd-liste.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import Vis from '../../components/diverse/vis'
import TilskuddTeasere from '../../components/teasere/tilskudd-teasere'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Lenke from 'nav-frontend-lenker'
import { VenstreChevron } from 'nav-frontend-chevron'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('tilskudd.liste.tittel'),
    sti: SEPARATOR,
    erKlikkbar: false
} ]

const TilskuddListe = () => {
    const { reisetilskuddene } = useAppStore()

    useEffect(() => {
        setBodyClass('reisetilskudd-liste')
    }, [])

    return (
        <>
            <Banner tittel={tekst('tilskudd.liste.tittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Vis hvis={reisetilskuddene === undefined}>
                    <Normaltekst>{tekst('tilskudd.liste.feilmelding')}</Normaltekst>
                </Vis>

                <TilskuddTeasere />

                <Lenke href="#">
                    <VenstreChevron />
                    {tekst('tilskudd.liste.tilbake')}
                </Lenke>
            </div>
        </>
    )
}

export default TilskuddListe
