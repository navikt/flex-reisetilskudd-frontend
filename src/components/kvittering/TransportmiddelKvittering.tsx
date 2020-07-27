import { Undertittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import React, { ReactElement } from 'react';
import { Transportmiddel } from '../../models/kvittering';
import { useAppStore } from '../../data/stores/app-store';

const TransportmiddelKvittering = (): ReactElement => {
  const { transportmiddel, settTransportmiddel } = useAppStore();

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
      checked={transportmiddel}
      onChange={(_, nyVerdi) => {
        settTransportmiddel(nyVerdi);
      }}
    />
  );
};

export default TransportmiddelKvittering;
