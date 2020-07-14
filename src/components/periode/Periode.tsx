import React, { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import Filopplaster from '../filopplaster/Filopplaster';
import { IPeriode, Transportmiddel } from '../../models/periode';
import './Periode.less';
import ReisetilskuddDatovelger from '../dato/ReisetilskuddDatovelger';

interface Props {
  periode: IPeriode,
  index?: number
}

const Periode : React.FC<Props> = ({ periode, index }) => {
  const [transportMiddel, settTransportMiddel] = useState();
  return (
    <Ekspanderbartpanel
      className="periode-panel"
      key={periode.id}
      tittel={(
        <div>
          <Undertittel>{`Periode ${(index !== undefined ? index + 1 : '')}`}</Undertittel>
          { (periode.fraDato && periode.tilDato)
            ? (
              <Normaltekst>
                {periode.fraDato.toDateString()}
                {' '}
                -
                {' '}
                {periode.tilDato.toDateString()}
              </Normaltekst>
            )
            : (
              <Normaltekst>
                Lengden på perioden er ikke spesifisert
              </Normaltekst>
            )}
        </div>
        )}
    >
      <hr />
      <ReisetilskuddDatovelger className="periode-element" label="Dato" />
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
      <Filopplaster
        className="periode-element"
        tillatteFiltyper={['image/png', 'image/jpeg']}
        maxFilstørrelse={1024 * 1024}
      />
    </Ekspanderbartpanel>
  );
};

export default Periode;
