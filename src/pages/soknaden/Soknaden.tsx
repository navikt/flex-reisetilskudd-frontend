import React, { ReactElement, useEffect } from 'react';
import {
  useParams,
  useHistory,
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
import { useAppStore } from '../../data/stores/app-store';

import hentReisetilskudd from '../../data/fetcher/hentReisetilskudd';

function Soknaden(): ReactElement {
  const history = useHistory();

  const { soknadssideID, reisetilskuddID } = useParams();
  const idNum = Number(soknadssideID);

  const {
    aktivtReisetilskuddId,
    settAktivtReisetilskuddId,
    reisetilskuddene,
    settReisetilskuddene,
  } = useAppStore();

  useEffect(() => {
    if (aktivtReisetilskuddId !== reisetilskuddID) {
      hentReisetilskudd(settReisetilskuddene);
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [aktivtReisetilskuddId, reisetilskuddID]);

  useEffect(() => {
    const match = reisetilskuddene?.find(
      (reisetilskudd) => reisetilskudd.reisetilskuddId === reisetilskuddID
      );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    match
      ? settAktivtReisetilskuddId(reisetilskuddID)
      : reisetilskuddene !== undefined && history.push('/');
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [reisetilskuddene, reisetilskuddID]);

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
