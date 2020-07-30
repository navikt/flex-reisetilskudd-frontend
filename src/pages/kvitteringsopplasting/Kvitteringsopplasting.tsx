import React, { ReactElement, useState } from 'react';
import {
  Systemtittel, Normaltekst,
} from 'nav-frontend-typografi';
import './kvitteringsopplasting.less';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useParams } from 'react-router-dom';
import FilopplasterModal from '../../components/filopplaster/filopplasterModal/FilopplasterModal';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import DragAndDrop from '../../components/filopplaster/dragAndDrop/DragAndDrop';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';
import { hjelpetekstKvitteringopplasting } from '../../constants/hjelpetekster';
import VidereKnapp from '../../components/knapper/VidereKnapp';

const Kvitteringsopplasting: React.FC = () : ReactElement => {
  const [gårTilNesteSide, settGårTilNesteSide] = useState<boolean>(false);

  const { soknadssideID } = useParams();
  const soknadssideIDTall = Number(soknadssideID);

  const handleVidereKlikk = () => {
    settGårTilNesteSide(true);
  };
  return (
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
        <VidereKnapp
          aktivtSteg={soknadssideIDTall}
          onClick={handleVidereKlikk}
          skalGåTilNesteSideNå={gårTilNesteSide}
        />
      </div>
    </div>
  );
};

export default Kvitteringsopplasting;
