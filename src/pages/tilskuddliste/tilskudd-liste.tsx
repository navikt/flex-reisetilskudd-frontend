import './tilskudd-liste.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useRef } from 'react'

import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import Vis from '../../components/diverse/vis'
import TilskuddTeasere from '../../components/teasere/tilskudd-teasere'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('tilskudd.liste.tittel'),
    sti: SEPARATOR,
    erKlikkbar: false
} ]

const TilskuddListe = () => {
    const { reisetilskuddene } = useAppStore()
    const limitRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setBodyClass('reisetilskudd-liste')
        limitRef.current && limitRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [])

    return (
        <>
            <Banner tittel={tekst('tilskudd.liste.tittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div ref={limitRef} className="limit">
                <Vis hvis={reisetilskuddene === undefined}>
                    <Normaltekst>{tekst('tilskudd.liste.feilmelding')}</Normaltekst>
                </Vis>
                <TilskuddTeasere />
            </div>
        </>
    )
}

export default TilskuddListe
