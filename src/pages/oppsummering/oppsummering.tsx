import './oppsummering.less'

import { Systemtittel, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import OpplastedeFiler from '../../components/filopplaster/opplastede-filer'
import SendKnapp from '../../components/knapper/send-knapp'
import TotalBelop from '../../components/kvittering/totalt-belop/TotaltBelop'
import OppsummeringDagensTransportmiddel from '../../components/oppsummering/oppsummering-dagens-transportmiddel'
import OppsummeringUtbetaling from '../../components/oppsummering/oppsummering-utbetaling'

const Oppsummering = () => (
    <div className="oppsummering-wrapper oppsummering-element">
        <Systemtittel className="oppsummering-overskrift">Oppsummering av søknaden</Systemtittel>
        <OppsummeringUtbetaling />
        <OppsummeringDagensTransportmiddel />
        <div className="oppsummering-element oppsummering-vedlegg">
            <Undertittel className="opplastede-kvitteringer-tittel">Opplastede kvitteringer</Undertittel>
            <OpplastedeFiler />
            <div className="oppsummering-totalt-belop">
                <TotalBelop />
            </div>
        </div>
        <SendKnapp />
    </div>
)

export default Oppsummering
