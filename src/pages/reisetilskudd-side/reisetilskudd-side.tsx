import './reisetilskudd-side.less'

import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link } from 'react-router-dom'

import DineReisetilskudd from '../../components/dine-reisetilskudd/dine-reisetilskudd'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'

const ReisetilskuddSide = () => {
    const { reisetilskuddene } = useAppStore()

    return (
        <div className="app-page dine-reisetilskudd-side">
            <Sidetittel tag="h1" className="sidetopp__tittel">
                Dine reisetilskudd
            </Sidetittel>
            <Vis hvis={reisetilskuddene && reisetilskuddene.length < 1}>
                <Normaltekst>
                    Det kan se ut som om du ikke har noen registrerte reisetilskudd, gå til
                    {' '}
                    {' '}
                    <Link to="/#">Dine sykmeldinger</Link>
                    {' '}
                    for å se om det ligger noe der.
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
