import React, { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import Filopplaster from '../filopplaster/Filopplaster';
import { IPeriode, Transportmiddel } from '../../models/periode';
import { IVedlegg } from '../../models/vedlegg';
import './Periode.less';
import Datovelger from '../datovelger/Datovelger';

interface Props {
  periode: IPeriode,
  index?: number,
  onChange?: () => void
}

const Periode : React.FC<Props> = ({ periode, index, onChange }) => {
  const [transportMiddel, settTransportMiddel] = useState();

  const totaltBeløp = periode.vedlegg
    ? (
      periode.vedlegg
        .filter((vedlegg) => vedlegg.beløp)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((vedlegg) => vedlegg.beløp!)
        .reduce((a, b) => a + b, 0.0)
    )
    : (0.0);

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
      <Datovelger className="periode-element" label="Dato" mode="single" />
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
      <Normaltekst>
        {`Totalt beløp: ${totaltBeløp}`}
      </Normaltekst>
      <Filopplaster
        vedlegg={periode.vedlegg}
        className="periode-element"
        tillatteFiltyper={['image/png', 'image/jpeg']}
        maxFilstørrelse={1024 * 1024}
        nårNyttVedlegg={(vedlegg) => {
          periode.vedlegg.push(vedlegg);
          if (onChange) {
            onChange();
          }
        }}

        nårSlettVedlegg={(vedleggSomSkalSlettes) => {
          // eslint-disable-next-line no-param-reassign
          periode.vedlegg = periode.vedlegg
            .filter((_vedlegg: IVedlegg) => _vedlegg.navn !== vedleggSomSkalSlettes.navn);
          if (onChange) {
            onChange();
          }
        }}
      />
    </Ekspanderbartpanel>
  );
};

export default Periode;
