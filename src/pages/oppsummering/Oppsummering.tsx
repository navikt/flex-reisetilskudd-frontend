import React, { ReactElement } from 'react';
import './oppsummering.less';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';
import OppsummeringDagensTransportmiddel from '../../components/oppsummering/OppsummeringDagensTransportMiddel';
import OppsummeringUtbetaling from '../../components/oppsummering/OppsummeringUtbetaling';

const Oppsummering = () : ReactElement => (
  <div className="oppsummering-wrapper oppsummering-element">
    <Systemtittel className="oppsummering-overskrift">Oppsummering av søknaden</Systemtittel>
    <OppsummeringUtbetaling />
    <OppsummeringDagensTransportmiddel />
    <div className="oppsummering-element oppsummering-vedlegg">
      <Undertittel>Opplastede kvitteringer</Undertittel>
      <OpplastedeFiler />
      <div className="oppsummering-totalt-belop">
        <TotalBelop />
      </div>
    </div>
  </div>
);

export default Oppsummering;
