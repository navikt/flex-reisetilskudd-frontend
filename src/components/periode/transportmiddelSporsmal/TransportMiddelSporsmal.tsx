import { Undertittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import React, { ReactElement, useState } from 'react';
import { Transportmiddel } from '../../../models/vedlegg';

const TransportMiddelSporsmal = (): ReactElement => {
  const [transportMiddel, settTransportMiddel] = useState('');

  return (
    <RadioPanelGruppe
      key={Transportmiddel.SPØRSMÅLS_KEY}
      className="kvittering-element"
      name="transportmiddel"
      legend={<Undertittel>Transportmiddel</Undertittel>}
      radios={[
        {
          label: Transportmiddel.TAXI,
          value: Transportmiddel.TAXI,
          id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.TAXI}`,
        },
        {
          label: Transportmiddel.EGEN_BIL,
          value: Transportmiddel.EGEN_BIL,
          id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.EGEN_BIL}`,
        },
        {
          label: Transportmiddel.KOLLEKTIV,
          value: Transportmiddel.KOLLEKTIV,
          id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.KOLLEKTIV}`,
        },
      ]}
      checked={transportMiddel}
      onChange={(_, e) => {
        settTransportMiddel(e);
      }}
    />
  );
};

export default TransportMiddelSporsmal;
