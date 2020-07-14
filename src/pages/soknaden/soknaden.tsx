import React, { ReactElement } from 'react';
import {
  useParams,
} from 'react-router-dom';
import Brodsmuler from '../../components/Brodsmuler';
import ReiseTilskuddPeriode from '../reisetilskudd-periode/reisetilskudd-periode';
import Utbetaling from '../utbetaling/utbetaling';
import TilbakeKnapp from '../../components/knapper/TilbakeKnapp';
import VidereKnapp from '../../components/knapper/VidereKnapp';
import DagensTransportmiddel from '../dagens-transportmiddel/dagens-transportmiddel';
import Vis from '../../components/Vis';
import Oppsummering from '../oppsummering/Oppsummering';
import { getAntallSider } from '../../constants/sideTitler';

function Soknaden():ReactElement {
  const { id } = useParams();
  const idNum = Number(id);

  return (
    <div>
      <Brodsmuler aktivtSteg={idNum} />
      <TilbakeKnapp aktivtSteg={idNum} />
      <Vis hvis={idNum === 1}>
        <Utbetaling />
      </Vis>
      <Vis hvis={idNum === 2}>
        <DagensTransportmiddel />
      </Vis>
      <Vis hvis={idNum === 3}>
        <ReiseTilskuddPeriode />
      </Vis>
      <Vis hvis={idNum === 4}>
        <Oppsummering />
      </Vis>
      <Vis hvis={idNum < getAntallSider()}>
        <VidereKnapp aktivtSteg={idNum} />
      </Vis>
    </div>
  );
}

export default Soknaden;
