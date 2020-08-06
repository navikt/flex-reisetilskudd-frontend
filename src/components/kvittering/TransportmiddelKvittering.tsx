import { Element } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import React, { ReactElement } from 'react';
import { Transportmiddel, TransportmiddelAlternativer } from '../../models/kvittering';
import { useAppStore } from '../../data/stores/app-store';

interface Props {
  handleChange? : (transportmiddel : TransportmiddelAlternativer) => void
}

const TransportmiddelKvittering : React.FC<Props> = ({ handleChange }) : ReactElement => {
  const { transportmiddelKvittering, settTransportmiddelKvittering } = useAppStore();

  return (
    <RadioPanelGruppe
      key={Transportmiddel.SPØRSMÅLS_KEY}
      className="kvittering-element"
      name="transportmiddel"
      legend={<Element>Transportmiddel</Element>}
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
          label: Transportmiddel.KOLLEKTIVT,
          value: Transportmiddel.KOLLEKTIVT,
          id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.KOLLEKTIVT}`,
        },
      ]}
      checked={transportmiddelKvittering}
      onChange={(_, nyttTransportmiddel) => {
        if (handleChange) {
          handleChange(nyttTransportmiddel as TransportmiddelAlternativer);
        }
        settTransportmiddelKvittering(nyttTransportmiddel);
      }}
    />
  );
};

export default TransportmiddelKvittering;
