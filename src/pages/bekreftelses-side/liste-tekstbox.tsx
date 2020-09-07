import './bekreftelses-side.less'

import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const ListeTekstbox = () => {
    return (
        <div className="liste-wrapper">
            <div className="tekstwrapper">
                <div className="inline-container">
                    <div className="numberCircle">1</div>
                    <span className="nummer-circle-separator" />
                    <Undertittel>
                        {tekst('bekreftelses.sendt-inn')}
                    </Undertittel>
                </div>

                <div className="inline-container">
                    <div className="numberCircle">2</div>
                    <span className="nummer-circle-separator" />
                    <div>
                        <Undertittel>
                            {tekst('bekreftelses.blir-behandlet')}
                        </Undertittel>
                        <Normaltekst tag="span" className="tekstblokk">
                            {tekst('bekreftelses.dekker-utgiftene')}
                        </Normaltekst>
                        <Normaltekst tag="strong" className="uthevet-tittel">
                            {tekst('bekreftelses.lurer-du')}
                        </Normaltekst>
                        <Lenke href="www.nav.no">
                            <Normaltekst tag="span" className="tekstblokk">
                                {tekst('bekreftelses.les-mer')}
                            </Normaltekst>
                        </Lenke>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListeTekstbox
