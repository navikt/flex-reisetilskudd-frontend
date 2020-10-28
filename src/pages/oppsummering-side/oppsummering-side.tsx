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
    <div className="oppsummering">
        <Systemtittel>
            {tekst('oppsummering.tittel')}
        </Systemtittel>
        <Utbetaling />
        <DagensTransportmiddel />
        <Undertittel tag="h3">
            {tekst('oppsummering.undertittel')}
        </Undertittel>
        <OpplastedeFiler />
        <TotalBelop />
        <SendKnapp />
    </div>
)

export default OppsummeringSide
