import React, { ReactElement } from 'react';
import {
  Systemtittel, Normaltekst,
} from 'nav-frontend-typografi';
import './kvitteringsopplasting.less';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useParams, useHistory } from 'react-router-dom';
import FilopplasterModal from '../../components/filopplaster/filopplasterModal/FilopplasterModal';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import DragAndDrop from '../../components/filopplaster/dragAndDrop/DragAndDrop';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';
import { hjelpetekstKvitteringopplasting } from '../../constants/hjelpetekster';
import VidereKnapp from '../../components/knapper/VidereKnapp';
import { gåTilNesteSide } from '../../utils/navigasjon';

const Kvitteringsopplasting: React.FC = (): ReactElement => {
  const { soknadssideID } = useParams();
  const soknadssideIDTall = Number(soknadssideID);

  const history = useHistory();

  const handleVidereKlikk = () => {
    gåTilNesteSide(history, soknadssideIDTall);
  };
  return (
    <div className="last-opp-kvittering-wrapper">
      <Systemtittel className="last-opp-kvittering-overskrift">Last opp dine kvitteringer</Systemtittel>
      <div className="last-opp-kvittering-tekst">
        <Normaltekst id="kvitteringsopplastning-overskrift" aria-describedby="min-hjelpetekst-kvitteringsopplastning">Her kan du laste opp kvitteringer fra reisetilskuddsperioden.</Normaltekst>
        <Hjelpetekst className="kvitteringsopplasting-hjelpetekst" id="min-hjelpetekst-kvitteringsopplastning" aria-describedby="kvitteringsopplastning-overskrift">
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
        <VidereKnapp
          aktivtSteg={soknadssideIDTall}
          onClick={handleVidereKlikk}
        />
      </div>
    </div>
  );
};

export default Kvitteringsopplasting;
