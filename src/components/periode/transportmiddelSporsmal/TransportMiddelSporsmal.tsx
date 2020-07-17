import { Undertittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import React, { Dispatch, ReactElement } from 'react';
import { PeriodeInterface, Transportmiddel } from '../../../models/periode';

interface Props {
  periode: PeriodeInterface,
  transportMiddel: string,
  settTransportMiddel: Dispatch<string>,
}

const TransportMiddelSporsmal = (props: Props): ReactElement => {
  const { periode, transportMiddel, settTransportMiddel } = props;
  return (
    <RadioPanelGruppe
      key={periode.id}
      className="periode-element"
      name="transportmiddel"
      legend={<Undertittel>Transportmiddel</Undertittel>}
      radios={[
        {
          label: Transportmiddel.taxi,
          value: Transportmiddel.taxi,
          id: `${periode.id}-${Transportmiddel.taxi}`,
        },
        {
          label: Transportmiddel.egenBil,
          value: Transportmiddel.egenBil,
          id: `${periode.id}-${Transportmiddel.egenBil}`,
        },
        {
          label: Transportmiddel.kollektiv,
          value: Transportmiddel.kollektiv,
          id: `${periode.id}-${Transportmiddel.kollektiv}`,
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
