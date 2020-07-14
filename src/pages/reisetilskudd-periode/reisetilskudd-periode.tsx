import React, { ReactElement, useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {
  Innholdstittel, Undertittel, Normaltekst, Ingress,
} from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import Filopplaster from '../../components/filopplaster/Filopplaster';
import { IPeriode, Transportmiddel } from '../../models/periode';
import './reisetilskudd-periode.less';
import ReisetilskuddDatovelger from '../../components/dato/ReisetilskuddDatovelger';

const mockPerioder = [
  {
    id: '123123',
    fraDato: new Date(),
    tilDato: new Date(),
    transportMiddel: Transportmiddel.taxi,
  },
  {
    id: 'asdasdasd',
    transportMiddel: Transportmiddel.egenBil,
  }];
const ReisetilskuddPeriodeSide = () : ReactElement => {
  // eslint-disable-next-line
  const [perioder, settPerioder] = useState<IPeriode[]>(mockPerioder);
  const [transportMiddel, settTransportMiddel] = useState();

  return (
    <div className="perioder-wrapper">
      <Innholdstittel className="periode-overskrift">Opplasting av kvitteringer</Innholdstittel>
      <Ingress className="periode-overskrift"> Legg inn dine perioder og kvitteringer </Ingress>
      {perioder.map((periode, index) => (
        <Ekspanderbartpanel
          className="periode-panel"
          key={periode.id}
          tittel={(
            <div>
              <Undertittel>{`Periode ${index + 1}`}</Undertittel>
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
            className="periode-element"
            name="transportmiddel"
            legend={<Undertittel>Transportmiddel</Undertittel>}
            radios={[
              {
                label: Transportmiddel.taxi,
                value: Transportmiddel.taxi,
                id: Transportmiddel.taxi,
              },
              {
                label: Transportmiddel.egenBil,
                value: Transportmiddel.egenBil,
                id: Transportmiddel.egenBil,
              },
              {
                label: Transportmiddel.kollektiv,
                value: Transportmiddel.kollektiv,
                id: Transportmiddel.kollektiv,
              },
            ]}
            checked={transportMiddel}
            onChange={(_, e) => settTransportMiddel(e)}
          />
          <Filopplaster
            className="periode-element"
            tillatteFiltyper={['image/png', 'image/jpeg']}
            maxFilstørrelse={1024 * 1024}
          />
        </Ekspanderbartpanel>
      ))}
    </div>
  );
};

export default ReisetilskuddPeriodeSide;
