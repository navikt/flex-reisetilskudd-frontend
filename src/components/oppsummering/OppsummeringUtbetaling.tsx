import React, { ReactElement } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
// import { useAppStore } from '../../data/stores/app-store';

const OppsummeringUtbetaling = () : ReactElement => (
  <div className="oppsummering-utbetaling">
    <Undertittel className="oppsummering-underoverskrift">Hvem skal pengene utbetales til?</Undertittel>
  </div>
);

export default OppsummeringUtbetaling;
