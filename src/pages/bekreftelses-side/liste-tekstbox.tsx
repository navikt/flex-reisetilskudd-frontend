import './bekreftelses-side.less'

import Lenke from 'nav-frontend-lenker'
import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

const ListeTekstbox = () => {
    return (
        <div className="liste-wrapper">
            <div className="tekstwrapper">
                <div className="inline-container">
                    <div className="numberCircle">1</div>
                    {' '}
                    <span className="nummer-circle-separator" />
                    <Undertittel>Du har sendt inn søknaden</Undertittel>
                </div>

                <div className="inline-container">
                    <div className="numberCircle">2</div>
                    <span className="nummer-circle-separator" />
                    <div>
                        <Undertittel>Søknaden blir behandlet</Undertittel>
                        <span className="tekstblokk">
                            Arbeidsgiveren din dekker utgiftene til reise de første 16 dagene.
                            Deretter er det NAV som utbetaler pengene hvis du har krav på reisetilskudd.
                        </span>
                        <span className="uthevet-tittel">Lurer du på hva saksbehandler gjør?</span>
                        <span className="tekstblokk">
                            <Lenke href="www.nav.no">Les mer om reglene for reisetilskudd .</Lenke>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListeTekstbox
