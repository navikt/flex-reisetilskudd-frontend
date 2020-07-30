import React, { ReactElement } from 'react';
import {
  Systemtittel, Normaltekst,
} from 'nav-frontend-typografi';
import './kvitteringsopplasting.less';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import FilopplasterModal from '../../components/filopplaster/filopplasterModal/FilopplasterModal';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import DragAndDrop from '../../components/filopplaster/dragAndDrop/DragAndDrop';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';
import { hjelpetekstKvitteringopplasting } from '../../constants/hjelpetekster';

const Kvitteringsopplasting: React.FC = () : ReactElement => (
  <div className="last-opp-kvittering-wrapper">
    <Systemtittel className="last-opp-kvittering-overskrift">Last opp dine kvitteringer</Systemtittel>
    <div className="last-opp-kvittering-tekst">
      <Normaltekst>Her kan du laste opp kvitteringer fra reisetilskuddsperioden.</Normaltekst>
      <Hjelpetekst className="kvitteringsopplasting-hjelpetekst">
        {hjelpetekstKvitteringopplasting.hjelpetekst}
      </Hjelpetekst>
    </div>
    <div className="filopplaster-wrapper">
      <div className="filopplaster">
        <FilopplasterModal />
        <DragAndDrop />
      </div>
      <OpplastedeFiler fjernKnapp />
      <div className="kvitteringer-totalt-beløp">
        <TotalBelop />
      </div>
    </div>
  </div>
);

export default Kvitteringsopplasting;
