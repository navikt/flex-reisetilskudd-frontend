import React, { ReactElement } from 'react';
import {
  useParams,
} from 'react-router-dom';
import Brodsmuler from '../../components/Brodsmuler';
import ReiseTilskuddPeriode from '../reisetilskudd-periode/ReisetilskuddPeriode';
import Utbetaling from '../utbetaling/Utbetaling';
import TilbakeKnapp from '../../components/knapper/TilbakeKnapp';
import VidereKnapp from '../../components/knapper/VidereKnapp';
import SendKnapp from '../../components/knapper/SendKnapp';
import DagensTransportmiddel from '../dagens-transportmiddel/DagensTransportmiddel';
import Vis from '../../components/Vis';
import Oppsummering from '../oppsummering/Oppsummering';
import { getAntallSider } from '../../constants/sideTitler';
import './soknaden.less';

function Soknaden():ReactElement {
  const { id } = useParams();
  const idNum = Number(id);

  return (
    <div className="soknadSider">
      <Brodsmuler aktivtSteg={idNum} />
      <TilbakeKnapp aktivtSteg={idNum} />
      <div className="sporsmal-wrapper">
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
          <SendKnapp />
        </Vis>
        <Vis hvis={idNum < getAntallSider()}>
          <VidereKnapp aktivtSteg={idNum} />
        </Vis>
      </div>
    </div>
  );
}

export default Soknaden;
