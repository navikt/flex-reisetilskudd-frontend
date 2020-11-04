import Lenke from 'nav-frontend-lenker'
import { Element,Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const ListeTekster = () => {
    return (
        <section className="liste__bakgrunn">
            <div className="sirkel">
                <Normaltekst className="sirkel__tall">1</Normaltekst>
                <div className="sirkel__tekst">
                    <Undertittel>
                        {tekst('bekreft.sendt-inn')}
                    </Undertittel>
                    <Normaltekst>
                        {tekst('bekreft.sendt-beskjed')}
                    </Normaltekst>
                </div>
            </div>

            <div className="sirkel">
                <Normaltekst className="sirkel__tall">2</Normaltekst>
                <div className="sirkel__tekst">
                    <Undertittel>
                        {tekst('bekreft.blir-behandlet')}
                    </Undertittel>
                    <Normaltekst>
                        {tekst('bekreft.dekker-utgiftene')}
                    </Normaltekst>
                </div>
            </div>

            <div className="listetekst">
                <Element tag="h3">
                    {tekst('bekreft.lurer-du')}
                </Element>
                <Lenke href="www.nav.no">
                    <Normaltekst tag="span">
                        {tekst('bekreft.les-mer')}
                    </Normaltekst>
                </Lenke>
            </div>
        </section>
    )
}

export default ListeTekster
