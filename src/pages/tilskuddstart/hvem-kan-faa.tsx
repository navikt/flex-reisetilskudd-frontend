import React from 'react'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import { tekst } from '../../utils/tekster'
import { Link } from 'react-router-dom'

const HvemKanFaa = () => {
    return (
        <>
            <Normaltekst tag="ul">
                <li>{tekst('tilskudd.start.du-er')}</li>
                <li>{tekst('tilskudd.start.du-trenger')}</li>
                <li>{tekst('tilskudd.start.du-har')}</li>
            </Normaltekst>

            <Element tag="h3">{tekst('tilskudd.start.hvor-mye')}</Element>
            <Normaltekst>
                {tekst('tilskudd.start.du-kan')}
                <Link to="">{tekst('tilskudd.start.les-mer.lenke')}</Link>.
            </Normaltekst>
            <Element tag="h3">{tekst('tilskudd.start.husk')}</Element>
            <Normaltekst>{tekst('tilskudd.start.fristen-for')}</Normaltekst>
        </>
    )
}

export default HvemKanFaa
