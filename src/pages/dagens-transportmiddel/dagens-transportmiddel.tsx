import React, { ReactElement } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import RadioPG from '../../components/sporsmal/Sporsmal';

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
