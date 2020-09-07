import './reisetilskudd-liste.less'

import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import DineReisetilskudd from '../../components/dine-reisetilskudd/dine-reisetilskudd'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const ReisetilskuddListe = () => {
    const { reisetilskuddene } = useAppStore()

    useEffect(() => {
        setBodyClass('reisetilskudd-liste')
    }, [])

    return (
        <div className="limit">
            <Sidetittel tag="h1" className="sidetopp__tittel">
                {tekst('reisetilskudd_liste.tittel')}
            </Sidetittel>
            <Vis hvis={reisetilskuddene && reisetilskuddene.length < 1}>
                <Normaltekst>
                    {tekst('reisetilskudd_liste.ingen.reisetilskudd1')}
                    <Link to={tekst('reisetilskudd_liste.ingen.reisetilskudd.url')}>
                        {tekst('reisetilskudd_liste.ingen.lenke')}
                    </Link>
                    {tekst('reisetilskudd_liste.ingen.reisetilskudd2')}
                </Normaltekst>
            </Vis>
            <div className="dine-reisetilskudd-wrapper">
                <Vis hvis={reisetilskuddene}>
                    <Element className="nye-reisetilskuddsøknader">
                        {tekst('reisetilskudd_liste.nye.soknader')}
                    </Element>
                    {reisetilskuddene?.map((value) => {
                        return <DineReisetilskudd key={`reisetilskudd-${value?.reisetilskuddId}`} reisetilskudd={value} />
                    })}
                </Vis>
            </div>
            <Vis hvis={reisetilskuddene === undefined}>
                <Normaltekst>{tekst('reisetilskudd_liste.feilmelding')}</Normaltekst>
            </Vis>
        </div>
    )
}

export default ReisetilskuddListe
