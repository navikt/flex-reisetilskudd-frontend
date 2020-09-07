import './oppsummering-side.less'

import { Systemtittel, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import OpplastedeFiler from '../../components/filopplaster/opplastede-filer'
import SendKnapp from '../../components/klikkbar/send-knapp'
import TotalBelop from '../../components/kvittering/total-belop/total-belop'
import DagensTransportmiddel from '../../components/oppsummering/dagens-transportmiddel'
import Utbetaling from '../../components/oppsummering/utbetaling'
import { tekst } from '../../utils/tekster'

const OppsummeringSide = () => (
    <div className="oppsummering-wrapper oppsummering-element">
        <Systemtittel className="oppsummering-overskrift">
            {tekst('oppsummering.tittel')}
        </Systemtittel>
        <Utbetaling />
        <DagensTransportmiddel />
        <div className="oppsummering-element oppsummering-vedlegg">
            <Undertittel className="opplastede-kvitteringer-tittel">
                {tekst('oppsummering.undertittel')}
            </Undertittel>
            <OpplastedeFiler />
            <div className="oppsummering-totalt-belop">
                <TotalBelop />
            </div>
        </div>
        <SendKnapp />
    </div>
)

export default OppsummeringSide
