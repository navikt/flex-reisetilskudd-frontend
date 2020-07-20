import React, { ReactElement } from 'react';
import {
  Innholdstittel, Ingress,
} from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import './reisetilskudd-periode.less';
import { PlussIkon } from '../../assets/ikoner';
import { generateId } from '../../utils/random';
import Periode from '../../components/periode/Periode';
import { useAppStore } from '../../data/stores/app-store';

const ReisetilskuddPeriodeSide = () : ReactElement => {
  const { perioder, settPerioder } = useAppStore();

  const leggTilTomPeriode = () => {
    const tomPeriode = {
      id: generateId(),
      vedlegg: [],
    };
    settPerioder((gamlePerioder) => [...gamlePerioder, tomPeriode]);
  };

  const oppdaterPerioder = () => {
    settPerioder([...perioder]);
  };

  return (
    <div className="perioder-wrapper">
      <Innholdstittel className="perioder-overskrift">Opplasting av kvitteringer</Innholdstittel>
      <Ingress className="perioder-overskrift"> Legg inn dine perioder og kvitteringer </Ingress>
      {perioder.map((periode, index) => (
        <Periode
          periode={periode}
          key={periode.id}
          index={index}
          onChange={oppdaterPerioder}
        />
      ))}
      <Knapp className="ny-periode-knapp" kompakt onClick={() => leggTilTomPeriode()}>
        <PlussIkon />
        <span>Legg til periode</span>
      </Knapp>
    </div>
  );
};

export default ReisetilskuddPeriodeSide;
