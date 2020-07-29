import React, { ReactElement } from 'react';
import './oppsummering.less';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';
import OppsummeringDagensTransportmiddel from '../../components/oppsummering/OppsummeringDagensTransportMiddel';
import OppsummeringUtbetaling from '../../components/oppsummering/OppsummeringUtbetaling';

const Oppsummering = () : ReactElement => (
  <div className="oppsummering-wrapper oppsummering-element">
    <Innholdstittel className="oppsummering-overskrift">Oppsummering av søknaden</Innholdstittel>
    <OppsummeringUtbetaling />
    <OppsummeringDagensTransportmiddel />
    <div className="oppsummering-element oppsummering-vedlegg">
      <Undertittel className="oppsummering-element">Opplastede kvitteringer</Undertittel>
      <OpplastedeFiler />
      <div className="oppsummering-totalt-belop">
        <TotalBelop />
      </div>
    </div>
  </div>
);

export default Oppsummering;
