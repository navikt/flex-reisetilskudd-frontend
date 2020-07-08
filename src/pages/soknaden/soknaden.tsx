import React, { ReactElement } from 'react';
import Brodsmuler from '../../components/Brodsmuler';
import { sideHjelpeteksterID } from '../../constants/sideIDKonstanter';
import ReiseTilskuddPeriode from '../reisetilskudd-periode/reisetilskudd-periode';
import Utbetaling from '../utbetaling/utbetaling';

const getBrødsmuleHjelpetekst = () => sideHjelpeteksterID.DAGENS_TRANSPORTMIDDEL;

function Soknaden():ReactElement {
  return (
    <div>
      <Brodsmuler aktivtSteg={getBrødsmuleHjelpetekst()} />
      <ReiseTilskuddPeriode />
      <Utbetaling />
    </div>
  );
}

export default Soknaden;
