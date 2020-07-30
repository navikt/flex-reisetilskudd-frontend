import React, { ReactElement } from 'react';
import {
  Systemtittel, Normaltekst,
} from 'nav-frontend-typografi';
import './kvitteringsopplasting.less';
import FilopplasterModal from '../../components/filopplaster/filopplasterModal/FilopplasterModal';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import DragAndDrop from '../../components/filopplaster/dragAndDrop/DragAndDrop';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';

const Kvitteringsopplasting: React.FC = () : ReactElement => (
  <div className="last-opp-kvittering-wrapper">
    <Systemtittel className="last-opp-kvittering-overskrift">Last opp dine kvitteringer</Systemtittel>
    <Normaltekst>Her kan du laste opp kvitteringer fra reisetilskuddsperioden.</Normaltekst>
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
