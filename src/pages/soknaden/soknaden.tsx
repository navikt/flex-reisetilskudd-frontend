import React, { ReactElement } from 'react';
import {
  useParams,
} from 'react-router-dom';
import Brodsmuler from '../../components/Brodsmuler';
import { sideHjelpeteksterID } from '../../constants/sideIDKonstanter';
import ReiseTilskuddPeriode from '../reisetilskudd-periode/reisetilskudd-periode';
import Utbetaling from '../utbetaling/utbetaling';
import TilbakeKnapp from '../../components/knapper/TilbakeKnapp';
import VidereKnapp from '../../components/knapper/VidereKnapp';
import DagensTransportmiddel from '../dagens-transportmiddel/dagens-transportmiddel';
import Vis from '../../components/Vis';

const getBrødsmuleHjelpetekst = () => sideHjelpeteksterID.DAGENS_TRANSPORTMIDDEL;

function Soknaden():ReactElement {
  const { id } = useParams();
  const idNum = Number(id);

  return (
    <div>
      <Brodsmuler aktivtSteg={getBrødsmuleHjelpetekst()} />
      <TilbakeKnapp />
      <VidereKnapp />

      <Vis hvis={idNum === 1}>
        <Utbetaling />
      </Vis>
      <Vis hvis={idNum === 2}>
        <DagensTransportmiddel />
      </Vis>
      <Vis hvis={idNum === 3}>
        <ReiseTilskuddPeriode />
      </Vis>
    </div>
  );
}

export default Soknaden;
