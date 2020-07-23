import { Undertittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import React, { ReactElement, useState } from 'react';
import { Transportmiddel } from '../../../models/vedlegg';

const TransportMiddelSporsmal = (): ReactElement => {
  const [transportMiddel, settTransportMiddel] = useState('');

  return (
    <RadioPanelGruppe
      key={123}
      className="kvittering-element"
      name="transportmiddel"
      legend={<Undertittel>Transportmiddel</Undertittel>}
      radios={[
        {
          label: Transportmiddel.taxi,
          value: Transportmiddel.taxi,
          id: `-${Transportmiddel.taxi}`,
        },
        {
          label: Transportmiddel.egenBil,
          value: Transportmiddel.egenBil,
          id: `-${Transportmiddel.egenBil}`,
        },
        {
          label: Transportmiddel.kollektiv,
          value: Transportmiddel.kollektiv,
          id: `-${Transportmiddel.kollektiv}`,
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
