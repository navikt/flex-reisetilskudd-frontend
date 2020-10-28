import './reisetilskudd-liste.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import DineReisetilskudd from '../../components/dine-reisetilskudd/dine-reisetilskudd'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/brodsmule'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('reisetilskudd_liste.tittel'),
    sti: SEPARATOR,
    erKlikkbar: false
} ]

const ReisetilskuddListe = () => {
    const { reisetilskuddene } = useAppStore()

    useEffect(() => {
        setBodyClass('reisetilskudd-liste')
    }, [])

    return (
        <>
            <Banner tittel={tekst('reisetilskudd_liste.tittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Vis hvis={reisetilskuddene && reisetilskuddene.length < 1}>
                    <Normaltekst>
                        {tekst('reisetilskudd_liste.ingen.reisetilskudd1')}
                        <Link to={tekst('reisetilskudd_liste.ingen.reisetilskudd.url')}>
                            {tekst('reisetilskudd_liste.ingen.lenke')}
                        </Link>
                        {tekst('reisetilskudd_liste.ingen.reisetilskudd2')}
                    </Normaltekst>
                </Vis>
                <Vis hvis={reisetilskuddene}>
                    <Element tag="h2" className="nye-soknader__tittel">
                        {tekst('reisetilskudd_liste.nye.soknader')}
                    </Element>
                    {reisetilskuddene?.map((value) => {
                        return <DineReisetilskudd key={`reisetilskudd-${value?.reisetilskuddId}`} reisetilskudd={value} />
                    })}
                </Vis>
                <Vis hvis={reisetilskuddene === undefined}>
                    <Normaltekst>{tekst('reisetilskudd_liste.feilmelding')}</Normaltekst>
                </Vis>
            </div>
        </>
    )
}

export default ReisetilskuddListe
