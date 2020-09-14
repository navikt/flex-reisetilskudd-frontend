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
                        {tekst('bekreftelses.sendt-inn')}
                    </Undertittel>
                    <Normaltekst>
                        {tekst('bekreftelses.sendt-beskjed')}
                    </Normaltekst>
                </div>
            </div>

            <div className="sirkel">
                <Normaltekst className="sirkel__tall">2</Normaltekst>
                <div className="sirkel__tekst">
                    <Undertittel>
                        {tekst('bekreftelses.blir-behandlet')}
                    </Undertittel>
                    <Normaltekst>
                        {tekst('bekreftelses.dekker-utgiftene')}
                    </Normaltekst>
                </div>
            </div>

            <div className="listetekst">
                <Element tag="h3">
                    {tekst('bekreftelses.lurer-du')}
                </Element>
                <Lenke href="www.nav.no">
                    <Normaltekst tag="span">
                        {tekst('bekreftelses.les-mer')}
                    </Normaltekst>
                </Lenke>
            </div>
        </section>
    )
}

export default ListeTekster
