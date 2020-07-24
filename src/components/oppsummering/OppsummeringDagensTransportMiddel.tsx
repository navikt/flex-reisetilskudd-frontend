import React, { ReactElement } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';

const OppsummeringDagensTransportmiddel = () : ReactElement => {
  const { dagensTransportmiddelState } = useAppStore();
  return (
    <div className="oppsummering-dagens-transportmiddel">
      <Undertittel className="oppsummering-underoverskrift">Dagens transportmiddel</Undertittel>
      {dagensTransportmiddelState.offentligPrivatSpørsmål}
    </div>
  );
};

export default OppsummeringDagensTransportmiddel;
