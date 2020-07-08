import React, { ReactElement } from 'react';
import RadioPG from '../../components/sporsmal/Sporsmal';
import { Undertittel } from 'nav-frontend-typografi';

function DagensTransportmiddel():ReactElement {
  return (
    <div>
      <Undertittel>
        Transportmiddel til daglig
      </Undertittel>
      <RadioPG />
    </div>
  );
}

export default DagensTransportmiddel;
