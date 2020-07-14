/* eslint-disable */
import React, { ReactElement, useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Filopplaster from '../../components/filopplaster/Filopplaster';
import { IPeriode, Transportmiddel } from '../../models/periode';

const mockPeriode : IPeriode = {
  id: '123123',
  fraDato: new Date(),
  tilDato: new Date(),
  transportMiddel: Transportmiddel.taxi,
};

const ReisetilskuddPeriodeSide = () : ReactElement => {
  const [perioder, settPerioder] = useState<IPeriode[]>([mockPeriode]);

  return (
    <div className="perioder-wrapper">
      {perioder.map((periode) => (
        <Ekspanderbartpanel
          key={periode.id}
          tittel={(
            <div>
              <Undertittel>Periode</Undertittel>
              <Normaltekst>
                {periode.fraDato.toDateString()}
                {' '}
                -
                {' '}
                {periode.tilDato.toDateString()}
              </Normaltekst>
            </div>
            )}
        >
          <Filopplaster
            tillatteFiltyper={['image/png', 'image/jpeg']}
            maxFilstørrelse={1024 * 1024}
          />
        </Ekspanderbartpanel>
      ))}
    </div>
  );
};

export default ReisetilskuddPeriodeSide;
