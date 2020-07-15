import React, { ReactElement, useState } from 'react';
import {
  Innholdstittel, Ingress,
} from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { IPeriode, Transportmiddel } from '../../models/periode';
import './reisetilskudd-periode.less';
import { PlussIkon } from '../../assets/ikoner';
import { generateId } from '../../utils/random';
import Periode from '../../components/periode/Periode';

const mockPerioder = [
  {
    id: generateId(),
    vedlegg: [],
    fraDato: new Date(),
    tilDato: new Date(),
    transportMiddel: Transportmiddel.taxi,
  },
  {
    id: generateId(),
    vedlegg: [],
    transportMiddel: Transportmiddel.egenBil,
  },
];

const ReisetilskuddPeriodeSide = () : ReactElement => {
  const [perioder, settPerioder] = useState<IPeriode[]>(mockPerioder);

  const leggTilTomPeriode = () => {
    const tomPeriode = {
      id: generateId(),
      vedlegg: [],
    };
    settPerioder((gamlePerioder) => [...gamlePerioder, tomPeriode]);
  };

  return (
    <div className="perioder-wrapper">
      <Innholdstittel className="perioder-overskrift">Opplasting av kvitteringer</Innholdstittel>
      <Ingress className="perioder-overskrift"> Legg inn dine perioder og kvitteringer </Ingress>
      {perioder.map((periode, index) => (
        <Periode periode={periode} key={periode.id} index={index} />
      ))}
      <Knapp kompakt onClick={() => leggTilTomPeriode()}>
        <PlussIkon />
        <span>Legg til periode</span>
      </Knapp>
    </div>
  );
};

export default ReisetilskuddPeriodeSide;
