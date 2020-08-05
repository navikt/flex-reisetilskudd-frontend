import React, { ReactElement } from 'react';
import {
  useParams,
} from 'react-router-dom';
import Brodsmuler from '../../components/brodsmoler/Brodsmuler';
import Kvitteringsopplasting from '../kvitteringsopplasting/Kvitteringsopplasting';
import Utbetaling from '../utbetaling/Utbetaling';
import TilbakeKnapp from '../../components/knapper/TilbakeKnapp';
import DagensTransportmiddel from '../dagens-transportmiddel/DagensTransportmiddel';
import Vis from '../../components/Vis';
import Oppsummering from '../oppsummering/Oppsummering';
import SykmeldingPanel from '../../components/sykmeldingOpplysninger/SykmeldingPanel';
import './soknaden.less';
import { useAppStore } from '../../data/stores/app-store';

function Soknaden(): ReactElement {
  const { soknadssideID, reisetilskuddID } = useParams();
  const idNum = Number(soknadssideID);

  const {
    aktivtReisetilskuddId,
    settAktivtReisetilskuddId,
  } = useAppStore();

  console.log(aktivtReisetilskuddId);

  return (
    <div className="app-page sporsmal-wrapper">
      <TilbakeKnapp aktivtSteg={idNum} />
      <Brodsmuler aktivtSteg={idNum} />
      <SykmeldingPanel />
      <Vis hvis={idNum === 1}>
        <Utbetaling />
      </Vis>
      <Vis hvis={idNum === 2}>
        <DagensTransportmiddel />
      </Vis>
      <Vis hvis={idNum === 3}>
        <Kvitteringsopplasting />
      </Vis>
      <Vis hvis={idNum === 4}>
        <Oppsummering />
      </Vis>
    </div>
  );
}

export default Soknaden;
