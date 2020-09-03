import './reisetilskudd-side.less'

import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link } from 'react-router-dom'

import DineReisetilskudd from '../../components/dine-reisetilskudd/dine-reisetilskudd'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

const ReisetilskuddSide = () => {
    const { reisetilskuddene } = useAppStore()

    return (
        <div className="app-page dine-reisetilskudd-side">
            <Sidetittel tag="h1" className="sidetopp__tittel">
                {tekst('reisetilskudd.tittel')}
            </Sidetittel>
            <Vis hvis={reisetilskuddene && reisetilskuddene.length < 1}>
                <Normaltekst>
                    {tekst('ingen.reisetilskudd1')}
                    <Link to={tekst('reisetilskudd.url')}>{tekst('reisetilskudd.lenke')}</Link>
                    {tekst('ingen.reisetilskudd1')}
                </Normaltekst>
            </Vis>
            <div className="dine-reisetilskudd-wrapper">
                <Vis hvis={reisetilskuddene}>
                    <Element className="nye-reisetilskuddsøknader">Nye søknader om reisetilskudd</Element>
                    {reisetilskuddene?.map((value) => {
                        return <DineReisetilskudd key={`reisetilskudd-${value?.reisetilskuddId}`} reisetilskudd={value} />
                    })}
                </Vis>
            </div>
            <Vis hvis={reisetilskuddene === undefined}>
                <Normaltekst>Teknisk feil, kunne ikke finne noen reisetilskudd</Normaltekst>
            </Vis>
        </div>
    )
}

export default ReisetilskuddSide
