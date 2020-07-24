import React, { ReactElement } from 'react';
import './oppsummering.less';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import TotalBelop from '../../components/periode/totaltBelop/TotaltBelop';
import OppsummeringDagensTransportmiddel from '../../components/oppsummering/OppsummeringDagensTransportMiddel';
import OppsummeringUtbetaling from '../../components/oppsummering/OppsummeringUtbetaling';

const Oppsummering = () : ReactElement => (
  <div className="oppsummering-wrapper">
    <Innholdstittel className="oppsummering-overskrift">Oppsummering av søknaden</Innholdstittel>
    <OppsummeringUtbetaling />
    <OppsummeringDagensTransportmiddel />
    <div className="oppsummering-vedlegg">
      <Undertittel className="oppsummering-underoverskrift">Opplastede vedlegg</Undertittel>
      <OpplastedeFiler />
      <TotalBelop />
    </div>
  </div>
);

export default Oppsummering;
