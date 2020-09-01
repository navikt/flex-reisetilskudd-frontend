import './dine-reisetilskudd.less'

import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Reisetilskudd from '../../components/dine-reisetilskudd/reisetilskudd'
import Vis from '../../components/vis'
import hentReisetilskudd from '../../data/fetcher/hent-reisetilskudd'
import { useAppStore } from '../../data/stores/app-store'

function DineReisetilskudd() {
    const {
        reisetilskuddene,
        settReisetilskuddene,
    } = useAppStore()
    const [ isFirstRender, setIsFirstRender ] = useState<boolean>(true)

    if (isFirstRender) {
        hentReisetilskudd(settReisetilskuddene)
        setIsFirstRender(false)
    }
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
                    {reisetilskuddene?.map((value) => <Reisetilskudd key={`reisetilskudd-${value?.reisetilskuddId}`} reisetilskudd={value} />)}
                </Vis>
            </div>
            <Vis hvis={reisetilskuddene === undefined}>
                <Normaltekst>Teknisk feil, kunne ikke finne noen reisetilskudd</Normaltekst>
            </Vis>

        </div>
    )
}

export default DineReisetilskudd
